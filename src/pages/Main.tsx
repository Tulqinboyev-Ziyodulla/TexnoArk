import React, { useState } from "react";
import {
  AppstoreOutlined,
  TagsOutlined,
  ShopOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";

const { Sider, Content } = Layout;

const Main: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("Dashboard"); 

  function handleLogOut() {
    localStorage.removeItem("access_token");
    window.location.reload();
  }

  const handleMenuClick = (e: any) => {
    setSelectedMenu(e.key);
  };

  return (
    <Layout className="w-full min-h-screen bg-gray-100">
      <Sider
        className="bg-[#001529] flex flex-col justify-between shadow-lg rounded-r-3xl"
        width={250} 
      >
        <div className="flex items-center justify-center py-8 text-white text-2xl font-bold">
          Texnoark
        </div>

        <Menu className="text-[18px]"
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={handleMenuClick}
          items={[
            {
              key: "Dashboard",
              icon: <BarChartOutlined />,
              label: "Dashboard",
            },
            {
              key: "Products",
              icon: <AppstoreOutlined />,
              label: "Products",
            },
            {
              key: "Categories",
              icon: <TagsOutlined />,
              label: "Categories",
            },
            {
              key: "Brands",
              icon: <ShopOutlined />,
              label: "Brands",
            },
          ]}
        />

        <div className="p-4">
          <Button
            type="primary"
            danger
            onClick={handleLogOut}
            className="w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
          >
            Log out
          </Button>
        </div>
      </Sider>

      <Layout>
        <Content className="p-6">
          <div className="bg-white p-6 h-[675px] rounded-lg shadow-md">
            <h1 className="text-xl font-bold">{selectedMenu}</h1>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
