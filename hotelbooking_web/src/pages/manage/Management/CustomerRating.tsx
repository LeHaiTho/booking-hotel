import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Space,
  Tag,
  Button,
  Tabs,
  Rate,
  Avatar,
  Typography,
  Collapse,
  Spin,
  Empty,
  message,
  Tooltip,
  Statistic,
  Row,
  Col,
  Divider,
  Popconfirm,
  Modal,
} from "antd";
import {
  UserOutlined,
  StarOutlined,
  CommentOutlined,
  CalendarOutlined,
  HomeOutlined,
  TeamOutlined,
  ShopOutlined,
  SmileOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  ExclamationCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { confirm } = Modal;

interface User {
  id: number;
  name: string;
  email: string;
  image: string;
}

interface Hotel {
  id: number;
  name: string;
  image: string;
  rate?: number;
}

interface Booking {
  id: number;
  checkin: string;
  checkout: string;
}

interface RatingDetails {
  overall: number;
  staff: number;
  facility: number;
  comfortable: number;
  clean: number;
  money: number;
  location: number;
  comment: string;
  date: string;
}

interface Rating {
  id: number;
  hotel: Hotel;
  user: User;
  booking: Booking;
  rating: RatingDetails;
}

interface HotelRatings {
  hotel: Hotel;
  ratings: Rating[];
  stats: {
    count: number;
    averageOverall: number;
    averageNormalized: number;
  };
}

interface RatingsResponse {
  hotels: HotelRatings[];
  totalRatings: number;
}

// Add a new interface for the delete/hide rating response
interface DeleteRatingResponse {
  success: boolean;
  message: string;
}

const CustomerRating: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [ratingsData, setRatingsData] = useState<RatingsResponse | null>(null);
  const [activeHotelId, setActiveHotelId] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Bạn cần đăng nhập để xem đánh giá");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/ratings/hotel-owner`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRatingsData(response.data);
      // Set the first hotel as active if there are hotels
      if (response.data.hotels && response.data.hotels.length > 0) {
        setActiveHotelId(response.data.hotels[0].hotel.id);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
      message.error("Không thể tải dữ liệu đánh giá");
    } finally {
      setLoading(false);
    }
  };

  const normalizeRating = (rating: number, maxValue: number = 4): number => {
    // Convert from 1-maxValue scale to 1-10 scale
    return ((rating - 1) / (maxValue - 1)) * 9 + 1;
  };

  const renderRatingScore = (score: number, maxValue: number = 10) => {
    // If it's already on a 10-point scale (overall rating)
    if (maxValue === 10) {
      return (
        <Space>
          <Rate disabled allowHalf value={score / 2} />
          {/* <span>{score.toFixed(1)}/10</span> */}
        </Space>
      );
    }

    // For ratings on a 1-4 scale, normalize to 10-point scale for display
    const normalizedScore = normalizeRating(score, maxValue);

    return (
      <Space>
        <Rate disabled allowHalf value={normalizedScore / 2} />
        {/* <span>({normalizedScore.toFixed(1)}/10)</span> */}
      </Space>
    );
  };

  const getRatingColor = (score: number) => {
    if (score >= 9) return "green";
    if (score >= 7) return "lime";
    if (score >= 5) return "orange";
    return "red";
  };

  // Add new function to handle hiding a rating
  const handleHideRating = async (ratingId: number) => {
    try {
      setActionLoading((prev) => ({ ...prev, [ratingId]: true }));

      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Bạn cần đăng nhập để thực hiện thao tác này");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/ratings/${ratingId}/hide`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        message.success("Đã ẩn đánh giá thành công");
        // Refresh ratings data
        fetchRatings();
      } else {
        message.error(response.data.message || "Không thể ẩn đánh giá");
      }
    } catch (error) {
      console.error("Error hiding rating:", error);
      message.error("Đã xảy ra lỗi khi ẩn đánh giá");
    } finally {
      setActionLoading((prev) => ({ ...prev, [ratingId]: false }));
    }
  };

  // Add new function to handle deleting a rating
  const handleDeleteRating = async (ratingId: number) => {
    try {
      setActionLoading((prev) => ({ ...prev, [ratingId]: true }));

      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Bạn cần đăng nhập để thực hiện thao tác này");
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/ratings/${ratingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        message.success("Đã xóa đánh giá thành công");
        // Refresh ratings data
        fetchRatings();
      } else {
        message.error(response.data.message || "Không thể xóa đánh giá");
      }
    } catch (error) {
      console.error("Error deleting rating:", error);
      message.error("Đã xảy ra lỗi khi xóa đánh giá");
    } finally {
      setActionLoading((prev) => ({ ...prev, [ratingId]: false }));
    }
  };

  // Add function to show confirmation dialog
  const showDeleteConfirm = (ratingId: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa đánh giá này?",
      icon: <ExclamationCircleOutlined />,
      content: "Đánh giá sẽ bị xóa vĩnh viễn và không thể khôi phục.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        handleDeleteRating(ratingId);
      },
    });
  };

  const showHideConfirm = (ratingId: number) => {
    confirm({
      title: "Bạn có chắc chắn muốn ẩn đánh giá này?",
      icon: <ExclamationCircleOutlined />,
      content:
        "Đánh giá sẽ không hiển thị cho khách hàng nhưng vẫn lưu trong hệ thống.",
      okText: "Ẩn",
      okType: "primary",
      cancelText: "Hủy",
      onOk() {
        handleHideRating(ratingId);
      },
    });
  };

  const renderHotelTabs = () => {
    if (
      !ratingsData ||
      !ratingsData.hotels ||
      ratingsData.hotels.length === 0
    ) {
      return <Empty description="Không có khách sạn nào" />;
    }

    return (
      <Tabs
        type="card"
        activeKey={activeHotelId?.toString()}
        onChange={(key) => setActiveHotelId(parseInt(key))}
      >
        {ratingsData.hotels.map((hotelData) => (
          <TabPane
            tab={
              <span>
                <HomeOutlined /> {hotelData.hotel.name}
                <Tag
                  color={getRatingColor(hotelData.stats.averageOverall)}
                  style={{ marginLeft: 8 }}
                >
                  {hotelData.stats.averageOverall.toFixed(1)}
                </Tag>
                <Tag color="blue">{hotelData.stats.count} đánh giá</Tag>
              </span>
            }
            key={hotelData.hotel.id.toString()}
          >
            {renderHotelRatings(hotelData)}
          </TabPane>
        ))}
      </Tabs>
    );
  };

  const renderHotelRatings = (hotelData: HotelRatings) => {
    if (hotelData.ratings.length === 0) {
      return <Empty description="Chưa có đánh giá nào cho khách sạn này" />;
    }

    return (
      <>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số đánh giá"
                value={hotelData.stats.count}
                prefix={<CommentOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Điểm trung bình"
                value={hotelData.stats.averageOverall}
                precision={1}
                valueStyle={{
                  color: getRatingColor(hotelData.stats.averageOverall),
                }}
                prefix={<StarOutlined />}
                suffix="/10"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Điểm chuẩn hóa"
                value={hotelData.stats.averageNormalized}
                precision={1}
                valueStyle={{
                  color: getRatingColor(hotelData.stats.averageNormalized),
                }}
                prefix={<StarOutlined />}
                suffix="/10"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  size={64}
                  src={hotelData.hotel.image}
                  icon={<HomeOutlined />}
                  style={{ marginRight: 16 }}
                />
                <div>
                  <Title level={5}>{hotelData.hotel.name}</Title>
                  <Rate disabled defaultValue={hotelData.hotel.rate || 0} />
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Collapse accordion>
          {hotelData.ratings.map((rating) => (
            <Panel
              key={rating.id.toString()}
              header={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={rating.user.image}
                      icon={<UserOutlined />}
                      style={{ marginRight: 12 }}
                    />
                    <span>{rating.user.name || rating.user.email}</span>
                  </div>
                  <Space>
                    <Tag color={getRatingColor(rating.rating.overall)}>
                      {rating.rating.overall}/10
                    </Tag>
                    <Text type="secondary">{rating.rating.date}</Text>
                  </Space>
                </div>
              }
              extra={
                <Space>
                  {/* <Tooltip title="Ẩn đánh giá">
                    <Button
                      icon={<EyeInvisibleOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        showHideConfirm(rating.id);
                      }}
                      loading={actionLoading[rating.id]}
                      type="text"
                    />
                  </Tooltip> */}
                  <Tooltip title="Xóa đánh giá">
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        showDeleteConfirm(rating.id);
                      }}
                      loading={actionLoading[rating.id]}
                      type="text"
                    />
                  </Tooltip>
                </Space>
              }
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="Thông tin đánh giá" bordered={false}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        <StarOutlined /> Tổng thể:{" "}
                      </p>
                      <p>{renderRatingScore(rating.rating.overall)}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        <TeamOutlined /> Nhân viên:{" "}
                      </p>
                      <p>{renderRatingScore(rating.rating.staff, 4)}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        <ShopOutlined /> Cơ sở vật chất:{" "}
                      </p>
                      <p>{renderRatingScore(rating.rating.facility, 4)}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        <SmileOutlined /> Thoải mái:{" "}
                      </p>
                      <p> {renderRatingScore(rating.rating.comfortable, 4)}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        <AppstoreOutlined /> Sạch sẽ:{" "}
                      </p>
                      {renderRatingScore(rating.rating.clean, 4)}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        <DollarOutlined /> Đáng tiền:{" "}
                      </p>
                      <p>{renderRatingScore(rating.rating.money, 4)}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        <EnvironmentOutlined /> Vị trí:{" "}
                      </p>
                      <p>{renderRatingScore(rating.rating.location, 4)}</p>
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Thông tin lưu trú" bordered={false}>
                    <p>
                      <CalendarOutlined /> Check-in: {rating.booking.checkin}
                    </p>
                    <p>
                      <CalendarOutlined /> Check-out: {rating.booking.checkout}
                    </p>
                    <Divider />
                    <Title level={5}>Nhận xét:</Title>
                    <Paragraph>
                      {rating.rating.comment || "Không có nhận xét"}
                    </Paragraph>
                  </Card>
                </Col>
              </Row>
            </Panel>
          ))}
        </Collapse>
      </>
    );
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Spin size="large" tip="Đang tải dữ liệu đánh giá..." />
      </div>
    );
  }

  return (
    <div className="customer-rating-container">
      <Card>
        <Title level={2}>
          <StarOutlined /> Đánh giá từ khách hàng
        </Title>
        <Text type="secondary">
          Xem tất cả đánh giá từ khách hàng đã lưu trú tại các khách sạn của bạn
        </Text>

        <Divider />

        {ratingsData && ratingsData.totalRatings > 0 ? (
          <div>
            <Title level={4}>
              Tổng số đánh giá: {ratingsData.totalRatings}
            </Title>
            {renderHotelTabs()}
          </div>
        ) : (
          <Empty
            description="Chưa có đánh giá nào từ khách hàng"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
    </div>
  );
};

export default CustomerRating;
