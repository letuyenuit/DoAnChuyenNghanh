import React, { useContext, useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getApp } from "firebase/app";
import "firebase/compat/storage";
import axiosInstance from "../../axios/axiosInstance";
import "../../App.css";
import { useParams } from "react-router-dom";
import styles from "./ChatFooter.module.css";
import AudioRecord from "./AudioRecord";
import { socketContext } from "../../App";
import app from "../../firebase/ConnectFirebase";
import Reply from "./Reply";
import UploadFiles from "./UploadFiles";
import FormChat from "./FormChat";
import Options from "./Options";
let firebase = getApp(app.name);
export const storage = getStorage(
  firebase,
  process.env.REACT_APP_FIREBASE_BUCKET_URL
);
export const uploadFile = (storageRef, file) => {
  uploadBytes(storageRef, file).then((snapshot) => snapshot);
};
const ChatFooter = ({ ids, reply, setReply }) => {
  const socket = useContext(socketContext);
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [showRecordAudio, setShowRecordAudio] = useState(false);
  const [showButtonSend, setShowButtonSend] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  function handleChange(e) {
    setFiles(Array.from(e.target.files));
  }
  const uploadFileFirebase = (file) => {
    const randomNumber = Math.floor(Math.random() * 8) + 1;
    const storageRef = ref(storage, `files/${randomNumber}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        handleSendChat(url, file.type.includes("image") ? "image" : file.type);
      });
    });
  };

  const handleSendMultipleMessage = (files) => {
    setFiles([]);
    if (files.length > 0) {
      files.forEach((file) => {
        uploadFileFirebase(file);
      });
    }
    if (message) {
      handleSendChat(message, "text");
    }
  };
  const handleSendChat = (mes, type) => {
    try {
      setMessage("");
      const formData = new FormData();
      formData.append("content", mes);
      formData.append("type", type);
      formData.append("chatId", id);
      if (reply && reply.id) {
        formData.append("idReplyMessage", reply.id);
      }
      axiosInstance
        .post("/chat/send-message", formData)
        .then(async (res) => {
          socket.emit("sendMessage", {
            room: res.data.chatId,
            message: res.data.message,
          });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const handleSendNewChat = (mes, type) => {
    try {
      setMessage("");
      const formData = new FormData();
      formData.append("content", mes);
      formData.append("type", type);
      ids.forEach((el) => {
        formData.append("memberIds", el);
      });
      if (reply && reply.id) {
        formData.append("idReplyMessage", reply.id);
      }
      axiosInstance
        .post("/chat/send-message-new-chat", formData)
        .then(async (res) => {
          socket.emit("join_room_chat", {
            room: res.data.chatId,
          });
          socket.emit("sendMessage", {
            room: res.data.chatId,
            message: res.data.message,
          });
          socket.emit("new_chat", {
            ids: ids,
          });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (message.trim().length > 0) {
      if (socket) {
        socket.emit("typing", {
          room: id,
        });
      }
      setShowButtonSend(true);
    } else {
      if (socket) {
        socket.emit("stop typing", {
          room: id,
        });
      }
      setShowButtonSend(false);
    }
  }, [message, socket]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    return () => {
      setMessage("");
      setFiles([]);
    };
  }, [id]);
  useEffect(() => {
    if (files.length > 0) {
      setShowButtonSend(true);
    } else {
      setShowButtonSend(false);
    }
  }, [files]);
  return (
    <div
      style={{
        padding: "12px",
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
        flexDirection: `${showRecordAudio ? "row" : "column"}`,
      }}
    >
      {reply && <Reply reply={reply} setReply={setReply} />}
      {files.length > 0 && <UploadFiles files={files} setFiles={setFiles} />}
      {!showRecordAudio ? (
        <div style={{ width: "100%" }}>
          <div className={styles.toolBox} style={{ width: "100%" }}>
            <Options
              setShowRecordAudio={setShowRecordAudio}
              handleChange={handleChange}
              handleSendChat={handleSendChat}
              handleSendNewChat={handleSendNewChat}
              id={id}
            />
            <FormChat
              handleSendMultipleMessage={handleSendMultipleMessage}
              handleSendNewChat={handleSendNewChat}
              setMessage={setMessage}
              showButtonSend={showButtonSend}
              id={id}
              files={files}
              message={message}
              inputRef={inputRef}
            />
          </div>
        </div>
      ) : (
        <AudioRecord setShowRecordAudio={setShowRecordAudio} socket={socket} />
      )}
    </div>
  );
};

export default ChatFooter;
