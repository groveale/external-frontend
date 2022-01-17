const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("SimpleBank contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let SimpleBank;
  let simpleBankContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    SimpleBank = await ethers.getContractFactory("SimpleBank");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    simpleBankContract = await SimpleBank.deploy();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.

    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // Expect receives a value, and wraps it in an Assertion object. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      expect(await simpleBankContract.owner()).to.equal(owner.address);
    });
  });

  describe("Deposits", function () {
    it("Should be able to deposit", async function () {
      // Transfer .5 eth from addr1 to (bank) contract
      await simpleBankContract.connect(addr1).deposit({
        value: ethers.utils.parseEther("0.5"),
      });
      const addr1Balance = await simpleBankContract.getBalance(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther("0.5"));

      // bank balance should be same as only one customer
      const totalBankBalance = await simpleBankContract.provider.getBalance(
        simpleBankContract.address
      );
      expect(totalBankBalance).to.equal(ethers.utils.parseEther("0.5"));
    });

    it("Should be able to deposit twice", async function () {
      // Transfer .5 eth from addr1 to (bank) contract
      await simpleBankContract.connect(addr1).deposit({
        value: ethers.utils.parseEther("0.5"),
      });
      const addr1Balance = await simpleBankContract.getBalance(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther("0.5"));

      // Deposit again
      await simpleBankContract.connect(addr1).deposit({
        value: ethers.utils.parseEther("0.25"),
      });
      const addr1Balance2 = await simpleBankContract.getBalance(addr1.address);
      expect(addr1Balance2).to.equal(ethers.utils.parseEther("0.75"));

      // bank balance should be same as only one customer
      const totalBankBalance = await simpleBankContract.provider.getBalance(
        simpleBankContract.address
      );
      expect(totalBankBalance).to.equal(ethers.utils.parseEther("0.75"));
    });

    it("Multiple bankers should be be able to twice", async function () {
      // Transfer .5 eth from addr1 to (bank) contract
      await simpleBankContract.connect(addr1).deposit({
        value: ethers.utils.parseEther("0.5"),
      });
      const addr1Balance = await simpleBankContract.getBalance(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther("0.5"));

      // Deposit from addr2
      await simpleBankContract.connect(addr2).deposit({
        value: ethers.utils.parseEther("0.25"),
      });
      const addr2Balance = await simpleBankContract.getBalance(addr2.address);
      expect(addr2Balance).to.equal(ethers.utils.parseEther("0.25"));

      // bank balance should be same as only one customer
      const totalBankBalance = await simpleBankContract.provider.getBalance(
        simpleBankContract.address
      );
      expect(totalBankBalance).to.equal(ethers.utils.parseEther("0.75"));
    });
  });
  describe("Withdrawals", function () {
    it("Should be able to withdraw all funds", async function () {
      // deposit .5 eth from addr1 to (bank) contract
      await simpleBankContract.connect(addr1).deposit({
        value: ethers.utils.parseEther("0.5"),
      });

      const addr1Balance = await simpleBankContract.getBalance(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther("0.5"));

      // now withdraw all of funds
      await simpleBankContract.connect(addr1).withdrawAllOwnFunds();

      // balance od add1 shouls be 0 and show should the bank
      const newAddr1Balance = await simpleBankContract.getBalance(
        addr1.address
      );
      expect(newAddr1Balance).to.equal(0);

      // bank balance should be same as only one customer
      const totalBankBalance = await simpleBankContract.provider.getBalance(
        simpleBankContract.address
      );
      expect(totalBankBalance).to.equal(ethers.utils.parseEther("0"));
    });

    it("Should be able to withdraw some funds", async function () {
      //bank balance should be same as only one customer
      const intialBalnce = await simpleBankContract.provider.getBalance(
        simpleBankContract.address
      );
      expect(intialBalnce).to.equal(ethers.utils.parseEther("0"));

      // deposit .5 eth from addr1 to (bank) contract
      await simpleBankContract.connect(addr1).deposit({
        value: ethers.utils.parseEther("0.5"),
      });

      const addr1Balance = await simpleBankContract.getBalance(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther("0.5"));

      //bank balance should be same as only one customer
      const totalBankBalance = await simpleBankContract.provider.getBalance(
        simpleBankContract.address
      );
      expect(totalBankBalance).to.equal(ethers.utils.parseEther("0.5"));

      // now withdraw some of funds
      await simpleBankContract
        .connect(addr1)
        .withdrawSomeFunds(ethers.utils.parseEther("0.4"));

      // balance od add1 should be 0.1 and show should the bank
      const newAddr1Balance = await simpleBankContract.getBalance(
        addr1.address
      );
      expect(newAddr1Balance).to.equal(ethers.utils.parseEther("0.1"));

      // bank balance should be same as only one customer
      const totalBankBalance2 = await simpleBankContract.provider.getBalance(
        simpleBankContract.address
      );
      expect(totalBankBalance2).to.equal(ethers.utils.parseEther("0.1"));
    });

    it("Should not be able to withdraw more than you put in", async function () {
      // Transfer .5 eth from addr1 to (bank) contract
      await simpleBankContract.connect(addr1).deposit({
        value: ethers.utils.parseEther("0.5"),
      });
      const addr1BalanceInitial = await simpleBankContract.getBalance(
        addr1.address
      );
      expect(addr1BalanceInitial).to.equal(ethers.utils.parseEther("0.5"));

      await expect(
        simpleBankContract
          .connect(addr1)
          .withdrawSomeFunds(ethers.utils.parseEther("0.6"))
      ).to.be.revertedWith("Not enough ETH in your Bank");

      // add1 balance should be same as before withdrawal attempt
      const addr1Balance = await simpleBankContract.getBalance(addr1.address);
      expect(addr1BalanceInitial).to.equal(addr1Balance);
    });
  });

  describe("Owner", function () {
    it("Should be able to withdraw all funds from the bank", async function () {
      await simpleBankContract.connect(addr1).deposit({
        value: ethers.utils.parseEther("0.5"),
      });

      await simpleBankContract.connect(addr2).deposit({
        value: ethers.utils.parseEther("0.5"),
      });

      // bank balance should be same as only one customer
      const totalBankBalance = await simpleBankContract.provider.getBalance(
        simpleBankContract.address
      );
      expect(totalBankBalance).to.equal(ethers.utils.parseEther("1"));

      // now withdraw some of funds
      await simpleBankContract.connect(owner).withdrawAllFunds();

      const addr1Balance = await simpleBankContract.getBalance(addr1.address);
      expect(addr1Balance).to.equal(0);

      const addr2Balance = await simpleBankContract.getBalance(addr2.address);
      expect(addr2Balance).to.equal(0);

      // bank balance should be same as only one customer
      const totalBankBalance2 = await simpleBankContract.provider.getBalance(
        simpleBankContract.address
      );
      expect(totalBankBalance2).to.equal(ethers.utils.parseEther("0"));
    });

    it("But only the owner can do this bank", async function () {
      await simpleBankContract.connect(addr1).deposit({
        value: ethers.utils.parseEther("0.5"),
      });

      await simpleBankContract.connect(addr2).deposit({
        value: ethers.utils.parseEther("0.5"),
      });

      // bank balance should be same as only one customer
      const totalBankBalance = await simpleBankContract.provider.getBalance(
        simpleBankContract.address
      );
      expect(totalBankBalance).to.equal(ethers.utils.parseEther("1"));

      // now withdraw some of funds as non owner
      await expect(
        simpleBankContract.connect(addr2).withdrawAllFunds()
      ).to.be.revertedWith("You are not the owner");

      const addr1Balance = await simpleBankContract.getBalance(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther("0.5"));

      const addr2Balance = await simpleBankContract.getBalance(addr2.address);
      expect(addr2Balance).to.equal(ethers.utils.parseEther("0.5"));

      // bank balance should be same as only one customer
      const totalBankBalance2 = await simpleBankContract.provider.getBalance(
        simpleBankContract.address
      );
      expect(totalBankBalance2).to.equal(ethers.utils.parseEther("1"));
    });
  });
});
