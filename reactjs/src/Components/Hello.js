import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";

const Hello = () => {
  const [obj, setObj] = useState({});
  useEffect(() => {
    try {
      axiosInstance.get("/test").then((res) => {
        console.log(res.data);
        setObj(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div>
      <p>Hello test doker file {obj.from}~~~~~</p>
      <p>{obj.message}</p>
    </div>
  );
};

export default Hello;
