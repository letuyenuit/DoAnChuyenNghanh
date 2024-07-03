import React, { useContext, useEffect } from "react";
import "../../App.css";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { socketContext } from "../../App";
import Message from "./Message";
import {
  handleRenderAvatar,
  handleRenderName,
} from "../../until/RenderNameAvatar";
const ListMessage = (props) => {
  const socket = useContext(socketContext);
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        props.setMessages((prev) => {
          prev = prev.filter((el) => el.id !== data.message.id);
          const newMessage = [...prev, data.message];
          return newMessage;
        });
      });
    }
  }, [socket]);
  useEffect(() => {
    var box = document.getElementById("message-box");
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
    return () => {
      props.setReply(null);
    };
  }, [props.messages, id]);
  return (
    <>
      <div
        id="message-box"
        className="p-2"
        style={{
          flex: 1,
          overflowY: "scroll",
        }}
      >
        <div className="mt-5 mb-3">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
              }}
            >
              <img
                src={props.chat && auth && handleRenderAvatar(props.chat, auth)}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <Link
            to={""}
            style={{
              fontSize: "17px",
              color: "#000",
              textDecoration: "none",
              fontWeight: "500",
              textAlign: "center",
              display: "block",
              marginTop: "5px",
            }}
          >
            {props.chat && auth && handleRenderName(props.chat, auth)}
          </Link>
        </div>
        <div>
          {props.messages &&
            props.messages.length > 0 &&
            props.messages.map((message, index) => {
              return (
                <Message
                  chat={props.chat}
                  key={index}
                  message={message}
                  setMessages={props.setMessages}
                  setReply={props.setReply}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ListMessage;
