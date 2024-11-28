import React from "react";
import { Button, Layout } from "antd";

const { Sider } = Layout;

const Main: React.FC = () => {
  function handleLogOut() {
    localStorage.removeItem("access_token");
    window.location.reload();
  }

  return (
    <Layout className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <Sider
        className="bg-white shadow-lg flex items-center justify-center rounded-lg"
        width={300}
      >
        <div className="p-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            Welcome to TexnoArk
          </h1>
          <Button
            type="primary"
            danger
            onClick={handleLogOut}
            className="w-full py-3 text-lg font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition-all duration-300"
          >
            Log out
          </Button>
        </div>
      </Sider>
    </Layout>
  );
};

export default Main;
