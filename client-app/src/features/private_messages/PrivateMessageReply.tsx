import React, { useContext, useState } from "react";
import { TextArea } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { useTranslation } from "react-i18next";

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

  const tAreatyles = {
    width: "100%",
    borderRadius: "10px",
    border: "none",
    fontSize: "18px",
    marginTop: "8px",
  };

  const { t } = useTranslation(["social"]);

  const [input, setInput] = useState("");

  const handleSendReply = (e: any) => {
    if (e.key === "Enter") {
      e.target.value = "";
      console.log(e);
      if (input === "") {
        console.log("need to validate");
      } else {
        setInput("");
        handleSetRecipient();
        setMessageThreadId(listOfMessagesInFocus![0]);
        setReply(input);
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
    <TextArea
      autoFocus
      value={input}
      placeholder={t('Reply')}
      name='reply'
      onInput={(e: any) => setInput(e.target.value)}
      onKeyDown={(e: any) => handleSendReply(e)}
      style={tAreatyles}
    />
  );
};

export default observer(PrivateMessageReply);
