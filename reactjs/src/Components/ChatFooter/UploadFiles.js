import React from "react";
import RenderImage from "../Render/RenderImage";
import RenderVideo from "../Render/RenderVideo";
import RenderFile from "../Render/RenderFile";

const UploadFiles = ({ files, setFiles }) => {
  return (
    <div
      style={{
        borderTop: "1px solid var(--bs-border-color)",
        padding: "5px 0px",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          flexWrap: "nowrap",
          width: "100%",
        }}
      >
        {files.map((file, index) => {
          if (file.type.includes("image")) {
            return (
              <div key={index}>
                <RenderImage file={file} setFiles={setFiles} />
              </div>
            );
          } else if (file.type.includes("video")) {
            return (
              <div key={index}>
                <RenderVideo file={file} key={index} />{" "}
              </div>
            );
          } else {
            return (
              <div key={index}>
                <RenderFile
                  fileName={file.name}
                  key={index}
                  setFiles={setFiles}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default UploadFiles;
