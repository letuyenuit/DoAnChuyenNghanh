import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import SingleChat from "./SingleChat";
import axiosInstance from "../../axios/axiosInstance";
import { useSelector } from "react-redux";
import { socketContext } from "../../App";
const ListChat = () => {
  const socket = useContext(socketContext);

  const auth = useSelector((state) => state.auth);
  const [chats, setChats] = useState([]);
  const handleFetchChat = async () => {
    try {
      axiosInstance.get("/chat/get-all-chat").then((res) => {
        setChats(res.data.chats);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleFetchChat();
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("new_message", () => {
        console.log("event new message");
        handleFetchChat();
      });
    }
  }, [socket]);
  return (
    <div className="mt-2 h-100" style={{ overflowY: "scroll" }}>
      <ul className="list-unstyled p-0 m-0 h-100">
        {chats &&
          chats.length > 0 &&
          chats.map((el, idx) => {
            return <SingleChat key={idx} chat={el} />;
          })}
      </ul>
    </div>
  );
};

export default ListChat;
