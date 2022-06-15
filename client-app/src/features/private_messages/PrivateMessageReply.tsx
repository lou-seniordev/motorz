import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { useTranslation } from "react-i18next";
import Picker from "emoji-picker-react";
import { Form, Grid, GridColumn, Icon, Popup } from "semantic-ui-react";

const PrivateMessageReply = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const {
    setRecipient,
    setMessageThreadId,
    listOfMessagesInFocus,
    setUsername,
    setReply,
    addReply,
  } = rootStore.privateMessageStore;

  const { t } = useTranslation(["social"]);

  const [showPicker, setShowPicker] = useState(false);

  const MIN_TEXTAREA_HEIGHT = 12;

  const textareaRef = useRef<any>(null);
  const [value, setValue] = useState("");
  const onChange = (event: any) => setValue(event.target.value);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setValue((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    textareaRef.current.style.height = "inherit";
    // Set height
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
    // textareaRef.current.style.fontSize = "20px";
  }, [value]);

  const handleSendReply = (e: any) => {
    if (e !== null && e.key === "Enter") {
      e.target.value = "";
      if (value === "") {
        e.preventDefault();
        alert("Cannot send an empty message!");
      } else {
        e.preventDefault();
        setValue("");
        handleSetRecipient();
        setMessageThreadId(listOfMessagesInFocus![0]);
        setReply(value);
        setUsername(user?.userName!);
        addReply();
      }
    }
  };

  const handleSendButton = () => {
    if (value !== "") {
      handleSetRecipient();
      setMessageThreadId(listOfMessagesInFocus![0]);
      setReply(value);
      setUsername(user?.userName!);
      addReply();
      setValue("");
      textareaRef.current.value = "";
    } else {
      alert("Cannot send an empty message!");
    }
  };

  const handleSetRecipient = () => {
    if (listOfMessagesInFocus![1][0].senderUsername === user?.userName) {
      setRecipient(
        listOfMessagesInFocus![1][0].recipientUsername!,
        user?.image
      );
    } else {
      setRecipient(listOfMessagesInFocus![1][0].senderUsername!, user?.image);
    }
  };

  return (
    <Form>
      <Grid>
        <GridColumn width={1}>
          <div className='smiley-picker'>
            <Icon
              name='smile outline'
              circular
              onClick={() => setShowPicker((val) => !val)}
            />
          </div>
        </GridColumn>
        <GridColumn width={1}>
          <div className='send-button'>
          <Popup
                header={'SEND'}
                trigger={
              
                  <Icon name='send' circular onClick={() => handleSendButton()} />
              }
               content={'You can also hit enter to send'}
            />
          </div>
        </GridColumn>
        <GridColumn computer={14} mobile={12}>
          <div className='textareaRef'>
            <textarea
              ref={textareaRef}
              autoFocus
              placeholder={t("Reply")}
              onKeyDown={(e: any) => handleSendReply(e)}
              onChange={onChange}
              style={{
                minHeight: MIN_TEXTAREA_HEIGHT,                
                resize: "none",
                borderRadius: '20px',
              }}
              // className='inside'
              // 
              value={value}
            />
          </div>
        </GridColumn>
      </Grid>

      {showPicker && (
        <Picker
          pickerStyle={{ width: "90%", left: "5rem", bottom: "330px" }}
          onEmojiClick={onEmojiClick}
        />
      )}
    </Form>
  );
};

export default observer(PrivateMessageReply);
