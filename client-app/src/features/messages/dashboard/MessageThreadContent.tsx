import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
// import { RouteComponentProps } from 'react-router-dom';
// import { IMessage } from '../../../app/models/message';
import { RootStoreContext } from '../../../app/stores/rootStore';


// interface IProps {
//   messages: IMessage[]
// }
// interface IProps extends RouteComponentProps<RouteParams> {}

const MessageThreadContent = () => {

  const rootStore = useContext(RootStoreContext);
  const { messagesByDate } = rootStore.messageStore;
  console.log(messagesByDate);
    
  return (
    <h1>Hi im here</h1>
  );
};


export default observer(MessageThreadContent);
