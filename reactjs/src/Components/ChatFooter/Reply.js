import React from "react";

const Reply = ({ reply, setReply }) => {
  return (
    <div
      style={{
        borderTop: "1px solid var(--bs-border-color)",
        padding: "5px 0px",
        position: "relative",
        width: "100%",
      }}
    >
      <h1 className="fs-16px" style={{ fontWeight: "900" }}>
        Đang trả lời chính mình
      </h1>
      <p
        className="fs-14px opacity-50"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {reply.content}
      </p>
      <button
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          border: "none",
          backgroundColor: "#fff",
        }}
        onClick={() => setReply(null)}
      >
        <i className="bi bi-x fs-20px"></i>
      </button>
    </div>
  );
};

export default Reply;
