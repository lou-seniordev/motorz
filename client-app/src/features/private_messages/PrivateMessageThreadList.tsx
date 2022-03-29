import { observer } from "mobx-react-lite";
import React, {  useContext, useEffect } from "react";
import { Grid, Segment, Image } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import { RootStoreContext } from "../../app/stores/rootStore";
import { RSA_NO_PADDING } from "constants";
// import PrivateMessageThreadListItem from "./PrivateMessageThreadListItem";


// const PrivateMessageThreadList: React.FC<IProps> = ({ last }) => {
const PrivateMessageThreadList = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const {
    messagesByThreadId,
    //    markReadInDB,
    // loadingInitial,
    // messageThreadsCount,
    // last,
    setInitialView,
    setView,
    createHubConnection
    // , stopHubConnection,
  } = rootStore.privateMessageStore;


  useEffect(() => {
      setInitialView();
  }, [setInitialView]);

  //   const markRead = (message: IMessage) => {
  //     if (message.senderUsername !== user?.userName) {
  //       markReadInDB(message.id);
  //     }
  //   };

  return (

    <Segment
      // style={{ backgroundColor: "lightblue" }} 
      raised
      className="sideScroll"
    >
      <Grid>
        <Grid.Column width={16}>
          {messagesByThreadId.map(([id, messages]) => (
            //  style={{border: 'none'}}
            <Segment key={id}>
              <Grid
              // className='computer only' 
                onClick={() => {
                   
                    setView(messages[0].privateMessageThreadId)
                    createHubConnection(messages[0].privateMessageThreadId)
                }}
                divided
                style={{ cursor: "pointer" }}
              >
                <Grid.Column computer={4} className='computer only' >
                  <Image
                    size='mini'
                    circular
                    verticalAlign='middle'
                    src={messages[0].senderPhotoUrl || "/assets/user.png"}
                  />
                  <span>
                    {" "}
                    {messages[0].senderUsername === user?.userName
                      ? "Me"
                      : messages[0].senderDisplayName}
                  </span>
                 
                </Grid.Column>
                <Grid.Column mobile={12} className='mobile only' style={{padding: '0px', margin: '0px'}}>
                  <img
                  // className='mobile only'
                    // size='large'
                    // circular
                    // verticalAlign='middle'
                    style={{borderRadius: "50%"}}
                    width={'40px'}
                    src={messages[0].senderPhotoUrl || "/assets/user.png"}
                  />
                 
                </Grid.Column>
                <Grid.Column width={12} className='computer only'>
                  <Grid.Row
                    style={
                      messages[0].dateRead === null &&
                      messages[0].senderUsername !== user?.userName
                        ? { fontWeight: "bold", color: "rgb(29, 115, 152)" }
                        : { fontWeight: "normal" }
                    }
                  >
                     <span>
                    {formatDistance(
                      new Date(messages[0].dateSent),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>

                    <Grid.Row>{messages[0].content}</Grid.Row>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </Segment>
          ))}
        </Grid.Column>
      </Grid>

    </Segment>

  );
};

export default observer(PrivateMessageThreadList);

