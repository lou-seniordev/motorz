import { observer } from "mobx-react-lite";
import React, {  useContext } from "react"; 
import { RootStoreContext } from "../../../app/stores/rootStore";


const ProductMobileInfo = () => {
  const rootStore = useContext(RootStoreContext);
  const { info } = rootStore.productStore;

  return (
    <div className="mobileInfo" >{info}</div>
  );
};

export default observer(ProductMobileInfo);
