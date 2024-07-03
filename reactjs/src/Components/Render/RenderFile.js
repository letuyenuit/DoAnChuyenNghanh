import React from "react";

const RenderFile = ({ fileName, setFiles }) => {
  return (
    <div
      style={{
        minWidth: "150px",
        maxWidth: "150px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        padding: "5px 10px",
        backgroundColor: "var(--wash)",
        borderRadius: "10px",
        position: "relative",
        marginRight: "10px",
      }}
    >
      <div
        style={{
          minWidth: "30px",
          minHeight: "30px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          marginRight: "5px",
        }}
      >
        <i className="bi bi-file-earmark-text-fill"></i>
      </div>
      <div
        style={{
          color: "#000",
          fontWeight: 800,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {fileName}
      </div>
      <div
        onClick={() => {
          setFiles((prev) => {
            return prev.filter((el) => el.name !== fileName);
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

export default RenderFile;
