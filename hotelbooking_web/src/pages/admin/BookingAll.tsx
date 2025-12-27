import { Col, Divider, Progress, Row, Space, Table, Tag, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  baseUrl,
  formatCurrency,
  formatDateHour,
} from "../../constants/constants";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function BookingAll() {
  const [dataBookingall, setDataBookingall] = useState<any[]>([]); // dữ liệu booking all

  const getAPIBookingAll = async () => {
    try {
      const res = await axios.get(`${baseUrl}admin/booking-all`);
      setDataBookingall(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAPIBookingAll();
  }, []);

  //Doanh thu booking
  const dataDoanhthu = [
    { month: "Tháng 1", bookings: 120 },
    { month: "Tháng 2", bookings: 150 },
    { month: "Tháng 3", bookings: 180 },
    { month: "Tháng 4", bookings: 170 },
    { month: "Tháng 5", bookings: 200 },
    { month: "Tháng 6", bookings: 250 },
    { month: "Tháng 7", bookings: 300 },
    { month: "Tháng 8", bookings: 270 },
    { month: "Tháng 9", bookings: 220 },
    { month: "Tháng 10", bookings: 190 },
    { month: "Tháng 11", bookings: 160 },
    { month: "Tháng 12", bookings: 140 },
  ];
  // Mock data based on the table
  // const data = [
  //     { key: '1', name: 'Trà sữa kem cheese', quantity: 2, price: 92000, discount: 0, revenue: 92000 },
  //     { key: '2', name: 'Trà ô long kem cheese', quantity: 2, price: 84000, discount: 0, revenue: 84000 },
  //     { key: '3', name: 'Trà sữa bạc hà', quantity: 2, price: 76000, discount: 0, revenue: 76000 },
  //     { key: '4', name: 'Trà sữa trà xanh', quantity: 2, price: 76000, discount: 0, revenue: 76000 },
  //     { key: '5', name: 'Sữa tươi trân châu đường đen', quantity: 1, price: 44000, discount: 0, revenue: 44000 },
  // ];
  const Column = [
    {
      title: "Mã booking",
      dataIndex: "id",
      render: (text: any) => <span>{`B00${text}`}</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (text: any) => <span>{`${text}`}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (text: any) => (
        <span>
          {`${formatCurrency(text).split("₫")[0]}`}
          <span style={{ fontSize: 13.5 }}>VND</span>
        </span>
      ),
    },
    {
      title: "Ngày nhận",
      dataIndex: "checkin_date",
      render: (text: any) => (
        <span>{`${formatDateHour(text).split(" ")[0]}`}</span>
      ),
    },
    {
      title: "Ngày trả",
      dataIndex: "checkout_date",
      render: (text: any) => (
        <span>{`${formatDateHour(text).split(" ")[0]}`}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        { text: "Đã hủy", value: "CANCELLED" },
        { text: "Đang xử lý", value: "PENDING" },
        { text: "Đã xác nhận", value: "CONFIRMED" },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (text: any) => {
        let color = "";
        switch (text) {
          case "CANCELLED":
            color = "#FF0000";
            text = "Đã hủy";
            break;
          case "PENDING":
            color = "#FFD700";
            text = "Đang xử lý";
            break;
          case "CONFIRMED":
            color = "#008000";
            text = "Đã xác nhận";
            break;
          default:
            color = "#000000";
            text = "Đang xử lý";
        }
        return (
          <Tag style={{ fontSize: 13.5, backgroundColor: color }} color="white">
            {text}
          </Tag>
        );
      },
    },
  ];
  return (
    <div style={{ padding: 20 }}>
      <h1>Tất cả lịch đặt phòng</h1>
      <Divider />
      <Row style={{ display: "flex" }}>
        <Col
          span={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Space
            direction="vertical"
            size={"large"}
            style={{ textAlign: "center" }}
          >
            <span style={{ fontWeight: 500, fontSize: 20 }}>
              Tổng doanh thu
            </span>
            <h1 style={{ fontWeight: 500, fontSize: 40 }}>1.250.000</h1>
            <span style={{ fontWeight: 500, fontSize: 20 }}>
              Booking chi tiết
            </span>
          </Space>
        </Col>
        <Col span={12} style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <ResponsiveContainer width={"100%"} height={200}>
              <LineChart
                data={dataDoanhthu}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#1890ff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Col>
        <Col
          span={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Space direction="vertical" style={{ textAlign: "center" }}>
            <span style={{ fontWeight: 400, fontSize: 20 }}>Tỉ lệ hủy</span>
            <Progress size={160} strokeWidth={10} type="circle" percent={10} />
          </Space>
        </Col>
      </Row>

      <Divider style={{ margin: 20 }} />
      {dataBookingall && <Table columns={Column} dataSource={dataBookingall} />}
    </div>
  );
}

export default BookingAll;
