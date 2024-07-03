import React from "react";
import EmojiPicker from "emoji-picker-react";
import styles from "./ChatFooter.module.css";
import { Popover } from "antd";
import { ReactComponent as CustomCircleEmoji } from "./../../svg/circleemoji.svg";
import { ReactComponent as Like } from "./../../svg/like.svg";
import { ReactComponent as Send } from "./../../svg/send.svg";
const FormChat = ({
  handleSendMultipleMessage,
  handleSendNewChat,
  setMessage,
  showButtonSend,
  id,
  files,
  message,
  inputRef,
}) => {
  return (
    <form
      style={{ display: "flex", alignItems: "center", flex: 1 }}
      onSubmit={(e) => {
        e.preventDefault();
        if (id) {
          handleSendMultipleMessage(files);
        } else {
          handleSendNewChat(message, "text");
        }
      }}
    >
      <div
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "5px",
            backgroundColor: "var(--chat-composer-input-background-color)",
            borderRadius: "25px",
          }}
        >
          <input
            style={{
              paddingLeft: "5px",
              border: "none",
              width: "100%",
              height: "100%",
              flex: 1,
              backgroundColor: "var(--chat-composer-input-background-color)",
            }}
            ref={inputRef}
            autoComplete="off"
            value={message}
            onChange={(e) => {
              {
                setMessage(e.target.value);
              }
            }}
          />
          <button
            className={`shadow-none border-0`}
            style={{
              backgroundColor: "var(--chat-composer-input-background-color)",
            }}
            type="button"
          >
            <Popover
              content={
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setMessage((prevMessage) => prevMessage + e.emoji);
                  }}
                />
              }
              title="Title"
              trigger="click"
            >
              <CustomCircleEmoji />
            </Popover>
          </button>
        </div>
      </div>
      <div className={styles.sendBtn}>
        <button
          className={`shadow-none border-0 bg-white mr-10px`}
          type="submit"
        >
          {showButtonSend ? <Like /> : <Send />}
        </button>
      </div>
    </form>
  );
};

export default FormChat;
