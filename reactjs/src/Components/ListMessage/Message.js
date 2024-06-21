import React, { useContext, useEffect, useState } from "react";
import styles from "./ListMessage.module.css";
import { useSelector } from "react-redux";
import RenderFile from "../Render/RenderFile";
const Message = ({ message, setReply, chat }) => {
  const auth = useSelector((state) => state.auth);
  const renderMessageContent = (message) => {
    switch (message.type) {
      case "gif":
      case "emoji":
      case "image":
        return (
          <div>
            <img
              id="imgContent"
              style={{
                borderRadius: "20px",
                width: "350px",
                height: "200px",
                objectFit: "cover",
                border: "1px solid var(--bs-border-color)",
              }}
              src={message.content}
            />
          </div>
        );
      case "text":
      case "":
        return (
          <div style={{ display: "inline-block", maxWidth: "100%" }}>
            <p
              id={styles.messageContent}
              style={{
                maxWidth: "100%",
                backgroundColor:
                  auth.user.id === message.idSender
                    ? "var(--chat-outgoing-message-bubble-background-color)"
                    : "var(--chat-incoming-message-bubble-background-color)",
                padding: "5px 10px",
                borderRadius: "20px",
                color: auth.user.id === message.idSender ? "#fff" : "#000000",
                wordWrap: "break-word",
                fontSize: "15px",
                position: "relative",
              }}
            >
              {message.content}
              <div
                className={
                  message.sender.id === auth.user.id
                    ? styles.replyOptionOwner
                    : styles.replyOptionOther
                }
              >
                <button className={styles.btnReply}>
                  <i className="bi bi-three-dots-vertical fs-18px"></i>
                </button>
                <button
                  className={styles.btnReply}
                  onClick={() => handleReplyMessage(message)}
                >
                  <i className="bi bi-reply-fill fs-25px"></i>
                </button>
              </div>
            </p>
          </div>
        );
      case "audio":
        return (
          <audio src={message.content} controls style={{ height: "50px" }} />
        );
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <RenderFile fileName={message.content} />;
      case "video/mp4":
        return (
          <div style={{ width: "350px", height: "200px" }}>
            <video
              controls
              src={message.content}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        );
      default:
        return null;
    }
  };
  const handleReplyMessage = (message) => {
    setReply(message);
  };
  return (
    <div className="mb-3">
      <div
        id={message.id}
        style={{ marginBottom: "10px" }}
        className={`d-flex align-items-end ${
          auth.user.id === message.idSender
            ? styles.rowMessage
            : styles.rowMessageOther
        }`}
      >
        {auth.user.id === message.idSender ? (
          ""
        ) : (
          <div
            style={{
              width: "30px",
              height: "30px",
              marginRight: "10px",
              minWidth: "30px",
            }}
          >
            <img
              src={
                chat?.memberChats.find((el) => el.user.id !== auth.user.id).user
                  .avartar
              }
              alt=""
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        <div className={styles.eachMessageBox}>
          {message.replyMessage && (
            <div
              style={{
                textAlign: message.idSender === auth.user.id ? "right" : "left",
              }}
            >
              <p
                className="fs-12px"
                style={{ color: "var(--placeholder-text)" }}
              >
                <i className="bi bi-reply-fill fs-18px"></i>
                {message.idSender === auth.user.id
                  ? "Bạn"
                  : `${message.sender?.name}`}{" "}
                đã trả lời{" "}
                {message.replyMessage.idSender === auth.user.id
                  ? "bạn"
                  : `${message.replyMessage.sender?.name}`}
              </p>
              <div
                style={{
                  backgroundColor:
                    "var(--chat-replied-message-background-color)",
                  padding: "8px 12px",
                  borderRadius: "20px",
                  display: "inline-block",
                }}
              >
                <a
                  href={`#${message.replyMessage.id}`}
                  className="fs-14px"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "var(--placeholder-text)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "200px",
                  }}
                >
                  {message.replyMessage.content}
                </a>
              </div>
            </div>
          )}
          <div
            style={{
              textAlign: message.sender.id === auth.user.id ? "right" : "left",
              maxWidth: "100%",
            }}
          >
            <div style={{ display: "inline-block", maxWidth: "100%" }}>
              {renderMessageContent(message)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
