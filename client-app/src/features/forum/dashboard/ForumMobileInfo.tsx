import { observer } from "mobx-react-lite";
import React, {  useContext } from "react"; 
import { RootStoreContext } from "../../../app/stores/rootStore";


const ForumMobileInfo = () => {
  const rootStore = useContext(RootStoreContext);
  const { info } = rootStore.forumPostStore;

  return (
    <div className="mobileInfo" >{info}</div>
  );
};

export default observer(ForumMobileInfo);