import { Avatar, Layout, Menu, Space } from "antd";
import { APP1 } from "../../constants/constants";
interface Prop {
  children?: React.ReactNode; // Nội dung hiển thị trong layout
}
import {
  DownOutlined,
  HomeOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/selector";
import { useEffect } from "react";

function AdminLayout(prop: Prop) {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const { children } = prop;
  const handleClick = (e: any) => {
    if (e.key === "0_home") {
      navigate("/admin/home/trangchu-index");
    } else if (e.key === "6_0") {
      navigate("/admin/home/home-manager-user");
      // } else if (e.key === "1_1") {
      //   navigate("/admin/home/home-index");
    } else if (e.key === "1") {
      navigate("/admin/home/promotion");
    } else if (e.key === "2") {
      navigate("/admin/home/booking-all");
    } else if (e.key === "3") {
      navigate("/admin/home/thanh-toan-admin-nguoidung");
    } else if (e.key === "4") {
      navigate("/admin/home/thongke-khach-san");
    } else if (e.key === "5_0") {
      navigate("/admin/home/thongke-loai-khach-san");
    } else if (e.key === "6") {
      navigate("/admin/home/promotion");
    }
  };
  const itemMenu = [
    { key: "0_home", label: "Trang chủ", icon: <HomeOutlined /> },
    { key: "1", label: "Khuyến mãi" },
    {
      key: "6",
      label: "Tài khoản",
      icon: <UserOutlined />,
      children: [
        { key: "6_0", label: "Người dùng" },
        // { key: "6_1", label: "Quản lý" },
      ],
    },
    { key: "3", label: "Đối soát doanh thu" },
    { key: "2", label: "Lịch đặt phòng" },
    { key: "4", label: "Khách sạn" },
    {
      key: "5",
      label: "Danh mục",
      children: [{ key: "5_0", label: "Loại khách sạn" }],
    },
    // { key: "7", label: "Chanel Manager" },
    // { key: "8", label: "Báo cáo" },
    // { key: "9", label: "Kho hàng" },
    // // {key: '10', label: 'Quản lý quý'},
    // { key: "11", label: "MNQQ" },
  ];
  //   useEffect(() => {
  //     if (auth?.role_name !== "admin") {
  //       navigate("/error-page");
  //     }
  //   }, [auth]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider style={{ position: "fixed", left: 0, top: 0, bottom: 0 }}>
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "#fff" }}>{APP1.name}</h1>
        </div>
        <Menu
          theme="dark"
          onClick={handleClick}
          defaultSelectedKeys={["0_home"]}
          defaultOpenKeys={["1"]}
          items={itemMenu}
          mode="inline"
        >
          {/* Menu điều hướng */}
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header
          style={{
            marginLeft: 200,
            backgroundColor: "#fff",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{ fontWeight: 600, color: "gray" }}
            >{`${APP1.name} - Hệ thống quản trị khách sạn`}</span>
            <Space size={"large"}>
              <span style={{ fontWeight: 600, color: "gray" }}>
                <PhoneOutlined style={{ fontSize: 16, color: "#000" }} /> Hỗ trợ
                24/7: 012 34 56789
              </span>
              <span style={{ fontWeight: 600, color: "gray" }}>
                <QuestionCircleOutlined
                  style={{ fontSize: 16, color: "#000" }}
                />{" "}
                Trợ giúp
              </span>
              <Space style={{ fontWeight: 600, color: "gray" }}>
                <Avatar size={"small"} icon={<UserOutlined />} alt="hihi" />
                <span>Quản trị viên</span>
                <DownOutlined style={{ fontSize: 13 }} />
              </Space>
            </Space>
          </Space>
        </Layout.Header>
        <Layout.Content style={{ marginLeft: 200, marginTop: 64 }}>
          {children}
        </Layout.Content>
        <Layout.Footer></Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
