import React from "react";
import { Link } from "react-router-dom";

const SingleUser = (props) => {
  return (
    <li className="mb-2">
      <Link
        onClick={(e) => {
          e.preventDefault();
          props.setText("");
          props.setTags((prev) => {
            return [...prev, props.user];
          });
        }}
        to={`/chat/user/${props.user.id}`}
        className="d-flex align-items-center text-decoration-none"
        style={{
          //   backgroundColor: "#2c2c30",
          padding: "10px",
          borderRadius: "15px",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ width: "15%" }}>
          <img
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            src="https://res.cloudinary.com/dalz888e7/image/upload/v1698212183/my_image_product/hr-manager_8955147.png"
          />
        </div>
        <div style={{ width: "85%" }}>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 fs-16px">{props.user.name}</p>
          </div>
          <div className="mb-0 fs-14px lateastMessage">{props.user.email}</div>
        </div>
      </Link>
    </li>
  );
};

export default SingleUser;
