import React from "react";

const RenderVideo = ({ file }) => {
  return (
    <div style={{ width: "100px", height: "100px" }}>
      <video
        autoPlay
        controls
        src={URL.createObjectURL(file)}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default RenderVideo;
