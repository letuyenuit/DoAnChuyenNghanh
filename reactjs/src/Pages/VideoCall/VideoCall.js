import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";

const pc_config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
const VideoCall = ({ socket }) => {
  const pcsRef = useRef({});
  const cameraRef = useRef();
  const micRef = useRef();
  const localVideoRef = useRef(null);
  const localStreamRef = useRef();
  const [users, setUsers] = useState([]);
  const [local, setLocal] = useState(null);
  const { groupId } = useParams();
  const displayMediaOptions = {
    video: {
      displaySurface: "window",
    },
    audio: false,
  };
  const OnOffCamera = async () => {
    let videoTrack = localStreamRef.current
      .getTracks()
      .find((track) => track.kind === "video");

    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      cameraRef.current.style.backgroundColor = "rgb(255, 80, 80)";
    } else {
      videoTrack.enabled = true;
      cameraRef.current.style.backgroundColor = "rgb(179, 102, 249, .9)";
    }
  };

  const OnOffMic = async () => {
    let audioTrack = localStreamRef.current
      .getTracks()
      .find((track) => track.kind === "audio");
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      micRef.current.style.backgroundColor = "rgb(255, 80, 80)";
    } else {
      audioTrack.enabled = true;
      micRef.current.style.backgroundColor = "rgb(179, 102, 249, .9)";
    }
  };
  const getLocalStream = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 240,
          height: 240,
        },
      });
      localStreamRef.current = localStream;
      setLocal(localStream);
      socket.emit("join_room", {
        room: groupId,
        email: "sample@naver.com",
      });
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
    } catch (e) {}
  };
  async function startCapture() {
    try {
      const share_scr = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
      console.log("A");
      socket.emit("share_screen", {
        room: groupId,
        screen: share_scr.getTracks(),
      });
      console.log("B");
    } catch (err) {
      console.error(err);
    }
  }
  const createPeerConnection = (socketID, email) => {
    try {
      const pc = new RTCPeerConnection(pc_config);

      pc.onicecandidate = (e) => {
        if (!(socket && e.candidate)) return;
        socket.emit("candidate", {
          candidate: e.candidate,
          candidateSendID: socket.id,
          candidateReceiveID: socketID,
        });
      };

      pc.oniceconnectionstatechange = (e) => {};

      pc.ontrack = (e) => {
        setUsers((oldUsers) =>
          oldUsers
            .filter((user) => user.id !== socketID)
            .concat({
              id: socketID,
              email,
              stream: e.streams[0],
            })
        );
      };

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          if (!localStreamRef.current) return;
          pc.addTrack(track, localStreamRef.current);
        });
      } else {
      }

      return pc;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };
  useEffect(() => {
    getLocalStream();
  }, []);
  useEffect(() => {
    if (socket) {
      getLocalStream();
      socket.on("all_users", (allUsers) => {
        allUsers.forEach(async (user) => {
          if (!localStreamRef.current) return;

          const pc = createPeerConnection(user.id, user.email);
          if (!(pc && socket)) return;

          pcsRef.current = { ...pcsRef.current, [user.id]: pc };
          try {
            const localSdp = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            });
            await pc.setLocalDescription(new RTCSessionDescription(localSdp));
            socket.emit("offer", {
              sdp: localSdp,
              offerSendID: socket.id,
              offerSendEmail: "offerSendSample@sample.com",
              offerReceiveID: user.id,
            });
          } catch (e) {
            console.error(e);
          }
        });
      });

      socket.on("getOffer", async (data) => {
        const { sdp, offerSendID, offerSendEmail } = data;
        if (!localStreamRef.current) return;
        const pc = createPeerConnection(offerSendID, offerSendEmail);
        if (!(pc && socket)) return;
        pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socket.emit("answer", {
            sdp: localSdp,
            answerSendID: socket.id,
            answerReceiveID: offerSendID,
          });
        } catch (e) {
          console.error(e);
        }
      });

      socket.on("getAnswer", (data) => {
        const { sdp, answerSendID } = data;
        const pc = pcsRef.current[answerSendID];
        if (!pc) return;
        pc.setRemoteDescription(new RTCSessionDescription(sdp));
      });

      socket.on("getCandidate", async (data) => {
        const pc = pcsRef.current[data.candidateSendID];
        if (!pc) return;
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      });

      socket.on("receive_screen", async (data) => {
        if (data.screen) {
          console.log(data.screen);
        }
      });
      socket.on("user_exit", (data) => {
        if (!pcsRef.current[data.id]) return;
        pcsRef.current[data.id].close();
        delete pcsRef.current[data.id];
        setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
      });
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
      users.forEach((user) => {
        if (!pcsRef.current[user.id]) return;
        pcsRef.current[user.id].close();
        delete pcsRef.current[user.id];
      });
    };
  }, [socket]);

  return (
    <div
      id="test"
      style={{
        position: "fixed",
        backgroundColor: "black",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
      }}
    >
      <div id="videos">
        {!(users.length > 1) && (
          <video
            className="video-player"
            id="localVideo"
            ref={(tag) => {
              if (tag && localStreamRef) {
                tag.srcObject = localStreamRef.current;
              }
            }}
            autoPlay
            playsInline
            style={{
              position: "absolute",
              width: "350px",
              height: "200px",
              top: "0",
              right: "0",
            }}
          ></video>
        )}

        {users.length === 1 && (
          <video
            className="video-player"
            id="remoteVideo"
            ref={(tag) => {
              if (tag && users[0].stream) {
                tag.srcObject = users[0].stream;
              }
            }}
            autoPlay
            playsInline
          ></video>
        )}
        {users.length > 1 && (
          <Row gutter={[8, 8]}>
            <Col span={6}>
              <video
                style={{ width: "100%" }}
                ref={(tag) => {
                  if (tag && local) {
                    tag.srcObject = local;
                  }
                }}
                autoPlay
                playsInline
              ></video>
            </Col>
            {users.map((user, idx) => {
              return (
                <Col span={6}>
                  <video
                    style={{ width: "100%" }}
                    ref={(tag) => {
                      if (tag && user.stream) {
                        tag.srcObject = user.stream;
                      }
                    }}
                    autoPlay
                    playsInline
                  ></video>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
      {/* <video
        autoPlay
        ref={(tag) => {
          if (tag && shareScreen) {
            tag.srcObject = shareScreen;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      ></video> */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "50%",
          transform: "translateX(50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          minWidth: "300px",
        }}
      >
        <button
          onClick={() => {
            OnOffMic();
          }}
          ref={micRef}
          className="shadow-none"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            padding: "10px",
            border: "none",
            backgroundColor: "rgb(179, 102, 249, .9)",
          }}
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src="/images/mic.png"
          />
        </button>
        <button
          onClick={() => {
            OnOffCamera();
          }}
          ref={cameraRef}
          className="shadow-none"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            padding: "10px",
            border: "none",
            backgroundColor: "rgb(179, 102, 249, .9)",
          }}
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src="/images/camera.png"
          />
        </button>
        <button
          className="shadow-none"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            padding: "10px",
            border: "none",
            backgroundColor: "red",
          }}
          onClick={() => {
            window.close();
          }}
        >
          <img
            src="/images/phone.png"
            style={{ width: "100%", height: "100%" }}
          />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
