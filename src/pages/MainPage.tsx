import { AccountButton } from "../components/account/AccountButton";
import { Button } from "../components/Button";
import { useContractFunction } from "@usedapp/core";

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
      <Button onClick={onDeposit}>deposit $20000</Button>
    </div>
  );
};

export default MainPage;
