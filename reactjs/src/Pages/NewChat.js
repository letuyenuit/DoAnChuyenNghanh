import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import SingleUser from "../Components/SearchUser/SingleUser";
import Tag from "../Components/Tags/Tag";
import ListMessage from "../Components/ListMessage/ListMessage";
import ChatFooter from "../Components/ChatFooter/ChatFooter";

const NewChat = () => {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState(null);
  const handleGetUserByName = async (searchText) => {
    try {
      const exceptUser = {
        exceptIds: tags.map((el) => el.id),
      };
      axiosInstance
        .post(`/user/get-user-by-name?name=${searchText.trim()}`, {
          exceptIds: tags.map((el) => el.id),
        })
        .then((res) => setUsers(res.data.users))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetMessageByids = () => {
    try {
      axiosInstance
        .post(`/chat/get-message-by-ids?skip=1`, {
          exceptIds: tags.map((el) => el.id),
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.messages) {
            setMessages(res.data.messages);
          } else setMessages([]);
          if (res.data.chat) {
            setChat(res.data.chat);
          }
        })
        .catch((err) => {
          console.log(err);
          setMessages([]);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    try {
      handleGetUserByName(text);
    } catch (error) {
      setUsers([]);
    }
  }, [text]);
  useEffect(() => {
    if (tags.length > 0) {
      handleGetMessageByids();
    }
  }, [tags]);
  return (
    <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "15px",
          borderBottom: "1px solid var(--media-inner-border)",
          position: "relative",
        }}
      >
        <p>Đến:</p>
        {tags.length > 0 &&
          tags.map((el, idx) => {
            return <Tag user={el} setTags={setTags} key={idx} />;
          })}
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          autoComplete="off"
          style={{ flex: 1 }}
        />
        <ul
          className="list-unstyled p-0 m-0"
          style={{
            minWidth: "400px",
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1000,
          }}
        >
          {users &&
            users.length > 0 &&
            users.map((el, idx) => {
              return (
                <SingleUser
                  key={idx}
                  user={el}
                  setTags={setTags}
                  setText={setText}
                />
              );
            })}
        </ul>
      </div>

      {tags.length > 0 && (
        <>
          <ListMessage
            chat={chat}
            messages={messages}
            setMessages={setMessages}
            setReply={setReply}
          />
          <ChatFooter
            ids={tags.map((el) => el.id)}
            reply={reply}
            setReply={setReply}
          />
        </>
      )}
    </div>
  );
};

export default NewChat;
