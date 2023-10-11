import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home_Chat from "./components/Home_Chat";
import List_Request from "./components/List_Friend";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Home_Chat />} />
        <Route path="/list-request" element={<List_Request />} />
      </Routes>
    </>
  );
}

export default App;
