import React from "react";

const RenderImage = ({ file, setFiles }) => {
  console.log(file);
  return (
    <div style={{ height: "50px", width: "50px", position: "relative" }}>
      <img
        src={URL.createObjectURL(file)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        onClick={() => {
          setFiles((prev) => {
            return prev.filter((el) => el.name !== file.name);
          });
        }}
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          cursor: "pointer",
          color: "var(--chat-composer-button-color)",
          backgroundColor: "#fff",
          width: "20px",
          height: " 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "1px solid #ccc",
        }}
      >
        <i className="bi bi-x fs-18px"></i>
      </div>
    </div>
  );
};

export default RenderImage;
