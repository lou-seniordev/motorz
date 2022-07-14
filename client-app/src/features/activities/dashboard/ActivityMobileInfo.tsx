import { observer } from "mobx-react-lite";
import React, {  useContext } from "react"; 
import { RootStoreContext } from "../../../app/stores/rootStore";


const ActivityMobileInfo = () => {
  const rootStore = useContext(RootStoreContext);
  const { info } = rootStore.activityStore;

  return (
    <div className="mobileInfo" >{info.toUpperCase()}</div>

  );
};

export default observer(ActivityMobileInfo);
