// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract SimpleBank {
    mapping(address => uint256) private addressToBankBalance;
    mapping(address => bool) private bankersMapping;
    address[] private bankers;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        addressToBankBalance[msg.sender] += msg.value;

        // only add if new banker
        if (!alreadyBanking(msg.sender)) {
            bankersMapping[msg.sender] = true;
            bankers.push(msg.sender);
        }
    }

    // Rug pull the bank
    function withdrawAllFunds() public payable onlyOwner {
        msg.sender.transfer(address(this).balance);

        // reset all balances
        for (
            uint256 bankersIndex = 0;
            bankersIndex < bankers.length;
            bankersIndex++
        ) {
            address banker = bankers[bankersIndex];
            addressToBankBalance[banker] = 0;
            bankersMapping[banker] = false;
        }
    }

    function withdrawAllOwnFunds() public payable {
        msg.sender.transfer(addressToBankBalance[msg.sender]);
        addressToBankBalance[msg.sender] = 0;
    }

    function withdrawSomeFunds() public payable {
        // Check if the transaction sender has enough ETH in the bank.
        // If `require`'s first argument evaluates to `false` then the
        // transaction will revert.
        require(
            addressToBankBalance[msg.sender] >= msg.value,
            "Not enough ETH in your Bank"
        );

        msg.sender.transfer(msg.value);
        addressToBankBalance[msg.sender] -= msg.value;
    }

    function alreadyBanking(address _wallet) public view returns (bool) {
        return bankersMapping[_wallet];
    }

    function getBalance(address _wallet) public view returns (uint256) {
        return addressToBankBalance[_wallet];
    }

    // only want owner to be able to widthdraw
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }
}
