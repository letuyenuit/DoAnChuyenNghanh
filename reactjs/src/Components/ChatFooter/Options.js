import React from "react";
import styles from "./ChatFooter.module.css";
import { Popover } from "antd";
import GifPicker from "gif-picker-react";
import { ReactComponent as Mic } from "./../../svg/mic.svg";
import { ReactComponent as Plus } from "./../../svg/plus.svg";
import { ReactComponent as CustomUpload } from "./../../svg/upload.svg";
import { ReactComponent as CustomEmoji } from "./../../svg/emoji.svg";
import { ReactComponent as CustomGif } from "./../../svg/gif.svg";
const Options = ({
  setShowRecordAudio,
  handleChange,
  handleSendChat,
  handleSendNewChat,
  id,
}) => {
  return (
    <div className={styles.toolBox}>
      <button className={`shadow-none border-0 bg-white mr-10px`}>
        <Popover
          content={
            <button
              style={{
                backgroundColor: "#fff",
                border: "none",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => {
                setShowRecordAudio(true);
              }}
            >
              <Mic />
              <p style={{ marginLeft: "10px", fontWeight: "600" }}>
                Gửi clip âm thanh
              </p>
            </button>
          }
          trigger="click"
        >
          <Plus />
        </Popover>
      </button>
      <label
        className={`shadow-none border-0 bg-white mr-10px`}
        style={{ cursor: "pointer" }}
      >
        <CustomUpload />

        <input
          type="file"
          multiple
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </label>
      <button className={`shadow-none border-0 bg-white mr-10px`}>
        <Popover content={<p></p>} trigger="click">
          <CustomEmoji />
        </Popover>
      </button>
      <button className={`shadow-none border-0 bg-white mr-10px`}>
        <Popover
          content={
            <div>
              <GifPicker
                tenorApiKey={"AIzaSyArtbLdi573g5TKL51sdKDF7PI8o4Seyp4"}
                autoFocusSearch={true}
                onGifClick={(g, e) => {
                  if (id) {
                    handleSendChat(g.url, "gif");
                  } else {
                    handleSendNewChat(g.url, "gif");
                  }
                }}
              />
            </div>
          }
          trigger="click"
        >
          <CustomGif />
        </Popover>
      </button>
    </div>
  );
};

export default Options;
