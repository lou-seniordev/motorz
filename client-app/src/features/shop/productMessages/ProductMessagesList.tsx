import { observer } from "mobx-react-lite";
import React, { useContext } from "react"; //, createRef
import { Item, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductMessageListItem from "./ProductMessageListItem";

const ProductMessagesList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { messagesByDate } = rootStore.messageStore;
  console.log("message in list", messagesByDate)
  console.log("message in list", messagesByDate)

  return (
      
    <Segment clearing>

      <Item.Group divided>
        {messagesByDate.map((message) => (
            
          <ProductMessageListItem message={message} key={message.id} />

        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ProductMessagesList);
