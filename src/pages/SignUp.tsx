import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import MaskedInput from "antd-mask-input";
import { useAxios } from "../hook/useAxios";
import { API_URL } from "../hook/useEnv";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/auth/admin/sign-up`,
        values
      );
      console.log(response);
      alert("Sign-up successful!");
      navigate("/");
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("Failed to sign-up. Please try again.");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.error("Form submission failed:", errorInfo);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-10 bg-gray-100">
      <h2 className="py-5 text-2xl font-bold text-gray-800">Sign-up</h2>
      <Form
        name="signup"
        className="w-[90%] max-w-[600px] bg-white p-8 rounded-lg shadow-md"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          name="first_name"
          rules={[{ required: true, message: "Please enter your first name!" }]}
        >
          <Input
            placeholder="Firstname"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="last_name"
          rules={[{ required: true, message: "Please enter your last name!" }]}
        >
          <Input
            placeholder="Lastname"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
          />
        </Form.Item>

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
            placeholder="+998 "
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
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

        <div className="text-center">
          <Link to="/" className="text-blue-600 hover:underline">
            Already have an account?
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
