import React, { useContext, useEffect, useState } from "react";
import ChatHeader from "../Components/ChatHeader/ChatHeader";
import ListMessage from "../Components/ListMessage/ListMessage";
import ChatFooter from "../Components/ChatFooter/ChatFooter";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import { useSelector } from "react-redux";
import InforUser from "../Components/InforUser/InforUser";
import { socketContext } from "../App";
import Typing from "../Components/Typing/Typing";
import { handleRenderAvatar } from "../until/RenderNameAvatar";

const DetailChat = () => {
  const socket = useContext(socketContext);
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState(null);
  const handleFetchMessage = (id) => {
    try {
      axiosInstance
        .get(`/chat/get-chat-by-id?id=${id}&skip=1`)
        .then((res) => {
          if (res.data) {
            setMessages(res.data.messages);
            const objChat = {
              id: res.data.id,
              image: res.data.image,
              name: res.data.name,
              isGroup: res.data.isGroup,
              memberChats: res.data.memberChats,
              idLastMessage: res.data.idLastMessage,
            };
            setChat(objChat);
          } else setMessages([]);
        })
        .catch((err) => {
          setMessages([]);
        });
    } catch (err) {}
  };

  useEffect(() => {
    if (id) {
      handleFetchMessage(id);
    }
  }, [id]);
  useEffect(() => {
    if (socket) {
      socket.emit("join_room_chat", {
        room: id,
      });
    }
    return () => {
      if (socket) {
        socket.emit("stop typing", {
          room: id,
        });
        socket.emit("leave_room_chat", {
          room: id,
        });
      }
    };
  }, [socket, id]);
  useEffect(() => {
    if (socket) {
      socket.on("typing", () => {
        setIsTyping(true);
      });
      socket.on("stop typing", () => {
        setIsTyping(false);
      });
    }
  }, [socket]);

  return (
    <>
      <div id="layoutChatRoom">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
            borderRight: "1px solid var(--media-inner-border)",
          }}
        >
          <ChatHeader chat={chat} />
          <ListMessage
            reply={reply}
            setReply={setReply}
            messages={messages}
            setMessages={setMessages}
            idLastMessage={chat?.idLastMessage}
            chat={chat}
          />
          {isTyping && (
            <Typing imgSrc={chat && auth && handleRenderAvatar(chat, auth)} />
          )}
          <ChatFooter reply={reply} setReply={setReply} />
        </div>
      </div>
      <div id="layoutInforUser" style={{ padding: "15px 12px" }}>
        <InforUser chat={chat} />
      </div>
    </>
  );
};

export default DetailChat;
