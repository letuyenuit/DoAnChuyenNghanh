import React, { useState } from "react";
import styles from "../TabChat/TabChat.module.css";
import SingleUser from "./SingleUser";
import axiosInstance from "../../axios/axiosInstance";
const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const handleGetUserByName = async (searchText) => {
    try {
      axiosInstance
        .get(`/user/get-user-by-name?name=${searchText}`)
        .then((res) => setUsers(res.data.users))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4
          className="m-0"
          style={{ color: "var(--bs-heading-color)", fontSize: "1.3125rem" }}
        >
          Search your friend
        </h4>
      </div>
      <div className="mt-3">
        <form>
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={(e) => handleGetUserByName(e.target.value)}
              className="form-control bg-light border-0 pe-0 shadow-none"
              id={styles.serachChatUser}
              autoComplete="off"
              placeholder="Search here"
            />
            <button
              className="btn btn-light"
              type="button"
              id={styles.searchbtnddon}
            >
              <i
                className="bi bi-search"
                style={{ fontSize: "15px", color: "#000", fontWeight: "700" }}
              ></i>
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <ul className="list-unstyled p-0 m-0">
          {users && users.length > 0 ? (
            users.map((el, idx) => {
              return <SingleUser key={idx} user={el} />;
            })
          ) : (
            <li className="text-center">No result</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchUser;
