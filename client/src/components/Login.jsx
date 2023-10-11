import { Button, Input, Radio, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "./../api/config";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newUser = {
        ...user,
      };
      const response = await instance.post("auth/login", newUser, {
        withCredentials: true,
      });

      if (response?.data.status === 400) {
        notification.error({
          message: "Cảnh báo",
          description: response.data.message,
        });
      } else {
        notification.success({
          message: "Thành công",
          description: response.data.message,
        });
        localStorage.setItem("token", JSON.stringify(response?.data.data));
        navigate("/chat");
      }
    } catch (error) {
      if (error?.response?.data.status === 400) {
        notification.error({
          message: "Cảnh báo",
          description: error.response.data.message,
        });
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white h-[350px] p-7 rounded shadow-md w-96 border flex flex-col gap-3"
        >
          <h3 className="font-bold text-2xl text-center my-3">Đăng nhập</h3>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              onChange={handleChange}
              name="Email"
              className="mt-1"
              id="email"
              placeholder="Nhập địa chỉ email"
            />
          </div>
          <div>
            <label htmlFor="password">Mật khẩu</label>
            <Input
              onChange={handleChange}
              name="Password"
              className="mt-1"
              id="password"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div className="mt-2">
            <Button
              htmlType="submit"
              className="bg-blue-600 w-full"
              type="primary"
            >
              Đăng nhập
            </Button>
          </div>
          <p className="text-center ">
            Bạn đã có tài khoản?{" "}
            <Link className="text-blue-600  " to="/register">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
