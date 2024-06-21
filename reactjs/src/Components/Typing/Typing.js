import React from "react";

const Typing = ({ imgSrc }) => {
  return (
    <div style={{ padding: "8px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src={imgSrc}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        <div id="wave">
          <span class="dot one"></span>
          <span class="dot two"></span>
          <span class="dot three"></span>
        </div>
      </div>
    </div>
  );
};

export default Typing;
