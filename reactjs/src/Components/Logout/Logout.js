import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 5px",
        justifyContent: "space-between",
        borderTop: "1px solid var(--media-inner-border)",
        cursor: "pointer",
      }}
    >
      <div style={{ marginRight: "10px" }}>
        <img
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          src={auth.user.avartar}
        />
      </div>

      <div
        style={{
          flex: 1,
        }}
      >
        <h2 className="mb-0 fs-20px">{auth.user.name}</h2>
        <div className="mb-0 fs-14px">{auth.user.email}</div>
      </div>
      <div
        onClick={() => {
          handleLogout();
        }}
      >
        <img
          src="https://res.cloudinary.com/dalz888e7/image/upload/v1715611096/logging-out-2355227_1280_k87vri.webp"
          style={{ width: "40px", height: "40px" }}
        />
      </div>
    </div>
  );
};

export default Logout;
