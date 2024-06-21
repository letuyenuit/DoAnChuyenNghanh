import React from "react";
import { ReactComponent as OffNotification } from "./../../svg/offnotification.svg";
const ChatName = ({ chat, auth, handleRenderName, handleRenderAvatar }) => {
  return (
    <div className="col-sm-4 col-8">
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 d-block d-lg-none d-xl-none d-md-none">
          <a href="#" className="user-chat-remove font-size-18 p-1 me-3">
            <i className="bi bi-arrow-left-short fs-25px"></i>
          </a>
        </div>
        <div className="flex-grow-1 overflow-hidden">
          <div className="d-flex align-items-center">
            <div
              className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0"
              style={{
                width: "45px",
                height: "45px",
                position: "relative",
              }}
            >
              <img
                src={chat && auth && handleRenderAvatar(chat, auth)}
                className="rounded-circle avatar-sm"
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="flex-grow-1 overflow-hidden">
              <h6 className="text-truncate mb-0 font-size-18">
                <a
                  href="#"
                  className="user-profile-show text-reset text-decoration-none font-size-18px"
                  style={{ fontWeight: "bold" }}
                >
                  {chat && auth && handleRenderName(chat, auth)}
                </a>
              </h6>
              <p className="text-truncate text-muted mb-0">
                <OffNotification />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatName;
