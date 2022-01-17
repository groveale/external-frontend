import React, { useEffect, useState } from "react";
import { useEthers, useEtherBalance, useLookupAddress } from "@usedapp/core";
import { formatEther } from '@ethersproject/units'


export function AccountBalance() {
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)

  return (
    <div>
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}