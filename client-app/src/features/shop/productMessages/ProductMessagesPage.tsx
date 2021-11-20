import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react"; //, createRef
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductMessagesList from "./ProductMessagesList";

const ProductMessagesPage = () => {
    const rootStore = useContext(RootStoreContext);
    // const { loadMessageThread, loadingInitial, setMessageThread } = rootStore.messageStore;// 
  
    // const [activeTab, setActiveTab]= useState(1)
    
  
    const recipientUsername: string = 'jane';
    const productId: string = 'aee0c4fd-c8c8-4184-b91c-7bac64213821';
    
    // useEffect(() => {
    //   loadMessageThread(recipientUsername, productId);
      
    // }, [loadMessageThread]);

    return (
        <ProductMessagesList/>
    );
}

export default observer(ProductMessagesPage);