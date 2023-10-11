import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Input, Modal } from "antd";
import instance from "../api/config";

export default function List_Request() {
  const [friends, setFriends] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = useState();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const userLocal = JSON.parse(localStorage.getItem("token"));

  const loadData = async () => {
    const response = await instance.get(
      `users/list-request/${userLocal.UserId}`
    );
    setFriends(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleAddRoom = async () => {
    try {
      const response = await instance.post("chats", {
        ChatName: roomName,
        UserId: userLocal.UserId,
      });
      console.log(response);
      setIsModalOpen(false);
      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Modal tạo phòng */}

      <Modal
        title="Tạo phòng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Nhập tên phòng..."
        />
        <p className="mt-1 text-red-500">Tên phòng không được để trống</p>
        <div className="flex justify-end gap-3 mt-3 p-0">
          <Button onClick={handleCancel}>Hủy</Button>
          <Button
            onClick={handleAddRoom}
            className="bg-blue-600"
            type="primary"
          >
            Tạo
          </Button>
        </div>
      </Modal>

      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-80 border">
          <div className="p-2 flex justify-center">
            <Button onClick={showModal} className="bg-blue-600" type="primary">
              Tạo phòng
            </Button>
          </div>
          <hr />
          <NavLink className="py-3 px-2 hover:bg-[#E9F2FD]" to="/list-request">
            Danh sách yêu cầu
          </NavLink>
        </div>
        <div className="w-full h-screen bg-slate-200">
          <h3 className="px-10 py-3 bg-white">Lời mời kết bạn(3)</h3>
          <hr />
          <div className="flex flex-wrap gap-4 p-8 ">
            {friends.map((fr) => (
              <div className="bg-white rounded-md p-2 w-80">
                <div className="flex gap-2 items-center mb-3">
                  <img
                    className="h-14 w-14 rounded-full"
                    src="https://s75-ava-talk.zadn.vn/f/2/a/9/1/75/e6f993810f8dbba14a84b382dc473dbb.jpg"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">{}</span>
                    <span className="text-sm">Người mới quen</span>
                  </div>
                </div>
                <div className="border px-3 py-4 mb-3">
                  Xin chào bạn, mình là {fr.UserName}. Kết bạn nha
                </div>
                <div className="flex justify-center gap-3">
                  <Button>Từ chối</Button>
                  <Button className="bg-blue-600" type="primary">
                    Đồng ý
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
