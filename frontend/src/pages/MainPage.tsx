import { AccountButton } from "../components/account/AccountButton";
import { AccountBalance } from "../components/account/AccountBalance";
import { Button } from "../components/Button";
import { useContractFunction } from "@usedapp/core";

//contract deployed to kovan at: 0x2ae459668716560293Cba0f4930a334b6f59ab0F

const MainPage = () => {
  // const { send, state } = useContractFunction()
  //
  const onDeposit = () => {
    // send();
  };

  return (
    <div>
      <h1>First Bank of DeFi</h1>
      <AccountButton />
      <AccountBalance />
      <Button onClick={onDeposit}>deposit $20000</Button>
    </div>
  );
};

export default MainPage;
