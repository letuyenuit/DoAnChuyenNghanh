import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protect = (props) => {
  const auth = useSelector((store) => store.auth);
  return auth.token ? props.children : <Navigate to="/login" />;
};

export default Protect;
