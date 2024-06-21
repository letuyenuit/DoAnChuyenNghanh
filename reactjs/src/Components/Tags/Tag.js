import React from "react";

const Tag = ({ user, setTags }) => {
  const handleRemoveTag = () => {
    setTags((prev) => {
      return prev.filter((el) => el.id !== user.id);
    });
  };
  return (
    <div
      className="d-flex align-items-center"
      style={{
        padding: "5px 10px",
        backgroundColor: "var(--hosted-view-selected-state)",
        borderRadius: "10px",
      }}
    >
      <span
        style={{
          color: "var(--chat-outgoing-message-bubble-background-color)",
        }}
      >
        {user?.name}
      </span>
      <span onClick={() => handleRemoveTag()}>
        <i
          className="bi bi-x"
          style={{
            color: "var(--chat-outgoing-message-bubble-background-color)",
          }}
        ></i>
      </span>
    </div>
  );
};

export default Tag;
