import { useEffect, useState } from "react";
import { Row, Col, Space, Spin, Card } from "antd";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axios from "axios";
import { baseUrl, formatCurrency } from "../../constants/constants";
import { images } from "../../assets/images/index";

function IndexAdmin() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboardStats, setDashboardStats] = useState<any>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}admin/dashboard/stats`);
      setDashboardStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !dashboardStats) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  // Định nghĩa các thẻ thống kê
  const statCards = [
    {
      title: "Lịch đặt phòng",
      value: dashboardStats.totalBookings.toLocaleString(),
      icon: images.butviet,
      bgColor: "#e3f5fe",
    },
    {
      title: "Doanh thu",
      value: formatCurrency(dashboardStats.totalRevenue),
      icon: images.maytinh,
      bgColor: "#e6f2f2",
    },
    {
      title: "Tiền mặt",
      value: formatCurrency(dashboardStats.cashPayments),
      icon: images.tien_1,
      bgColor: "#f6eafe",
    },
    {
      title: "Thẻ tín dụng",
      value: formatCurrency(dashboardStats.cardPayments),
      icon: images.dongho,
      bgColor: "#fce9eb",
    },
    {
      title: "Chưa thanh toán",
      value: `${dashboardStats.unpaidPercentage}%`,
      icon: images.phantram,
      bgColor: "#fff2ec",
    },
    {
      title: "Phòng sử dụng",
      value: `${dashboardStats.roomsUsage.used}/${dashboardStats.roomsUsage.total}`,
      icon: images.giuong,
      bgColor: "#f8edf3",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      {/* Thống kê theo hàng ngang */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {statCards.map((card, index) => (
          <Col span={4} key={index}>
            <Card
              style={{ height: "100%" }}
              bodyStyle={{ padding: 12, height: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  style={{ backgroundColor: card.bgColor, marginBottom: 10 }}
                  src={card.icon}
                  width={60}
                  height={60}
                  alt={card.title}
                />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "gray" }}>
                    {card.title}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>
                    {card.value}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Biểu đồ */}
      <div
        style={{
          width: "100%",
          height: 400,
          backgroundColor: "#fff",
          padding: 20,
        }}
      >
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 20px 0px 20px",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h3 style={{ color: "#575bb2", margin: 0 }}>Doanh thu tháng này</h3>
          <p style={{ color: "gray", fontWeight: "bold", margin: 0 }}>
            Tổng doanh thu:{" "}
            <span style={{ color: "red" }}>
              {formatCurrency(dashboardStats.monthlyRevenue)}
            </span>
          </p>
        </Space>
        <ResponsiveContainer>
          <BarChart
            data={dashboardStats.dailyRevenue}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              label={{
                value: "Triệu đồng",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default IndexAdmin;
