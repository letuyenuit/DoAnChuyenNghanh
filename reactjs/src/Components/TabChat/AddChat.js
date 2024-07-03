import React, { useRef } from "react";
import "./../../App.css";
import { Link } from "react-router-dom";

const AddChat = () => {
  return (
    <div>
      <div className="d-flex align-items-center mt-2">
        <button
          className="border-0 shadow-none d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "var(--secondary-button-background)",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            marginLeft: "5px",
            marginRight: "5px",
          }}
        >
          <svg viewBox="0 0 20 20" width="20" height="20" fill="#000">
            <g fillRule="evenodd" transform="translate(-446 -398)">
              <path d="M458 408a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
            </g>
          </svg>
        </button>
        <Link
          to={"/newchat"}
          className="border-0 shadow-none d-flex align-items-center justify-content-center"
          style={{
            marginLeft: "5px",
            marginRight: "5px",

            backgroundColor: "var(--secondary-button-background)",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
          }}
        >
          <svg viewBox="0 0 12 13" width="20" height="20" fill="#000">
            <g fillRule="evenodd" transform="translate(-450 -1073)">
              <g>
                <path
                  d="M105.506 926.862a.644.644 0 0 1-.644.644h-6.724a.644.644 0 0 1-.644-.644v-6.724c0-.356.288-.644.644-.644h2.85c.065 0 .13-.027.176-.074l.994-.993a.25.25 0 0 0-.177-.427h-3.843A2.138 2.138 0 0 0 96 920.138v6.724c0 1.18.957 2.138 2.138 2.138h6.724a2.138 2.138 0 0 0 2.138-2.138v-3.843a.25.25 0 0 0-.427-.177l-1.067 1.067v2.953zm1.024-9.142a.748.748 0 0 0-1.06 0l-.589.588a.25.25 0 0 0 0 .354l1.457 1.457a.25.25 0 0 0 .354 0l.588-.589a.75.75 0 0 0 0-1.06l-.75-.75z"
                  transform="translate(354.5 156)"
                ></path>
                <path
                  d="M99.22 923.97a.75.75 0 0 0-.22.53v.75c0 .414.336.75.75.75h.75a.75.75 0 0 0 .53-.22l4.248-4.247a.25.25 0 0 0 0-.354l-1.457-1.457a.25.25 0 0 0-.354 0l-4.247 4.248z"
                  transform="translate(354.5 156)"
                ></path>
              </g>
            </g>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default AddChat;
