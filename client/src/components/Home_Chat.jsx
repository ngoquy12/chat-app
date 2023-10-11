import React from "react";
import Sidebar from "./Sidebar";
import List_Chat from "./List_Chat";
import Chat from "./Chat";

export default function Home_Chat() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <List_Chat />
        {/* <Chat /> */}
      </div>
    </>
  );
}
