import React, { useEffect, useRef, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import styles from "./ChatFooter.module.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./ChatFooter";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
const AudioRecord = ({ setShowRecordAudio, socket }) => {
  const { id } = useParams();
  const [audioUrl, setAudioUrl] = useState(null);
  const [file, setFile] = useState(null);
  const isRecordRef = useRef(true);
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setFile(blob);
    setAudioUrl(url);
  };
  const uploadAudioFirebase = (file) => {
    const randomNumber = Math.floor(Math.random() * 8) + 1;
    const storageRef = ref(storage, `audio/${randomNumber}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      setFile(null);
      setAudioUrl(null);
      setShowRecordAudio(false);
      getDownloadURL(snapshot.ref).then((url) => {
        handleSendChat(url, "audio");
      });
    });
  };
  const handleCloseAudioRecord = () => {
    recorderControls.stopRecording();
    setFile(null);
    setAudioUrl(null);
    setShowRecordAudio(false);
  };
  const handleSendChat = (mes, type) => {
    try {
      const formData = new FormData();
      formData.append("content", mes);
      formData.append("type", type);
      formData.append("chatId", id);

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
  useEffect(() => {
    if (isRecordRef.current) {
      recorderControls.startRecording();
      return () => (isRecordRef.current = false);
    }
  }, []);
  return (
    <>
      <div className={styles.closeAudioRecord}>
        <button
          className={`shadow-none border-0 bg-white mr-10px`}
          onClick={() => {
            handleCloseAudioRecord();
          }}
        >
          <svg
            style={{ transform: "rotate(45deg)" }}
            height="20px"
            viewBox="0 0 24 24"
            width="20px"
          >
            <g fillRule="evenodd">
              <polygon fill="none" points="-6,30 30,30 30,-6 -6,-6 "></polygon>
              <path
                d="m18,11l-5,0l0,-5c0,-0.552 -0.448,-1 -1,-1c-0.5525,0 -1,0.448 -1,1l0,5l-5,0c-0.5525,0 -1,0.448 -1,1c0,0.552 0.4475,1 1,1l5,0l0,5c0,0.552 0.4475,1 1,1c0.552,0 1,-0.448 1,-1l0,-5l5,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1m-6,13c-6.6275,0 -12,-5.3725 -12,-12c0,-6.6275 5.3725,-12 12,-12c6.627,0 12,5.3725 12,12c0,6.6275 -5.373,12 -12,12"
                fill="var(--chat-composer-button-color)"
              ></path>
            </g>
          </svg>
        </button>
      </div>
      <div style={{ flex: 1 }}>
        {audioUrl ? (
          <audio controls src={audioUrl} style={{ width: "100%" }} />
        ) : (
          <AudioRecorder
            onRecordingComplete={(blob) => addAudioElement(blob)}
            recorderControls={recorderControls}
          />
        )}
      </div>
      <div className={styles.sendBtn}>
        <button
          className={`shadow-none border-0 bg-white mr-10px`}
          onClick={() => {
            uploadAudioFirebase(file);
          }}
        >
          <svg
            className="xsrhx6k"
            height="20px"
            viewBox="0 0 24 24"
            width="20px"
          >
            <title>Nhấn Enter để gửi</title>
            <path
              d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"
              fill="var(--chat-composer-button-color)"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default AudioRecord;
