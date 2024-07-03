import React from "react";
import SearchChat from "./SearchChat";
import AddChat from "./AddChat";
import styles from "./TabChat.module.css";
import ListChat from "./ListChat";
import Logout from "../Logout/Logout";

const TabChat = () => {
  return (
    <div id={styles.TabChat}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 className="m-0 fs-25px" style={{ fontWeight: "bold" }}>
          Đoạn chat
        </h4>
        <AddChat />
      </div>
      <SearchChat />
      <ListChat />
      <Logout />
    </div>
  );
};

export default TabChat;
