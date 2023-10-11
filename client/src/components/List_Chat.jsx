import {
  BellOutlined,
  FileImageOutlined,
  SendOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import instance from "../api/config";
import debounce from "lodash.debounce";
import InputEmoji from "react-input-emoji";
import moment from "moment";
import io from "socket.io-client";

export default function List_Chat() {
  // Socket io
  const socket = io("http://localhost:8080");

  const userLocal = JSON.parse(localStorage.getItem("token"));
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [text, setText] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [nameChat, setNameChat] = useState("");
  const [message, setMessage] = useState([]);
  const inputRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  const searchFriend = async () => {
    try {
      const response = await instance.get(
        `users/search-friend?search=${search}`
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search.trim() !== "") {
      const delaySearch = debounce(() => {
        searchFriend();
      }, 200);
      delaySearch();
      return delaySearch.cancel;
    }
  }, [search]);

  // Kết bạn
  const handleAddFriend = async (friendId) => {
    await instance.post("users/add-friend", {
      UserId: userLocal.UserId,
      FriendId: friendId,
      Status: 0,
    });
  };

  const getAllRoom = async () => {
    try {
      const response = await instance.get(`chats/${userLocal.UserId}`);
      setRooms(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRoom();
  }, []);

  const getChatId = (id, name) => {
    setChatId(id);
    setNameChat(name);
  };

  const getMessageByChatId = async () => {
    const response = await instance.get(`chats/message/${chatId}`);
    setMessage(response?.data);
  };

  useEffect(() => {
    getMessageByChatId();
  }, [chatId]);

  useEffect(() => {
    // Lắng nghe sự kiện "newMessage" một lần duy nhất
    socket.on("newMessage", (response) => {
      const newNotification = {
        title: "Tin nhắn mới",
        body: response.message,
      };

      // Cập nhật mảng thông báo sử dụng setNotifications
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    });

    return () => {
      // Hủy đăng ký lắng nghe khi component bị unmount
      socket.off("newMessage");
    };
  }, []);

  const handleSendMessage = async (text) => {
    await instance.post("chats/add-message", {
      ChatId: chatId,
      UserId: userLocal.UserId,
      Content: text,
    });
    setText("");
    getMessageByChatId();
    inputRef.current.focus();

    // Gửi một tin nhắn khi thành phần được tạo
    socket.emit("chat-message", { message: text });
  };

  return (
    <>
      <div className="flex flex-col w-80 border">
        <div className="flex items-center justify-center flex-col h-20  gap-4 border-b p-3">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="relative"
            placeholder="Tìm kiếm theo tên"
            style={{
              width: 240,
            }}
          />
          {search !== "" && (
            <>
              <ul className="absolute max-h-[500px] overflow-auto bg-white w-[265px] top-14 z-10 h-full">
                {users.length > 0 ? (
                  <>
                    {users.map((user) => (
                      <li className="flex items-center justify-between gap-3 px-3 py-2 hover:bg-[#E9F2FD] cursor-pointer">
                        <div className="flex items-center gap-2">
                          <img
                            className="h-12 w-12 rounded-full"
                            src="https://img4.thuthuatphanmem.vn/uploads/2020/08/02/hinh-anh-dai-dien-facebook-den-ngau_013712452.jpg"
                            alt="Ảnh đại diện"
                          />
                          {user.UserName}
                        </div>
                        <div>
                          <UserAddOutlined
                            onClick={() => handleAddFriend(user.UserId)}
                            className="hover:bg-green-200 p-2 rounded-full"
                            title="Kết bạn"
                          />
                        </div>
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    <li className="flex h-24 border items-center justify-center px-3 py-2  cursor-not-allowed">
                      Không tìm thấy kết quả
                    </li>
                  </>
                )}
              </ul>
            </>
          )}
        </div>
        <div>
          <ul className="flex flex-col max-h-screen overflow-auto">
            {rooms.map((room, index) => (
              <li
                onClick={() => getChatId(room.ChatId, room.ChatName)}
                key={index}
                className="flex items-center cursor-pointer px-6 py-3 gap-4 hover:bg-[#f9fafb]"
              >
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="font-semibold">{room.ChatName}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col w-full overflow-y-auto">
        <div className="h-20  flex items-center justify-between px-4 py-2 border-b w-full">
          <div className="flex items-center gap-4">
            <img
              className="h-14 w-14 rounded-full"
              src="https://img4.thuthuatphanmem.vn/uploads/2020/08/02/hinh-anh-dai-dien-facebook-den-ngau_013712452.jpg"
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-semibold">{nameChat}</span>
              <p>Hoạt động 6 phút trước</p>
            </div>
          </div>
          <div>
            <BellOutlined
              onClick={() => setShowDialog(!showDialog)}
              className="text-3xl absolute right-6 top-4 cursor-pointer hover:bg-[#E9F2FD] p-2 rounded-full"
            />
            <span className="bg-red-500 px-2 rounded-xl text-sm right-5 top-5 text-white z-10 absolute">
              {notifications?.length}
            </span>
            {showDialog && (
              <ul className="bg-white absolute right-8 top-14 border rounded pt-2 w-[480px] max-h-[400px] overflow-y-auto">
                <div className="sticky top-0 bg-white z-20 font-semibold px-5 text-xl mb-2">
                  Tất cả thông báo
                </div>
                {notifications.length > 0 ? (
                  <>
                    {notifications?.map((noti) => (
                      <li className="py-2 px-2 cursor-pointer hover:bg-[#E9F2FD]">
                        <div className="flex gap-3">
                          <img
                            className="h-14 rounded-full"
                            src="https://tse4.mm.bing.net/th?id=OIP.0i9PRZGvJbv7kG7XoQUAWQHaHa&pid=Api&P=0&h=180"
                            alt=""
                          />
                          <div className="flex flex-col justify-center">
                            <div>{noti.title}</div>
                            <div className="text-sm">{noti.body}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    <li className="py-2 px-2 cursor-not-allowed">
                      <div className="flex gap-3 justify-center">
                        <h2>Không có thông báo mới</h2>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
        <div
          className="bg-slate-200 w-full h-auto flex-1 p-5 overflow-auto"
          style={{ maxHeight: "calc(100vh - 160px)" }}
        >
          {message?.map((mes) => (
            <>
              {mes.UserId === userLocal.UserId ? (
                <>
                  <div className="flex justify-end mb-2">
                    <div className="bg-white w-auto min-w-[200px] max-w-[30%] p-2 text-black rounded-md flex flex-col">
                      <span className="pb-2">{mes.Content}</span>
                      <span className="text-sm">
                        {moment(mes.Timestamp).format("h:mm A")}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-start mb-2">
                    <div className="bg-white w-auto min-w-[200px] max-w-[30%] p-2 text-black rounded-md flex flex-col">
                      <span className="pb-2">{mes.Content}</span>
                      <span className="text-sm">
                        {moment(mes.Timestamp).format("h:mm A")}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </>
          ))}
        </div>
        <div className="w-full px-3 bottom-0 py-3 bg-white">
          <div className="flex justify-between gap-4 items-center">
            <input type="file" hidden id="file" />
            <label htmlFor="file">
              <FileImageOutlined className="text-2xl cursor-pointer text-gray-600" />
            </label>
            <InputEmoji
              ref={inputRef}
              className="w-full"
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleSendMessage}
              placeholder="Nhập nội dung tin nhắn"
            />
            {text ? (
              <SendOutlined
                className="cursor-pointer text-blue-600"
                onClick={handleSendMessage}
              />
            ) : (
              <SendOutlined className="cursor-not-allowed text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
