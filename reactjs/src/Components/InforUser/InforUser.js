import React from "react";
import { Link } from "react-router-dom";
import styles from "./InforUser.module.css";
import { Collapse, theme } from "antd";
import { useSelector } from "react-redux";
import {
  handleRenderAvatar,
  handleRenderName,
} from "../../until/RenderNameAvatar";
import { ReactComponent as Gim } from "./../../svg/gim.svg";
import { ReactComponent as Send } from "./../../svg/send.svg";
import { ReactComponent as CustomUpload } from "./../../svg/upload.svg";
import { ReactComponent as OnNotification } from "./../../svg/notification.svg";
import { ReactComponent as Block } from "./../../svg/block.svg";
import { ReactComponent as User } from "./../../svg/user.svg";
import { ReactComponent as DarkOffNotification } from "./../../svg/darkoffnotification.svg";
import { ReactComponent as SearchSvg } from "./../../svg/search.svg";
const items = [
  {
    key: "1",
    label: <h2 className="fs-15px">Thông tin về đoạn chat</h2>,
    children: (
      <p className="d-flex align-items-center ">
        <Gim />
        <p style={{ color: "#000", marginLeft: "10px" }}>
          Xem tin nhắn đã ghim
        </p>
      </p>
    ),
  },
  {
    key: "2",
    label: <h2 className="fs-15px">Tùy chỉnh đoạn chat</h2>,
    children: (
      <p style={{ color: "#000" }} className="d-flex align-items-center ">
        <Send />
        <p style={{ color: "#000", marginLeft: "10px" }}>
          Thay đổi biểu tượng cảm xúc
        </p>
      </p>
    ),
  },
  {
    key: "3",
    label: <h2 className="fs-15px">File phương tiện, file và liên kết</h2>,
    children: (
      <p style={{ color: "#000" }} className="d-flex align-items-center ">
        <CustomUpload />
        <p style={{ color: "#000", marginLeft: "10px" }}>File phương tiện</p>
      </p>
    ),
  },
  {
    key: "4",
    label: <h2 className="fs-15px">Quyền riêng tư & hỗ trợ</h2>,
    children: (
      <div>
        <p style={{ color: "#000" }} className="d-flex align-items-center mb-2">
          <OnNotification />
          <p style={{ color: "#000", marginLeft: "10px" }}>Bật thông báo</p>
        </p>
        <p style={{ color: "#000" }} className="d-flex align-items-center ">
          <Block />
          <p style={{ color: "#000", marginLeft: "10px" }}>Chặn</p>
        </p>
      </div>
    ),
  },
];
const InforUser = ({ chat }) => {
  const { token } = theme.useToken();
  const auth = useSelector((state) => state.auth);
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
          }}
        >
          <img
            src={chat && auth && handleRenderAvatar(chat, auth)}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <Link
        to={""}
        style={{
          fontSize: "17px",
          color: "#000",
          textDecoration: "none",
          fontWeight: "500",
          textAlign: "center",
          display: "block",
          marginTop: "5px",
        }}
      >
        {chat && auth && handleRenderName(chat, auth)}
      </Link>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className={styles.hideTextBox}>
          <button className={styles.btnMessage}>
            <User />
          </button>
          <p className={styles.hideText}>Thông tin cá nhân</p>
        </div>

        <div className={styles.hideTextBox}>
          <button className={styles.btnMessage}>
            <DarkOffNotification />
          </button>
          <p className={styles.hideText}>Bật lại</p>
        </div>

        <div className={styles.hideTextBox}>
          <button className={styles.btnMessage}>
            <SearchSvg />
          </button>
          <p className={styles.hideText}>Tìm kiếm</p>
        </div>
      </div>
      <Collapse
        style={{ marginTop: "15px", background: token.colorBgContainer }}
        items={items}
        onChange={onChange}
        bordered={false}
        expandIconPosition="end"
        ghost
        size="small"
      />
    </div>
  );
};

export default InforUser;
