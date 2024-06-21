import React from "react";
import "../../App.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  handleRenderAvatar,
  handleRenderName,
} from "../../until/RenderNameAvatar";
const SingleChat = ({ chat }) => {
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const relativeTime = (datetime) => {
    const timeVN = moment(new Date(datetime)).startOf("second").fromNow();
    return timeVN;
  };
  const renderLatestMessage = (mes) => {
    switch (mes.type) {
      case "text":
        return mes.content;
      case "image":
        return "Bạn đã gửi hình ảnh";
      case "audio":
        return "Bạn đã gửi audio";
      default:
        return "Bạn đã gửi file";
    }
  };
  return (
    <li className="mb-2" style={{ background: "#fff", borderRadius: "15px" }}>
      <Link
        to={`/chat/${chat.id}`}
        className="d-flex align-items-center text-decoration-none"
        style={{
          backgroundColor: `${
            id === chat.id ? "var(--hosted-view-selected-state)" : ""
          }`,
          padding: "10px 5px",
          borderRadius: "15px",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          <img
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={chat && auth && handleRenderAvatar(chat, auth)}
          />
        </div>
        <div style={{ width: "calc(100% - 75px)", paddingRight: "10px" }}>
          <div className="d-flex align-items-center justify-content-between">
            <p
              className="mb-0 fs-16px"
              style={{
                flex: "1",
                whiteSpace: "pre",
                textOverflow: "ellipsis",
                overflow: "hidden",
                color: "#000",
                fontWeight: "500",
              }}
            >
              {chat && auth && handleRenderName(chat, auth)}
            </p>
          </div>
          <div className="mb-0 fs-14px lateastMessage d-flex align-items-center opacity-50">
            <p
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {chat.lastMessage.idSender !== auth.user.id ? "" : "Bạn: "}
              {chat.lastMessage && `${renderLatestMessage(chat.lastMessage)}`}
            </p>
            <span className="fs-12px" style={{ marginLeft: "10px" }}>
              {relativeTime(chat.lastMessage.createAt)}
            </span>
          </div>
        </div>
        <p className="mb-0">
          <svg
            viewBox="0 0 12 13"
            width="16"
            height="16"
            fill="var(--disabled-icon)"
            className="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq"
          >
            <g fillRule="evenodd" transform="translate(-450 -1073)">
              <path d="m459.33 1076.878 2.524-2.525a.5.5 0 0 0-.707-.707l-2.323 2.323a3.606 3.606 0 0 0-1.838-1.322c.006-.048.014-.096.014-.147a1 1 0 0 0-2 0c0 .05.008.099.015.148-1.432.435-2.509 1.801-2.646 3.526l-.04.906c0 .273-.243.607-.502.96-.372.508-.834 1.14-.827 1.963.003.385.175.887.589 1.201l-1.442 1.442a.5.5 0 1 0 .707.707l1.853-1.853h.024l6.605-6.606-.007-.016m.141 6.622c1.115 0 1.526-.895 1.53-1.495.007-.824-.455-1.457-.827-1.965-.258-.353-.502-.686-.503-.981l-.04-.903c-.003-.043-.01-.083-.015-.126l-5.47 5.47h5.325zm-1.92 1h-3.1a.203.203 0 0 0-.138.352c.435.4 1.031.648 1.688.648s1.253-.247 1.687-.648a.204.204 0 0 0-.137-.352"></path>
            </g>
          </svg>
        </p>
      </Link>
    </li>
  );
};

export default SingleChat;
