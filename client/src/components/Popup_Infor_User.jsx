import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Popup_Update_User from "./Popup_Update_User";

export default function Popup_Infor_User({ close }) {
  const [showPopup, setShowPopup] = useState(false);

  // Mở popup cập nhật thông tin user
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  // Đóng popup cập nhật thông tin user
  const handleClosePopup = () => {
    setShowPopup(false);
    close();
  };

  return (
    <>
      {/* Popup cập nhật thông tin user  */}
      {showPopup && <Popup_Update_User close={handleClosePopup} />}

      <div className="z-40 fixed top-0 bottom-0 right-0 left-0 bg-bgc-0.5 flex justify-center items-center">
        <div className="bg-white p-6 rounded w-[450px]">
          <div className="flex justify-between items-center ">
            <h3 className="font-semibold text-xl">Thông tin tài khoản</h3>
            <CloseOutlined onClick={close} className="cursor-pointer" />
          </div>
          <div className="relative py-4 flex-col flex items-center gap-8 mb-14">
            <img
              className="h-[200px] w-full object-cover relative"
              src="https://s1.img.yan.vn/YanNews/2167221/201405/20140525-1027-55028_951226_697658.jpg"
              alt=""
            />
            <div className="absolute bottom-[-37px]">
              <label htmlFor="avatar">
                <img
                  className="h-28 w-28 rounded-full cursor-pointer"
                  src="https://s1.img.yan.vn/YanNews/2167221/201405/20140525-1027-55028_951226_697658.jpg"
                  alt=""
                />
              </label>
              <input id="avatar" type="file" hidden />
            </div>
          </div>
          <h3 className="text-center font-semibold text-lg">Ngọ Văn Quý</h3>
          {/* Infor start */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg">Thông tin cá nhân</h3>
            <div className="w-2/3 flex gap-12">
              <span className="min-w-[150px]">Số điện thoại</span>
              <div className="text-start">849823483</div>
            </div>
            <div className="w-2/3 flex gap-12">
              <span className="min-w-[150px]">Giới tính</span>
              <div className="text-start">Nam</div>
            </div>
            <div className="w-2/3 flex gap-12">
              <span className="min-w-[150px]">Ngày sinh</span>
              <div className="text-start">28/06/2001</div>
            </div>
          </div>
          {/* Infor end */}
          <div className="border my-4"></div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleShowPopup}
              className="font-semibold flex justify-center items-center gap-2 border h-9 px-4 rounded hover:bg-slate-200"
            >
              <EditOutlined />
              Cập nhật thông tin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
