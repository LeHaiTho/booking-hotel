import { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Button,
  Select,
  Space,
  Empty,
  Row,
  Col,
  List,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { selectHotelMn } from "../../../../../redux/selector";

const { Title, Text } = Typography;
const { Option } = Select;

const PromotionList: React.FC = () => {
  const hotel = useSelector(selectHotelMn);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPromotions = async () => {
    if (!hotel?.id || !token) {
      setPromotions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/promotion/hotel/${hotel.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const tableData = res.data.map((promo: any) => ({
        id: promo.name,
        name: promo.name,
        discount: promo.discount,
        bookingPeriod:
          promo.apply_period.includes("Invalid date") || !promo.apply_period
            ? "Không xác định"
            : promo.apply_period,
        stayPeriod:
          promo.apply_period.includes("Invalid date") || !promo.apply_period
            ? "Không xác định"
            : promo.apply_period,
        createdDate: dayjs().format("DD MMMM YYYY"), // Giả lập, cần API trả createdAt
        roomTypes: promo.details.map((d: any) => d.room_type),
        rateTypes: ["Standard"], // Giả lập, cần logic rateTypes
        total_rooms: promo.total_rooms,
        details: promo.details,
      }));
      setPromotions(tableData);
    } catch (error) {
      console.error(error);
      setPromotions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, [hotel?.id, token]);

  // Thêm hàm xử lý khi quay lại từ trang thêm khuyến mãi
  useEffect(() => {
    // Kiểm tra xem có query param 'refresh' không
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("refresh") === "true") {
      fetchPromotions();
      // Xóa query param sau khi đã tải lại
      navigate("/manage/promotion-list", { replace: true });
    }
  }, [navigate]);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Thời gian đặt",
      dataIndex: "bookingPeriod",
      key: "bookingPeriod",
    },
    {
      title: "Ngày lưu trú",
      dataIndex: "stayPeriod",
      key: "stayPeriod",
    },
    {
      title: "Tổng số phòng áp dụng",
      dataIndex: "total_rooms",
      key: "total_rooms",
      render: (total_rooms: number) => <Text>{total_rooms}</Text>,
    },
    {
      title: "Đêm phòng",
      render: () => "--",
    },
    {
      title: "Giá trung bình hàng ngày",
      render: () => "--",
    },
    {
      title: "Tổng doanh thu",
      render: () => "--",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={3}>Khuyến mãi</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => navigate(`/manage/system-promotion?token=${token}`)}
          >
            Chọn khuyến mãi mới
          </Button>
        </Col>
      </Row>

      {/* Bộ lọc */}
      <Row
        justify="space-between"
        style={{ marginBottom: 32 }}
        gutter={[16, 16]}
      >
        <Col>
          <Space>
            <Select defaultValue="active" style={{ width: 150 }}>
              <Option value="active">Đang hoạt động</Option>
              <Option value="ended">Đã kết thúc</Option>
              <Option value="other">Bộ lọc khác</Option>
            </Select>
          </Space>
        </Col>
        <Col>
          <Space>
            <Text>Hiển thị hiệu suất hoạt động:</Text>
            <Select defaultValue="from_past_to_now" style={{ width: 160 }}>
              <Option value="from_past_to_now">Từ trước đến nay</Option>
            </Select>
          </Space>
        </Col>
      </Row>

      {/* Danh sách */}
      {promotions.length === 0 ? (
        <Empty
          description={
            <>
              <Text strong>Không có khuyến mãi đang hoạt động</Text>
              <br />
              <Text type="secondary">
                Hãy tạo một khuyến mãi mới để bắt đầu.
              </Text>
            </>
          }
        />
      ) : (
        <Table
          dataSource={promotions}
          columns={columns}
          rowKey="id"
          loading={loading}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ padding: 12 }}>
                <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
                  <Col span={12}>
                    <Text>Phòng:</Text>
                    <List
                      dataSource={record.details}
                      renderItem={(item: any) => (
                        <List.Item>
                          <Text>
                            {item.room_type} (x{item.room_count}):{" "}
                            {item.original_price.toLocaleString("vi-VN")} VND →{" "}
                            {item.discounted_price.toLocaleString("vi-VN")} VND
                          </Text>
                        </List.Item>
                      )}
                      locale={{ emptyText: "Không có phòng áp dụng" }}
                    />
                  </Col>
                </Row>
                {/* <Space style={{ marginTop: 16 }}>
                  <Button danger onClick={() => alert("Ngừng")}>
                    Ngừng
                  </Button>
                  <Button onClick={() => alert("Chỉnh sửa")}>Chỉnh sửa</Button>
                  <Button
                    type="primary"
                    onClick={() => alert("Tạo chiến dịch")}
                  >
                    Tạo chiến dịch
                  </Button>
                </Space> */}
              </div>
            ),
            expandRowByClick: true,
          }}
        />
      )}
    </div>
  );
};

export default PromotionList;
