import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import {
  BellOutlined,
  FileImageOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Chat() {
  const [text, setText] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSendMessage = (text) => {
    setText("");
    console.log("message", text);
  };
  return (
    <>
      <div className="flex flex-col w-full overflow-y-auto">
        <div className="h-20  flex items-center justify-between px-4 py-2 border-b w-full">
          <div className="flex items-center gap-4">
            <img
              className="h-14 w-14 rounded-full"
              src="https://img4.thuthuatphanmem.vn/uploads/2020/08/02/hinh-anh-dai-dien-facebook-den-ngau_013712452.jpg"
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-semibold">{user?.UserName}</span>
              <p>Hoạt động 6 phút trước</p>
            </div>
          </div>
          <div>
            <BellOutlined
              onClick={() => setShowDialog(!showDialog)}
              className="text-3xl absolute right-6 top-4 cursor-pointer hover:bg-[#E9F2FD] p-2 rounded-full"
            />
            <span className="bg-red-500 px-2 rounded-xl text-sm right-5 top-5 text-white z-10 absolute">
              2
            </span>
            {showDialog && (
              <ul className="bg-white absolute right-8 top-14 border rounded pt-2 w-[480px]">
                <div className="font-semibold px-5 text-xl mb-2">
                  Tất cả thông báo
                </div>
                <li className="py-2 px-2 cursor-pointer hover:bg-[#E9F2FD]">
                  <div className="flex gap-3">
                    <img
                      className="h-14 rounded-full"
                      src="https://tse4.mm.bing.net/th?id=OIP.0i9PRZGvJbv7kG7XoQUAWQHaHa&pid=Api&P=0&h=180"
                      alt=""
                    />
                    <div className="flex flex-col justify-center">
                      <div>Bạn có một tin nhắn đến từ Nguyễn Văn A</div>
                      <div className="text-sm">3 giờ trước</div>
                    </div>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div
          className="bg-slate-200 w-full h-auto flex-1 p-5 overflow-auto"
          style={{ maxHeight: "calc(100vh - 160px)" }}
        >
          <div className="flex justify-start">
            <div className="bg-white w-auto min-w-[200px] max-w-[30%] p-2 text-black rounded-md flex flex-col">
              <span>Xin chào bạn nha</span>
              <span>5 phút trước</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-white w-auto min-w-[200px] max-w-[30%] p-2 text-black rounded-md flex flex-col">
              <span>Xin chào bạn nha</span>
              <span>5 phút trước</span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white w-auto min-w-[200px] max-w-[30%] p-2 text-black rounded-md flex flex-col">
              <span>Xin chào bạn nha</span>
              <span>5 phút trước</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-white w-auto min-w-[200px] max-w-[30%] p-2 text-black rounded-md flex flex-col">
              <span>Xin chào bạn nha</span>
              <span>5 phút trước</span>
            </div>
          </div>
        </div>
        <div className="w-full px-3 bottom-0 py-3 bg-white">
          <div className="flex justify-between gap-4 items-center">
            <input type="file" hidden id="file" />
            <label htmlFor="file">
              <FileImageOutlined className="text-2xl cursor-pointer text-gray-600" />
            </label>
            <InputEmoji
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
