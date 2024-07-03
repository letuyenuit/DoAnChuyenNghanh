import React from "react";
import { ReactComponent as Video } from "./../../svg/video.svg";
import { ReactComponent as Phone } from "./../../svg/phone.svg";
import { ReactComponent as InforSvg } from "./../../svg/info.svg";
const MakeCall = ({ handleSendCallOffer }) => {
  return (
    <div className="col-sm-8 col-4">
      <ul className="list-inline user-chat-nav text-end mb-0 d-flex align-items-center justify-content-end">
        <li className="list-inline-item d-lg-inline-block me-2 ms-0">
          <button
            type="button"
            className="btn nav-btn shadow-none"
            onClick={() => {
              handleSendCallOffer();
            }}
          >
            <Phone />
          </button>
        </li>

        <li className="list-inline-item d-lg-inline-block me-2 ms-0">
          <button
            onClick={() => handleSendCallOffer()}
            type="button"
            className="btn nav-btn shadow-none"
          >
            <Video />
          </button>
        </li>

        <li className="list-inline-item">
          <div className="dropdown">
            <button className="btn nav-btn shadow-none" type="button">
              <InforSvg />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MakeCall;
