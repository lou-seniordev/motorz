import { observer } from "mobx-react-lite";
import React, {  useContext } from "react"; 
import { RootStoreContext } from "../../../app/stores/rootStore";


const ActivityMobileInfo = () => {
  const rootStore = useContext(RootStoreContext);
  const { info } = rootStore.activityStore;//, predicate
  // const { predicate } = rootStore.activityStore;//, predicate
  // console.log(predicate.keys().next().value)

  // let info: string = 'Active diaries';



  // useEffect (() => {
  //   console.log("Im working")
  //   setInfo()
  // },[setInfo])

  return (
    <div className="mobileInfo" >{info}</div>
    // <div className="mobileInfo" >{predicate.keys().next().value}</div>
    // <p>hi</p>
  );
};

export default observer(ActivityMobileInfo);
