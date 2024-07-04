import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Protect from "./protectPage/Protect";
import Signup from "./Pages/Signup/Signup";
import DetailChat from "./Pages/DetailChat";
import Layout from "./Components/Layout";
import SearchUser from "./Components/SearchUser/SearchUser";
import { createContext, useEffect, useState } from "react";
import VideoCall from "./Pages/VideoCall/VideoCall";
import NewChat from "./Pages/NewChat";
// import io from "socket.io-client";
import { io } from "socket.io-client";

import Hello from "./Components/Hello";
import EasyMasonryComponent from "./Components/Masonry";
export const signalRContext = createContext(null);
export const socketContext = createContext(null);
function App() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    try {
      const conn = io({
        path: "/socket/",
      });
      console.log(conn);
      // const conn = io(process.env.REACT_APP_SOCKET_SERVER_URL);
      setSocket(conn);
    } catch (err) {}
  }, []);
  return (
    <socketContext.Provider value={socket}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Protect>
                <Layout>
                  <Outlet />
                </Layout>
              </Protect>
            }
          >
            <Route path="/chat/:id" element={<DetailChat />} />
            <Route
              path="/friends"
              element={
                <>
                  <SearchUser />
                </>
              }
            />
            <Route path="/newchat" element={<NewChat />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/video/:groupId"
            element={<VideoCall socket={socket} />}
          />

          <Route path="/test" element={<Hello />} />
          <Route path="/masonry" element={<EasyMasonryComponent />} />
        </Routes>
      </div>
    </socketContext.Provider>
  );
}

export default App;
