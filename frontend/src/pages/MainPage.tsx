import { AccountButton } from "../components/account/AccountButton";
import { AccountBalance } from "../components/account/AccountBalance";
import { Bank } from "../components/bank/Bank";
import { Button } from "../components/base/Button";

const MainPage = () => {
  // const { send, state } = useContractFunction()
  //
  const onDeposit = () => {
    // send();
  };

  return (
    <div>
      <h1>First Bank of DeFi</h1>
      {/* <AccountButton /> */}
      <Bank />
      {/* <AccountBalance /> */}
      {/* <Button onClick={onDeposit}>deposit $20000</Button> */}
    </div>
  );
};

export default MainPage;
