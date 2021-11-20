import { observer } from "mobx-react-lite";
import React, { useContext } from "react"; //, createRef
import { Grid, Item, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ContactForm from "../forms/ContactForm";
import ProductMessageListItem from "./ProductMessageListItem";

const ProductMessagesList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { threadByDate, threadExist, formExist } = rootStore.messageStore;

  return (
    <Segment clearing>
      {threadExist && (
        <Item.Group divided>
          <Grid>
            
            <Grid.Column width={12}> you have {threadByDate.length} messages with {Array.from(threadByDate)[3].senderUsername}</Grid.Column>
            {/* IMPORTANT!!! IT WILL ALWAYS BE THE FIRST ONE */}
          </Grid>
          {threadByDate.map((message) => (
            <ProductMessageListItem message={message} key={message.id} />
          ))}
        </Item.Group>
      )}
      {!threadExist && formExist && (
        <Item.Group divided>
          <ContactForm />
        </Item.Group>
      )}
    </Segment>
  );
};

export default observer(ProductMessagesList);
