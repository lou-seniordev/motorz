import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react"; //, createRef
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductMessagesList from "./ProductMessagesList";

const ProductMessagesPage = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadMessageThread, loadingInitial } = rootStore.messageStore;// 
  
    // const [activeTab, setActiveTab]= useState(1)
    
  
    const recipientUsername: string = 'jane';
    
    useEffect(() => {
      loadMessageThread(recipientUsername);
      
    }, [loadMessageThread]);

    return (
        <ProductMessagesList/>
    );
}

export default observer(ProductMessagesPage);