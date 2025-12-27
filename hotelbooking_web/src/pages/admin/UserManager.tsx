import {
  Button,
  Input,
  Space,
  Table,
  Tag,
  Modal,
  Tabs,
  Card,
  Statistic,
  Row,
  Col,
  Avatar,
  List,
  Typography,
  Spin,
  Empty,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  baseUrl,
  COLORS,
  formatDateHour,
  formatCurrency,
} from "../../constants/constants";
import {
  DeleteOutlined,
  FormOutlined,
  EyeOutlined,
  UserOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "./index.css";

const { Search } = Input;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

function UserManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  console.log(userDetails);

  // Mảng ảnh mẫu để hiển thị khi không có ảnh thật
  const sampleHotelImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  ];

  // Hàm lấy ảnh khách sạn, nếu không có sẽ trả về ảnh mẫu
  const getHotelImage = (hotel: any, index: number) => {
    // Nếu có ảnh và có thể parse được JSON
    if (hotel.images) {
      try {
        const images = JSON.parse(hotel.images);
        if (Array.isArray(images) && images.length > 0 && images[0]) {
          return images[0];
        }
      } catch (e) {
        console.log("Error parsing hotel images:", e);
      }
    }

    // Nếu không có ảnh hoặc không parse được, dùng ảnh mẫu
    return sampleHotelImages[index % sampleHotelImages.length];
  };

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}auth/users/all`);
      setUsers(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Lấy chi tiết người dùng
  const fetchUserDetails = async (userId: number, isManager: boolean) => {
    setDetailsLoading(true);
    try {
      const endpoint = isManager
        ? `${baseUrl}auth/users/hotel-manager/${userId}`
        : `${baseUrl}auth/users/details/${userId}`;

      const res = await axios.get(endpoint);
      setUserDetails(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setDetailsLoading(false);
    }
  };

  // Xem chi tiết người dùng
  const showUserDetails = (user: any) => {
    setSelectedUser(user);
    const isManager = user.roles?.includes("quanly");
    fetchUserDetails(user.id, isManager);
    setDetailsVisible(true);
  };

  // Tìm kiếm người dùng
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // Lọc danh sách người dùng theo từ khóa tìm kiếm
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.lastname} ${user.firstname}`.toLowerCase();
    const email = user.email?.toLowerCase() || "";
    const keyword = searchText.toLowerCase();

    return fullName.includes(keyword) || email.includes(keyword);
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Cột dữ liệu cho bảng
  const columns = [
    {
      title: <span style={{ color: "#3A76D2" }}>ID</span>,
      key: "id",
      dataIndex: "id",
      render: (text: any) => (
        <span style={{ fontWeight: 500, color: COLORS.GRAYCOLOR }}>{text}</span>
      ),
    },
    {
      title: <span style={{ color: "#3A76D2" }}>Họ và Tên</span>,
      key: "name",
      render: (_: any, record: any) => (
        <span style={{ fontWeight: 500, color: COLORS.GRAYCOLOR }}>
          {`${record?.lastname || ""} ${record?.firstname || ""}`}
        </span>
      ),
    },
    {
      title: <span style={{ color: "#3A76D2" }}>Email</span>,
      key: "email",
      dataIndex: "email",
      render: (text: any) => (
        <span style={{ fontWeight: 500, color: COLORS.GRAYCOLOR }}>{text}</span>
      ),
    },
    {
      title: <span style={{ color: "#3A76D2" }}>Vai trò</span>,
      key: "role",
      dataIndex: "role",
      render: (text: string, record: any) => {
        if (record.roles?.includes("quanly")) {
          return <Tag color="blue">Quản lý khách sạn</Tag>;
        } else if (record.roles?.includes("admin")) {
          return <Tag color="red">Admin</Tag>;
        } else {
          return <Tag color="green">Khách hàng</Tag>;
        }
      },
      filters: [
        { text: "Quản lý khách sạn", value: "quanly" },
        { text: "Admin", value: "admin" },
        { text: "Khách hàng", value: "khachhang" },
      ],
      onFilter: (value: any, record: any) => {
        if (value === "khachhang") {
          return record.roles?.length === 0 || !record.roles;
        }
        return record.roles?.includes(value);
      },
    },
    {
      title: <span style={{ color: "#3A76D2" }}>Ngày đăng ký</span>,
      key: "createdAt",
      dataIndex: "createdAt",
      sorter: (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      showSorterTooltip: false,
      render: (text: any) => (
        <span style={{ fontWeight: 500, color: COLORS.GRAYCOLOR }}>
          {formatDateHour(text)}
        </span>
      ),
    },
    {
      title: <span style={{ color: "#3A76D2" }}>Chức năng</span>,
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => showUserDetails(record)}
          >
            Chi tiết
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "orange" }}
            icon={<FormOutlined />}
          >
            Sửa
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Hiển thị chi tiết người dùng
  const renderUserDetails = () => {
    if (!selectedUser || !userDetails) return null;

    const isManager = selectedUser.roles?.includes("quanly");

    if (isManager) {
      // Hiển thị chi tiết quản lý khách sạn
      return (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col span={24}>
              <Card>
                <Row gutter={16} align="middle">
                  <Col>
                    <Avatar
                      size={64}
                      src={
                        userDetails.user?.image_url ||
                        "https://images.icon-icons.com/2483/PNG/512/user_icon_149851.png"
                      }
                      icon={<UserOutlined />}
                    />
                  </Col>
                  <Col>
                    <Title level={4}>{`${userDetails.user?.lastname || ""} ${
                      userDetails.user?.firstname || ""
                    }`}</Title>
                    <Text type="secondary">{userDetails.user?.email}</Text>
                    <div>
                      <Tag color="blue">Quản lý khách sạn</Tag>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Title level={4}>Khách sạn quản lý</Title>
          <Row gutter={[16, 16]}>
            {userDetails.hotels?.map((hotel: any, index: number) => (
              <Col span={24} key={hotel.id || index}>
                <Card>
                  <Row gutter={16}>
                    <Col span={6}>
                      <img
                        src={getHotelImage(hotel, index)}
                        alt={hotel.name || "Khách sạn"}
                        style={{
                          width: "100%",
                          height: 120,
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                        onError={(e: any) => {
                          e.target.src =
                            sampleHotelImages[index % sampleHotelImages.length];
                        }}
                      />
                    </Col>
                    <Col span={18}>
                      <Title level={5}>
                        {hotel.name || "Khách sạn không tên"}
                      </Title>
                      <Text>{hotel.address || "Chưa cập nhật địa chỉ"}</Text>
                      <Row gutter={16} style={{ marginTop: 16 }}>
                        <Col span={6}>
                          <Statistic
                            title="Tổng đặt phòng"
                            value={hotel.statistics?.totalBookings || 0}
                            prefix={<ShoppingCartOutlined />}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Hoàn thành"
                            value={hotel.statistics?.completedBookings || 0}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: "#3f8600" }}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Đã hủy"
                            value={hotel.statistics?.cancelledBookings || 0}
                            prefix={<CloseCircleOutlined />}
                            valueStyle={{ color: "#cf1322" }}
                          />
                        </Col>
                        <Col span={6}>
                          <Statistic
                            title="Doanh thu"
                            value={formatCurrency(
                              hotel.statistics?.totalRevenue || 0
                            )}
                            prefix="₫"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
            {(!userDetails.hotels || userDetails.hotels.length === 0) && (
              <Col span={24}>
                <Empty description="Không có khách sạn nào được quản lý" />
              </Col>
            )}
          </Row>
        </div>
      );
    } else {
      // Hiển thị chi tiết khách hàng
      return (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col span={24}>
              <Card>
                <Row gutter={16} align="middle">
                  <Col>
                    <Avatar
                      size={64}
                      src={userDetails.user?.image_url}
                      icon={<UserOutlined />}
                    />
                  </Col>
                  <Col>
                    <Title level={4}>{`${userDetails.user?.lastname || ""} ${
                      userDetails.user?.firstname || ""
                    }`}</Title>
                    <Text type="secondary">{userDetails.user?.email}</Text>
                    <div>
                      <Tag color="green">Khách hàng</Tag>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Tổng đặt phòng"
                  value={userDetails.statistics?.totalBookings || 0}
                  prefix={<ShoppingCartOutlined />}
                />
              </Card>
            </Col>
            {/* <Col span={6}>
              <Card>
                <Statistic
                  title="Hoàn thành"
                  value={userDetails.statistics?.completedBookings || 0}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Đã hủy"
                  value={userDetails.statistics?.cancelledBookings || 0}
                  prefix={<CloseCircleOutlined />}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card>
            </Col> */}
            {/* <Col span={6}>
              <Card>
                <Statistic
                  title="Chi tiêu"
                  value={formatCurrency(
                    userDetails.statistics?.totalSpent || 0
                  )}
                  prefix="₫"
                />
              </Card>
            </Col> */}
          </Row>

          <Title level={4}>Lịch sử đặt phòng</Title>
          {userDetails.bookings && userDetails.bookings.length > 0 ? (
            <List
              itemLayout="vertical"
              dataSource={userDetails.bookings}
              pagination={{ pageSize: 5 }}
              renderItem={(booking: any) => (
                <List.Item
                  key={booking.id}
                  actions={[
                    <Space key="date">
                      <CalendarOutlined />
                      {`${formatDateHour(
                        booking.checkin_date
                      )} - ${formatDateHour(booking.checkout_date)}`}
                    </Space>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <a href={`/hotel/${booking.id_hotel}`}>
                        {booking.Hotel?.name}
                      </a>
                    }
                    description={`Đặt ngày: ${formatDateHour(
                      booking.createdAt
                    )}`}
                  />
                  <Row gutter={16}>
                    <Col span={8}>
                      <Text strong>Trạng thái: </Text>
                      {booking.status === "completed" ? (
                        <Tag color="success">Hoàn thành</Tag>
                      ) : booking.status === "cancelled" ? (
                        <Tag color="error">Đã hủy</Tag>
                      ) : (
                        <Tag color="processing">Đã xác nhận</Tag>
                      )}
                    </Col>
                    {/* <Col span={8}>
                      <Text strong>Số phòng: </Text>
                      {booking.room_count}
                    </Col> */}
                    <Col span={8}>
                      <Text strong>Tổng tiền: </Text>
                      {formatCurrency(booking.total_price)}
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          ) : (
            <Empty description="Không có lịch sử đặt phòng" />
          )}
        </div>
      );
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
        <Title level={2}>Quản lý người dùng</Title>

        <Space direction="vertical" style={{ marginBottom: 20, width: "100%" }}>
          <Space>
            <Search
              placeholder="Tìm kiếm theo Email hoặc Họ và Tên..."
              style={{ width: 500 }}
              enterButton
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={handleSearch}
            />
          </Space>
          <span style={{ fontStyle: "italic" }}>
            Từ khóa tìm kiếm không lớn hơn 64 ký tự
          </span>
        </Space>

        <Table
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
        />
      </Space>

      <Modal
        title="Chi tiết người dùng"
        open={detailsVisible}
        onCancel={() => setDetailsVisible(false)}
        footer={[
          <Button key="back" onClick={() => setDetailsVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={800}
      >
        {detailsLoading ? (
          <div style={{ textAlign: "center", padding: "30px" }}>
            <Spin size="large" />
          </div>
        ) : (
          renderUserDetails()
        )}
      </Modal>
    </div>
  );
}

export default UserManager;
