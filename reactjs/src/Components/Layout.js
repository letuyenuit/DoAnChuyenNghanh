import React, { useContext, useEffect, useState } from "react";
import "./../App.css";
import { Modal } from "antd";
import Home from "../Pages/Home";
import { socketContext } from "../App";
import { useSelector } from "react-redux";
const tone = new Audio("/audio/audio-call.mp3");
const Layout = (props) => {
  const connection = useContext(socketContext);
  const auth = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupId, setGroupId] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    tone.pause();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    tone.pause();
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (connection) {
      connection.on("receive_call", (data) => {
        if (data.ids.includes(auth.user.id)) {
          setGroupId(data.chatId);
          showModal();
          tone.currentTime = 0;
          tone.play();
          tone.addEventListener("ended", function () {
            handleCancel();
          });
        }
      });

      return () => {
        connection.off("ReceiveOfferCall");
      };
    }
  }, [connection]);
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Modal
        title="Cuộc gọi đến"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <button
            className="btn btn-success shadow-none"
            onClick={() => {
              handleOk();
              window.open(`/video/${groupId}`, "_blank");
            }}
          >
            Chấp nhận
          </button>
          <button
            className="btn btn-danger shadow-none"
            onClick={() => {
              handleCancel();
            }}
          >
            Hủy
          </button>
        </div>
      </Modal>
      <Home />
      {props.children}
    </div>
  );
};

export default Layout;
