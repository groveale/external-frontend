import { useContractFunction, useContractCall, useEtherBalance, useEthers, useTokenBalance } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import { utils, BigNumber } from 'ethers'

import { TransactionForm } from './TransactionFrom'

//contract deployed to kovan at: 0xF30d9351Cef6a54B33AB9F4032959705209F875C

import simpleBankABI from '../../abi/SimpleBank.json'
import wethInterfaceABI from '../../abi/Weth10.json'

const simpleBankInterface = new utils.Interface(simpleBankABI)
const simpleBankAddress = '0xF30d9351Cef6a54B33AB9F4032959705209F875C'
const simpleBankContract = new Contract(simpleBankAddress, simpleBankInterface)

export const DepositEth = () => {
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)

  const { state, send } = useContractFunction(simpleBankContract, 'deposit', { transactionName: 'Deposit' })

  const depositEther = (etherAmount: string) => {
    send({ value: utils.parseEther(etherAmount) })
  }

  return (
    <TransactionForm balance={etherBalance} send={depositEther} title="Deposit Ether" ticker="ETH" transaction={state} />
  )
}

export const WithdrawEth = () => {
    const { account } = useEthers()
    const bankBalance: BigNumber | undefined = useContractCall({
        abi: simpleBankInterface,
        address: simpleBankAddress,
        method: 'balanceOf',
        args: [account],
      })?.[0];

      console.log(bankBalance);
  
    const { state, send } = useContractFunction(simpleBankContract, 'withdrawSomeFunds', { transactionName: 'Withdraw' })
  
    const withdrawEther = (ethAmount: string) => {
      send(utils.parseEther(ethAmount))
    }
  
    return (
      <TransactionForm
        balance={bankBalance}
        send={withdrawEther}
        title="Withdraw Ether"
        ticker="ETH"
        transaction={state}
      />
    )
  }
