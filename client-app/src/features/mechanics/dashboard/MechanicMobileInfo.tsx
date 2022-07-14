import { observer } from "mobx-react-lite";
import React, {  useContext } from "react"; 
import { RootStoreContext } from "../../../app/stores/rootStore";


const MechanicMobileInfo = () => {
  const rootStore = useContext(RootStoreContext);
  const { info } = rootStore.mechanicStore;

  return (
    <div className="mobileInfo" >{info.toUpperCase()}</div>
  );
};

export default observer(MechanicMobileInfo);