import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Descriptions,
  Tag,
  Rate,
  Select,
  DatePicker,
  message,
  Popconfirm,
} from "antd";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectHotelMn } from "../../../../redux/selector";

const RevenueReport: React.FC = () => {
  const hotel = useSelector(selectHotelMn);
  const token = localStorage.getItem("token");
  const [visible, setVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [dateFilter, setDateFilter] = useState<moment.Moment | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  // Lấy danh sách đặt phòng
  useEffect(() => {
    const fetchBookings = async () => {
      if (!hotel?.id || !token) {
        setBookings([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const params: any = {};
        if (statusFilter) params.status = statusFilter;
        if (dateFilter) params.checkin_date = dateFilter.format("YYYY-MM-DD");

        const res = await axios.get(
          `http://localhost:5000/booking/revenue/${hotel.id}`,
          {
            // headers: { Authorization: `Bearer ${token}` },
            params,
          }
        );
        setBookings(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đặt phòng:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [hotel?.id, token, statusFilter, dateFilter]);

  // Hàm xử lý check-in
  const handleCheckIn = async (bookingId: number) => {
    setConfirmLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/booking/check-in/${bookingId}`
      );

      if (response.status === 200) {
        message.success("Check-in thành công!");

        // Cập nhật trạng thái trong danh sách đặt phòng
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, status: "CONFIRMED" }
              : booking
          )
        );

        // Nếu đang xem chi tiết booking này, cập nhật trạng thái
        if (selectedBooking && selectedBooking.id === bookingId) {
          setSelectedBooking({
            ...selectedBooking,
            status: "CONFIRMED",
          });
        }
      }
    } catch (error) {
      console.error("Lỗi khi check-in:", error);
      message.error("Không thể check-in. Vui lòng thử lại sau.");
    } finally {
      setConfirmLoading(false);
    }
  };

  // Tính giá dựa trên calculatePrice logic
  const calculatePrice = (booking: any, room: any) => {
    const basePrice = room.sotien;
    const checkIn = moment(booking.checkin_date);
    const checkOut = moment(booking.checkout_date);
    const days = checkOut.diff(checkIn, "days");
    let initialPrice = basePrice * days;
    let finalPrice = 0;

    for (let m = checkIn.clone(); m.isBefore(checkOut); m.add(1, "days")) {
      let dailyPrice = basePrice;
      const currentDay = m.day();

      // Áp dụng RoomPriceAdjustments
      const applicableAdjustments = room.RoomPriceAdjustments.filter(
        (adj: any) =>
          moment(m).isSameOrAfter(adj.start_date) &&
          moment(m).isSameOrBefore(adj.end_date) &&
          adj.apply_to_days.includes(currentDay)
      );
      if (applicableAdjustments.length > 0) {
        const adj = applicableAdjustments[0];
        if (adj.adjustment_type === "PERCENTAGE") {
          dailyPrice *= 1 + Number(adj.adjustment_value) / 100;
        }
      }

      // Áp dụng Promotions
      const applicablePromotions = room.Promotions.filter(
        (promo: any) =>
          promo.is_active &&
          (!promo.start_date || moment(m).isSameOrAfter(promo.start_date)) &&
          (!promo.end_date || moment(m).isSameOrBefore(promo.end_date))
      );
      for (const promo of applicablePromotions) {
        if (promo.discount_type === "PERCENTAGE") {
          dailyPrice *= 1 - Number(promo.discount_value) / 100;
        }
      }

      finalPrice += Math.max(0, Math.round(dailyPrice));
    }

    return { initialPrice, finalPrice };
  };

  // Cột bảng danh sách đặt phòng
  const columns = [
    {
      title: "Mã đặt phòng",
      dataIndex: "id",
      key: "id",
      onHeaderCell: () => ({
        style: { backgroundColor: "#f5f7ff" },
      }),
    },
    {
      title: "Khách hàng",
      key: "customer",
      render: (record: any) => {
        const user = record.User;
        return user ? `${user.firstname} ${user.lastname}` : "N/A";
      },
    },
    {
      title: "Khách sạn",
      key: "hotel",
      render: (record: any) => {
        const hotel = record.Hotel;
        return hotel ? hotel.name : "N/A";
      },
    },
    {
      title: "Check-in",
      dataIndex: "checkin_date",
      key: "checkin_date",
      render: (date: string) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Check-out",
      dataIndex: "checkout_date",
      key: "checkout_date",
      render: (date: string) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Tổng giá",
      dataIndex: "total_price",
      key: "total_price",
      render: (price: number) =>
        price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color =
          status === "CONFIRMED"
            ? "green"
            : status === "CANCELLED"
            ? "red"
            : "orange";
        let statusText =
          status === "CONFIRMED"
            ? "Đã xác nhận"
            : status === "CANCELLED"
            ? "Đã hủy"
            : "Đang xử lý";
        return (
          <Tag
            color={color}
            style={{ fontSize: "14px", backgroundColor: color, color: "white" }}
          >
            {statusText}
          </Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (record: any) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            onClick={() => {
              setSelectedBooking(record);
              setVisible(true);
            }}
          >
            Xem chi tiết
          </Button>

          {record.status === "PENDING" && (
            <Popconfirm
              title="Xác nhận check-in"
              description="Bạn có chắc chắn muốn check-in cho đặt phòng này không?"
              onConfirm={() => handleCheckIn(record.id)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <Button
                key="checkin"
                type="primary"
                style={{ backgroundColor: "#52c41a" }}
                loading={confirmLoading && selectedBooking?.id === record.id}
              >
                Check-in
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl font-bold mb-4">Thống kê đặt phòng</h1>

      {/* Bộ lọc */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Select
          placeholder="Lọc theo trạng thái"
          style={{ width: 200 }}
          allowClear
          onChange={(value) => setStatusFilter(value)}
        >
          <Select.Option value="PENDING">Đang xử lý</Select.Option>
          <Select.Option value="CONFIRMED">Đã xác nhận</Select.Option>
          <Select.Option value="CANCELLED">Đã hủy</Select.Option>
        </Select>
        {/* <DatePicker
          placeholder="Lọc theo ngày check-in"
          format="DD/MM/YYYY"
          onChange={(date) =>
            setDateFilter(date ? moment(date.toDate()) : null)
          }
        /> */}
      </div>

      {/* Bảng danh sách đặt phòng */}
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        loading={loading}
      />

      {/* Modal chi tiết đặt phòng */}
      {selectedBooking && (
        <Modal
          title={`Chi tiết đặt phòng #${selectedBooking.id}`}
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setSelectedBooking(null);
          }}
          footer={[
            <Button
              key="close"
              onClick={() => {
                setVisible(false);
                setSelectedBooking(null);
              }}
            >
              Đóng
            </Button>,
            selectedBooking.status === "PENDING" && (
              <Popconfirm
                title="Xác nhận check-in"
                description="Bạn có chắc chắn muốn check-in cho đặt phòng này không?"
                onConfirm={() => handleCheckIn(selectedBooking.id)}
                okText="Xác nhận"
                cancelText="Hủy"
              >
                <Button
                  key="checkin"
                  type="primary"
                  style={{ backgroundColor: "#52c41a" }}
                  loading={confirmLoading}
                >
                  Check-in
                </Button>
              </Popconfirm>
            ),
          ]}
          width={800}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Khách hàng">
              {selectedBooking.User
                ? `${selectedBooking.User.firstname} ${selectedBooking.User.lastname}`
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedBooking.User?.email || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {selectedBooking.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Khách sạn">
              {selectedBooking.Hotel?.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Check-in">
              {moment(selectedBooking.checkin_date).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Check-out">
              {moment(selectedBooking.checkout_date).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Số khách">
              {`${selectedBooking.total_adult} người lớn, ${selectedBooking.total_children} trẻ em`}
            </Descriptions.Item>
            <Descriptions.Item label="Phòng">
              {selectedBooking.Hotel?.Rooms[0]?.nameroom || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Giá ban đầu">
              {(() => {
                const room = selectedBooking.Hotel?.Rooms[0];
                if (room) {
                  const { initialPrice } = calculatePrice(
                    selectedBooking,
                    room
                  );
                  return initialPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  });
                }
                return "N/A";
              })()}
            </Descriptions.Item>
            <Descriptions.Item label="Giá cuối cùng">
              {selectedBooking.total_price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Descriptions.Item>
            <Descriptions.Item label="Khuyến mãi">
              {selectedBooking.Hotel?.Rooms[0]?.Promotions.length > 0 ? (
                <ul>
                  {selectedBooking.Hotel.Rooms[0].Promotions.map(
                    (promo: any) => (
                      <li key={promo.id}>
                        {promo.name} (-{promo.discount_value}%, áp dụng từ{" "}
                        {promo.start_date
                          ? moment(promo.start_date).format("DD/MM/YYYY")
                          : "Không giới hạn"}{" "}
                        đến{" "}
                        {promo.end_date
                          ? moment(promo.end_date).format("DD/MM/YYYY")
                          : "Không giới hạn"}
                        )
                      </li>
                    )
                  )}
                </ul>
              ) : (
                "Không có khuyến mãi"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Tăng giá">
              {selectedBooking.Hotel?.Rooms[0]?.RoomPriceAdjustments.length >
              0 ? (
                <ul>
                  {selectedBooking.Hotel.Rooms[0].RoomPriceAdjustments.map(
                    (adj: any) => (
                      <li key={adj.id}>
                        {adj.reason} (+{adj.adjustment_value}%, áp dụng{" "}
                        {adj.apply_to_days
                          .map(
                            (d: number) =>
                              [
                                "Chủ nhật",
                                "Thứ hai",
                                "Thứ ba",
                                "Thứ tư",
                                "Thứ năm",
                                "Thứ sáu",
                                "Thứ bảy",
                              ][d]
                          )
                          .join(", ")}
                        )
                      </li>
                    )
                  )}
                </ul>
              ) : (
                "Không có tăng giá"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Phương thức thanh toán">
              {selectedBooking.payment_method}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag
                style={{
                  fontSize: "14px",
                  backgroundColor:
                    selectedBooking.status === "CONFIRMED"
                      ? "green"
                      : selectedBooking.status === "CANCELLED"
                      ? "red"
                      : "orange",
                  color: "white",
                }}
              >
                {selectedBooking.status === "CONFIRMED"
                  ? "Đã xác nhận"
                  : selectedBooking.status === "CANCELLED"
                  ? "Đã hủy"
                  : "Đang xử lý"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Lịch sử thay đổi">
              {selectedBooking.BookingHistories.length > 0 ? (
                <ul>
                  {selectedBooking.BookingHistories.map((history: any) => (
                    <li key={history.id}>
                      {moment(history.changed_at).format("DD/MM/YYYY HH:mm")} -{" "}
                      {history.reason}: Từ{" "}
                      {moment(history.old_checkin_date).format("DD/MM/YYYY")}{" "}
                      đến{" "}
                      {moment(history.old_checkout_date).format("DD/MM/YYYY")} →{" "}
                      {moment(history.new_checkin_date).format("DD/MM/YYYY")}{" "}
                      đến{" "}
                      {moment(history.new_checkout_date).format("DD/MM/YYYY")}
                    </li>
                  ))}
                </ul>
              ) : (
                "Không có thay đổi"
              )}
            </Descriptions.Item>
            {selectedBooking.status === "COMPLETED" && (
              <Descriptions.Item label="Đánh giá khách hàng">
                {(() => {
                  const review = selectedBooking.Reviews[0];
                  return review ? (
                    <div>
                      <Rate disabled value={review.rating} />
                      <p>{review.comment}</p>
                      <p>
                        {moment(review.createdAt).format("DD/MM/YYYY HH:mm")}
                      </p>
                    </div>
                  ) : (
                    "Chưa có đánh giá"
                  );
                })()}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Modal>
      )}
    </div>
  );
};

export default RevenueReport;
