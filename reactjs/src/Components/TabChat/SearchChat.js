import React from "react";
import styles from "./TabChat.module.css";
import "./../../App.css";
const SearchChat = () => {
  return (
    <div className="mt-3">
      <form
        style={{
          borderRadius: "25px",
          backgroundColor: "var(--chat-composer-input-background-color)",
        }}
      >
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control border-0 pe-0 shadow-none"
            id={styles.serachChatUser}
            autoComplete="off"
            placeholder="Search here"
          />
          <button
            className="btn shadow-none"
            type="button"
            id={styles.searchbtnddon}
          >
            <i
              className="bi bi-search"
              style={{ fontSize: "15px", color: "#000", fontWeight: "700" }}
            ></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchChat;
