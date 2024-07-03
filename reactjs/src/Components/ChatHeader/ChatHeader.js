import React, { useContext } from "react";
import styles from "./ChatHeader.module.css";
import "./../../App.css";
import { useSelector } from "react-redux";
import {
  handleGetIds,
  handleRenderAvatar,
  handleRenderName,
} from "../../until/RenderNameAvatar";
import { socketContext } from "../../App";
import MakeCall from "./MakeCall";
import ChatName from "./ChatName";

const ChatHeader = ({ chat }) => {
  const connection = useContext(socketContext);
  const auth = useSelector((state) => state.auth);
  const handleSendCallOffer = () => {
    try {
      const ids = handleGetIds(chat, auth);
      connection.emit("make_call", {
        chatId: chat.id,
        ids: ids,
      });
      window.open(`/video/${chat.id}`, "_blank");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div
        className={`${styles.userChatTopbar}`}
        style={{ padding: "12px 16px" }}
      >
        <div className="row align-items-center">
          {chat && auth && (
            <ChatName
              chat={chat}
              auth={auth}
              handleRenderName={handleRenderName}
              handleRenderAvatar={handleRenderAvatar}
            />
          )}
          <MakeCall handleSendCallOffer={handleSendCallOffer} />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
