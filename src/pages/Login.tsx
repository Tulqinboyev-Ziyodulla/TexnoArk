import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import MaskedInput from "antd-mask-input";
import { useAxios } from "../hook/useAxios";
import { API_URL } from "../hook/useEnv";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  phone_number: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/auth/sign-in`,
        values
      );

      if (response?.data?.data?.tokens?.access_token) {
        localStorage.setItem(
          "access_token",
          response.data.data.tokens.access_token
        );
        console.log("Login successful!");
        navigate("/");
        window.location.reload();
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.error("User not found. Redirecting to sign-up.");
        alert("No account found. Please sign up first.");
        navigate("/sign-up");
      } else {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
      <Form
        name="basic"
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          name="phone_number"
          rules={[
            { required: true, message: "Please enter your phone number!" },
            {
              pattern: /^\+998 \d{2} \d{3} \d{2} \d{2}$/,
              message: "Please enter a valid phone number!",
            },
          ]}
        >
          <MaskedInput
            size="middle"
            mask="+998 00 000 00 00"
            placeholder="+998 xx xxx xx xx"
            className="border rounded-lg w-full p-2"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password
            className="border rounded-lg w-full p-2"
            placeholder="password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </Button>
        </Form.Item>

        <div className="text-center mt-4">
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Do not have an account?
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
