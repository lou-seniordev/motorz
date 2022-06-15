import React, { useContext, useLayoutEffect, useRef, useState } from "react";
// import { TextArea } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { useTranslation } from "react-i18next";
import Picker from "emoji-picker-react";
import { Form } from "semantic-ui-react";

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

  // const tAreatyles = {
  //   width: "100%",
  //   borderRadius: "10px",
  //   border: "none",
  //   fontSize: "18px",
  //   marginTop: "8px",
  // };

  const { t } = useTranslation(["social"]);
  // const [chosenEmoji, setChosenEmoji] = useState<any>(null);

  // const onEmojiClick = (event:any, emojiObject:any) => {
  //   setChosenEmoji(emojiObject);
  // };

  // const [input, setInput] = useState("");
  // const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  // const areaHeight = 16;
  const MIN_TEXTAREA_HEIGHT = 16;

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
  }, [value]);

  const handleSendReply = (e: any) => {
    if (e.key === "Enter") {
      e.target.value = "";
      // console.log('value:::', value)
      if (value === "") {
        console.log("need to validate");
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
    // <TextArea
    //   autoFocus
    //   value={input}
    //   placeholder={t('Reply')}
    //   name='reply'
    //   onInput={(e: any) => setInput(e.target.value)}
    //   onKeyDown={(e: any) => handleSendReply(e)}
    //   style={tAreatyles}
    // />
    // <div className="app">
    // <h3>Add Emoji Picker</h3>

    // <Grid>
    //   <Grid.Row>
    //     <Grid.Column width={16}>
    <Form>
      <textarea
        ref={textareaRef}
        autoFocus
        placeholder={t("Reply")}
        // value={inputStr}
        // onChange={(e) => setInputStr(e.currentTarget.value)}
        onKeyDown={(e: any) => handleSendReply(e)}
        onChange={onChange}
        style={{
          minHeight: MIN_TEXTAREA_HEIGHT,
          resize: "none",
        }}
        value={value}
      />

      <img
        className='emoji-icon'
        src='https://icons.getbootstrap.com/assets/icons/emoji-smile.svg'
        alt='smiley'
        onClick={() => setShowPicker((val) => !val)}
      />

      {showPicker && (
        <Picker
          pickerStyle={{ width: "50%", left: "20px", bottom: "370px" }}
          // marginTop: "-380px"
          onEmojiClick={onEmojiClick}
          // native
        />
      )}
    </Form>
    //     </Grid.Column>
    //   </Grid.Row>
    // </Grid>

    // <div className="picker-container">
    //   <input
    //     className="input-style"
    //     placeholder={t('Reply')}
    //     value={inputStr}
    //     onChange={e => setInputStr(e.target.value)}
    //     onKeyDown={(e: any) => handleSendReply(e)}/>
    //   <img
    //     className="emoji-icon"
    //     src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
    //     onClick={() => setShowPicker(val => !val)} />
    //   {showPicker && <Picker
    //     pickerStyle={{ width: '100%' }}
    //     onEmojiClick={onEmojiClick} />}
    // </div>
  );
};

export default observer(PrivateMessageReply);
