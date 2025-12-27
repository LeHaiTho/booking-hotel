import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Select,
  DatePicker,
  Statistic,
  Divider,
  Empty,
} from "antd";
import { Bar, Pie, Line } from "react-chartjs-2";
import "../../dashboardManager.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectHotelMn } from "../../../../redux/selector";
import axios from "axios";

// Đăng ký các thành phần Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardManager: React.FC = () => {
  const hotel = useSelector(selectHotelMn);
  const [monthFilter, setMonthFilter] = useState<string>("2025-05");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Lấy dữ liệu thống kê
  useEffect(() => {
    const fetchStats = async () => {
      if (!hotel?.id) {
        setStats(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/stats/hotel/${hotel.id}`,
          {
            params: { month: monthFilter },
          }
        );
        setStats(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy thống kê:", error);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [hotel?.id, monthFilter]);

  console.log(stats);
  if (loading) return <div>Loading...</div>;
  if (!stats) return <Empty description="Không có dữ liệu thống kê" />;

  // Dữ liệu cho biểu đồ doanh thu theo tháng
  const revenueChartData = {
    labels: [
      "Th1",
      "Th2",
      "Th3",
      "Th4",
      "Th5",
      "Th6",
      "Th7",
      "Th8",
      "Th9",
      "Th10",
      "Th11",
      "Th12",
    ],
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: stats.revenueByMonth,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu cho biểu đồ tỷ lệ trạng thái đặt phòng
  const statusChartData = {
    labels: ["Đang xử lý", "Đã xác nhận", "Đã hủy"],
    datasets: [
      {
        label: "Tỷ lệ trạng thái",
        data: [
          stats.statusCounts.PENDING,
          stats.statusCounts.CONFIRMED,
          stats.statusCounts.CANCELLED,
        ],
        backgroundColor: [
          "#FFD700", // PENDING
          "#008000", // CONFIRMED
          "#FF0000", // CANCELLED
        ],
        borderColor: ["#FFD700", "#008000", "#FF0000"],
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu cho biểu đồ số lượng đặt phòng theo ngày
  const daysInMonth = moment(monthFilter, "YYYY-MM").daysInMonth();
  const bookingDayChartData = {
    labels: Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: "Số lượng đặt phòng",
        data: stats.bookingsByDay,
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Thống kê khách sạn</h1>

      {/* Bộ lọc */}
      {/* <div className="mb-4 flex gap-4">
        <Select
          value={monthFilter}
          style={{ width: 200 }}
          onChange={(value) => setMonthFilter(value)}
        >
          <Select.Option value="2025-05">Tháng 5/2025</Select.Option>
          <Select.Option value="2025-06">Tháng 6/2025</Select.Option>
          <Select.Option value="2025-07">Tháng 7/2025</Select.Option>
        </Select>
        <DatePicker.MonthPicker
          format="MM/YYYY"
          placeholder="Chọn tháng"
          onChange={(date) =>
            setMonthFilter(date ? date.format("YYYY-MM") : "2025-05")
          }
        />
      </div> */}

      {/* Số liệu nổi bật */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={stats.totalRevenue}
              formatter={(value) =>
                Number(value).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              }
            />
          </Card>
        </Col>
        {/* <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng đặt phòng"
              value={stats.totalBookings}
              formatter={(value) => Number(value).toLocaleString("vi-VN")}
            />
          </Card>
        </Col> */}
        {/* <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tỷ lệ hủy"
              value={stats.cancellationRate}
              suffix="%"
              precision={2}
            />
          </Card>
        </Col> */}
        {/* <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tỷ lệ lấp đầy"
              value={stats.occupancyRate}
              suffix="%"
              precision={2}
            />
          </Card>
        </Col> */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Đánh giá trung bình"
              value={stats.averageRating}
              suffix="/10"
            />
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Doanh thu theo tháng">
            <Bar
              height={300} // chiều cao tính bằng pixel
              data={revenueChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Doanh thu năm 2025" },
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Tỷ lệ trạng thái đặt phòng">
            <Pie
              height={300} // chiều cao tính bằng pixel
              data={statusChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false, // quan trọng để ChartJS không tự giữ tỉ lệ 1:1
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Trạng thái đặt phòng" },
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24}>
          <Card title={`Số lượng đặt phòng theo ngày (${monthFilter})`}>
            <Line
              height={300} // chiều cao tính bằng pixel
              data={bookingDayChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: `Đặt phòng trong tháng ${moment(monthFilter).format(
                      "MM/YYYY"
                    )}`,
                  },
                },
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardManager;
