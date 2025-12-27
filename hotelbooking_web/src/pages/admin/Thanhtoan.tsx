import {
  Space,
  DatePicker,
  Select,
  Row,
  Col,
  Divider,
  Table,
  Tag,
  Card,
  Statistic,
  Button,
  Modal,
  List,
  Typography,
  Tabs,
  Radio,
  message,
  Popconfirm,
  Tooltip,
  notification,
  Progress,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  baseUrl,
  formatCurrency,
  formatDateHour,
} from "../../constants/constants";
import {
  InfoCircleOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
  MailOutlined,
  SendOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

function Thanhtoan() {
  const { Option } = Select;
  const [dataBooking, setDataBooking] = useState<any>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<string>("all");
  const [dateRange, setDateRange] = useState<any>(null);
  const [doanhThuStats, setDoanhThuStats] = useState<any>(null);
  const [doanhThuThangStats, setDoanhThuThangStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [selectedHotelDetail, setSelectedHotelDetail] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [loadingSendEmail, setLoadingSendEmail] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loadingSendAllEmails, setLoadingSendAllEmails] =
    useState<boolean>(false);
  const [sendProgress, setSendProgress] = useState<{
    total: number;
    sent: number;
    failed: number;
  }>({
    total: 0,
    sent: 0,
    failed: 0,
  });
  const [progressModalVisible, setProgressModalVisible] =
    useState<boolean>(false);

  const getAPIBookingAll = async () => {
    try {
      const res = await axios.get(`${baseUrl}admin/booking-all-hotel`);
      setDataBooking(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getHotels = async () => {
    try {
      const res = await axios.get(`${baseUrl}admin/thongke-hotel`);
      setHotels(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getDoanhThuStats = async () => {
    setLoading(true);
    try {
      let url = `${baseUrl}admin/doi-soat-doanh-thu`;

      // Thêm tham số truy vấn
      const params = new URLSearchParams();

      if (selectedHotel !== "all") {
        params.append("hotelId", selectedHotel);
      }

      if (dateRange) {
        params.append("startDate", dateRange[0].format("YYYY-MM-DD"));
        params.append("endDate", dateRange[1].format("YYYY-MM-DD"));
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await axios.get(url);
      setDoanhThuStats(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getDoanhThuThangStats = async () => {
    setLoading(true);
    try {
      let url = `${baseUrl}admin/doi-soat-doanh-thu-theo-thang`;

      // Thêm tham số truy vấn
      const params = new URLSearchParams();

      if (selectedHotel !== "all") {
        params.append("hotelId", selectedHotel);
      }

      params.append("month", selectedMonth.toString());
      params.append("year", selectedYear.toString());

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await axios.get(url);
      setDoanhThuThangStats(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates);
  };

  const handleHotelChange = (value: string) => {
    setSelectedHotel(value);
  };

  const handleSearch = () => {
    getDoanhThuStats();
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleSearchThang = () => {
    getDoanhThuThangStats();
  };

  const showHotelDetail = (hotel: any) => {
    setSelectedHotelDetail(hotel);
    setDetailModalVisible(true);
  };

  const handleSendReconciliationReport = async (hotelId: string) => {
    try {
      setLoadingSendEmail(true);
      const res = await axios.post(
        `${baseUrl}admin/send-reconciliation-report`,
        {
          hotelId,
          month: selectedMonth,
          year: selectedYear,
        }
      );

      if (res.data.success) {
        messageApi.success(res.data.message);
      } else {
        messageApi.warning(res.data.message);
      }
    } catch (err: any) {
      messageApi.error(
        err.response?.data?.message || "Lỗi khi gửi báo cáo đối soát"
      );
      console.error(err);
    } finally {
      setLoadingSendEmail(false);
    }
  };

  const handleSendAllReconciliationReports = async () => {
    try {
      if (
        !doanhThuThangStats ||
        !doanhThuThangStats.hotels ||
        doanhThuThangStats.hotels.length === 0
      ) {
        messageApi.warning(
          "Không có dữ liệu khách sạn cho tháng hiện tại. Vui lòng tìm kiếm trước."
        );
        return;
      }

      const hotelsWithRevenue = doanhThuThangStats.hotels.filter(
        (hotel: any) => hotel.totalRevenue > 0
      );

      if (hotelsWithRevenue.length === 0) {
        messageApi.warning(
          "Không có khách sạn nào có doanh thu trong tháng này."
        );
        return;
      }

      setSendProgress({
        total: hotelsWithRevenue.length,
        sent: 0,
        failed: 0,
      });
      setProgressModalVisible(true);
      setLoadingSendAllEmails(true);

      let sentCount = 0;
      let failedCount = 0;

      for (const hotel of hotelsWithRevenue) {
        try {
          await axios.post(`${baseUrl}admin/send-reconciliation-report`, {
            hotelId: hotel.id,
            month: selectedMonth,
            year: selectedYear,
          });

          sentCount++;
          setSendProgress((prev) => ({
            ...prev,
            sent: sentCount,
          }));
        } catch (error) {
          console.error(
            `Failed to send report to hotel ID ${hotel.id}:`,
            error
          );
          failedCount++;
          setSendProgress((prev) => ({
            ...prev,
            failed: failedCount,
          }));
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      setLoadingSendAllEmails(false);

      if (failedCount === 0) {
        notification.success({
          message: "Gửi báo cáo thành công!",
          description: `Đã gửi ${sentCount} báo cáo đối soát đến tất cả chủ khách sạn.`,
          duration: 5,
        });
      } else {
        notification.warning({
          message: "Gửi báo cáo hoàn tất với một số lỗi",
          description: `Đã gửi thành công ${sentCount} báo cáo, thất bại ${failedCount} báo cáo.`,
          duration: 5,
        });
      }
    } catch (err: any) {
      messageApi.error(
        err.response?.data?.message || "Lỗi khi gửi báo cáo đối soát"
      );
      console.error(err);
      setLoadingSendAllEmails(false);
    }
  };

  useEffect(() => {
    getAPIBookingAll();
    getHotels();

    // Chỉ gọi API phù hợp với tab đang active
    if (activeTab === "1") {
      getDoanhThuStats();
    } else {
      getDoanhThuThangStats();
    }
  }, [activeTab]);

  const Column = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: any) => <span>HT{text.toString().padStart(4, "0")}</span>,
    },
    {
      title: "Tên khách sạn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text: any, record: any) => (
        <span>{`${text}, ${record.city}, ${record.country}`}</span>
      ),
    },
    {
      title: "Tổng đơn",
      dataIndex: "totalBookings",
      key: "totalBookings",
      sorter: (a: any, b: any) => a.totalBookings - b.totalBookings,
    },
    {
      title: "Doanh thu",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      sorter: (a: any, b: any) => a.totalRevenue - b.totalRevenue,
      render: (text: any) => (
        <span>
          {formatCurrency(text).split("₫")[0]}
          <span style={{ fontSize: 13.5 }}>VND</span>
        </span>
      ),
    },
    {
      title: "Hoa hồng (15%)",
      dataIndex: "commission",
      key: "commission",
      render: (text: any) => (
        <span>
          {formatCurrency(text).split("₫")[0]}
          <span style={{ fontSize: 13.5 }}>VND</span>
        </span>
      ),
    },
    {
      title: "Đã thanh toán",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (text: any) => (
        <span>
          {formatCurrency(text).split("₫")[0]}
          <span style={{ fontSize: 13.5 }}>VND</span>
        </span>
      ),
    },
    {
      title: "Còn lại",
      dataIndex: "remainingAmount",
      key: "remainingAmount",
      render: (text: any) => (
        <span>
          {formatCurrency(text).split("₫")[0]}
          <span style={{ fontSize: 13.5 }}>VND</span>
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="primary"
            icon={<InfoCircleOutlined />}
            onClick={() => showHotelDetail(record)}
          >
            Xem chi tiết
          </Button>
          <Tooltip title="Gửi báo cáo đối soát">
            <Popconfirm
              title="Gửi báo cáo đối soát"
              description={`Bạn có chắc muốn gửi báo cáo đối soát đến chủ khách sạn "${record.name}"?`}
              onConfirm={() => {
                handleSendReconciliationReport(record.id);
                return true; // This will close the popconfirm after confirmation
              }}
              okText="Gửi"
              cancelText="Hủy"
            >
              <Button
                icon={<MailOutlined />}
                loading={loadingSendEmail}
                type="default"
              >
                Gửi báo cáo
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div style={{ padding: 20 }}>
      {contextHolder}
      <Space direction="vertical" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Đối soát doanh thu</h1>
          {activeTab === "1" && doanhThuThangStats && (
            <Popconfirm
              title="Gửi báo cáo đối soát cho tất cả"
              description={`Bạn có chắc muốn gửi báo cáo đối soát tháng ${selectedMonth}/${selectedYear} đến tất cả chủ khách sạn có doanh thu?`}
              onConfirm={handleSendAllReconciliationReports}
              okText="Gửi"
              cancelText="Hủy"
            >
              <Button
                type="primary"
                icon={<GlobalOutlined />}
                loading={loadingSendAllEmails}
                style={{ marginLeft: 16 }}
              >
                Gửi đối soát cho tất cả
              </Button>
            </Popconfirm>
          )}
        </div>

        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane tab="Đối soát theo tháng" key="2">
            <Space size={"large"} style={{ marginBottom: 16 }}>
              <Space direction="horizontal">
                <span>Tháng</span>
                <Select
                  style={{ width: 100 }}
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <Option key={month} value={month}>
                      {month}
                    </Option>
                  ))}
                </Select>
              </Space>
              <Space direction="horizontal">
                <span>Năm</span>
                <Select
                  style={{ width: 100 }}
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  {Array.from(
                    { length: 5 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>
              </Space>
              <Space direction="horizontal">
                <span>Khách sạn</span>
                <Select
                  defaultValue="all"
                  style={{ width: 300 }}
                  onChange={handleHotelChange}
                  value={selectedHotel}
                >
                  <Option value="all">Tất cả</Option>
                  {hotels.map((hotel) => (
                    <Option key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </Option>
                  ))}
                </Select>
              </Space>
              <Button type="primary" onClick={handleSearchThang}>
                Tìm kiếm
              </Button>
            </Space>

            {doanhThuThangStats && (
              <>
                <Card style={{ marginBottom: 16 }}>
                  <Title level={4}>
                    Đối soát tháng {doanhThuThangStats.month}/
                    {doanhThuThangStats.year}
                  </Title>
                </Card>

                <Row gutter={16} style={{ marginTop: 20 }}>
                  <Col span={6}>
                    <Card>
                      <Statistic
                        title="Tổng số booking"
                        value={doanhThuThangStats.total.totalBookings}
                        prefix={<CheckCircleOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card>
                      <Statistic
                        title="Doanh thu tổng"
                        value={
                          formatCurrency(
                            doanhThuThangStats.total.totalRevenue
                          ).split("₫")[0]
                        }
                        suffix="VND"
                        prefix={<DollarOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card>
                      <Statistic
                        title="Hoa hồng (15%)"
                        value={
                          formatCurrency(
                            doanhThuThangStats.total.totalCommission
                          ).split("₫")[0]
                        }
                        suffix="VND"
                        prefix={<DollarOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card>
                      <Statistic
                        title="Đã thanh toán"
                        value={
                          formatCurrency(
                            doanhThuThangStats.total.totalPaid
                          ).split("₫")[0]
                        }
                        suffix="VND"
                        prefix={<CheckCircleOutlined />}
                      />
                    </Card>
                  </Col>
                </Row>

                <Divider style={{ margin: 20 }} />

                <Table
                  columns={Column}
                  dataSource={doanhThuThangStats.hotels}
                  loading={loading}
                  rowKey="id"
                />
              </>
            )}
          </TabPane>
        </Tabs>
      </Space>

      <Modal
        title={`Chi tiết đối soát - ${selectedHotelDetail?.name}`}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>,
          <Button
            key="send"
            type="primary"
            icon={<SendOutlined />}
            loading={loadingSendEmail}
            onClick={() =>
              handleSendReconciliationReport(selectedHotelDetail.id)
            }
          >
            Gửi báo cáo đối soát
          </Button>,
        ]}
      >
        {selectedHotelDetail && (
          <>
            <Card style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="Tổng đơn đặt"
                    value={selectedHotelDetail.totalBookings}
                    prefix={<CheckCircleOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Doanh thu"
                    value={
                      formatCurrency(selectedHotelDetail.totalRevenue).split(
                        "₫"
                      )[0]
                    }
                    suffix="VND"
                    prefix={<DollarOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Hoa hồng (15%)"
                    value={
                      formatCurrency(selectedHotelDetail.commission).split(
                        "₫"
                      )[0]
                    }
                    suffix="VND"
                    prefix={<DollarOutlined />}
                  />
                </Col>
              </Row>
            </Card>

            <Divider orientation="left">Danh sách đơn đặt phòng</Divider>

            <List
              itemLayout="horizontal"
              dataSource={selectedHotelDetail.bookings}
              renderItem={(booking: any) => (
                <List.Item
                  actions={[
                    booking.is_paid ? (
                      <Tag color="green">Đã thanh toán</Tag>
                    ) : (
                      <Tag color="red">Chưa thanh toán</Tag>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    title={`Đơn đặt #${booking.id}`}
                    description={
                      <>
                        <p>
                          Ngày nhận phòng:{" "}
                          {formatDateHour(booking.checkin_date).split(" ")[0]}
                        </p>
                        <p>
                          Ngày trả phòng:{" "}
                          {formatDateHour(booking.checkout_date).split(" ")[0]}
                        </p>
                        <p>
                          Tổng tiền:{" "}
                          {formatCurrency(booking.revenue).split("₫")[0]} VND
                        </p>
                        <p>
                          Hoa hồng:{" "}
                          {formatCurrency(booking.commission).split("₫")[0]} VND
                        </p>
                        <p>
                          Phương thức thanh toán:{" "}
                          {booking.payment_method === "CASH"
                            ? "Tiền mặt"
                            : "Thẻ tín dụng"}
                        </p>
                      </>
                    }
                  />
                </List.Item>
              )}
            />

            <Divider />

            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Đã thanh toán"
                  value={
                    formatCurrency(selectedHotelDetail.paidAmount).split("₫")[0]
                  }
                  suffix="VND"
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Chưa thanh toán"
                  value={
                    formatCurrency(selectedHotelDetail.unpaidAmount).split(
                      "₫"
                    )[0]
                  }
                  suffix="VND"
                  valueStyle={{ color: "#cf1322" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Số tiền còn lại"
                  value={
                    formatCurrency(selectedHotelDetail.remainingAmount).split(
                      "₫"
                    )[0]
                  }
                  suffix="VND"
                  valueStyle={{ color: "#1890ff" }}
                />
              </Col>
            </Row>
          </>
        )}
      </Modal>

      <Modal
        title="Tiến trình gửi báo cáo đối soát"
        open={progressModalVisible}
        onCancel={() =>
          loadingSendAllEmails ? undefined : setProgressModalVisible(false)
        }
        footer={[
          <Button
            key="close"
            onClick={() => setProgressModalVisible(false)}
            disabled={loadingSendAllEmails}
          >
            Đóng
          </Button>,
        ]}
      >
        <Card>
          <Statistic
            title="Tổng số báo cáo cần gửi"
            value={sendProgress.total}
            suffix="báo cáo"
            style={{ marginBottom: 16 }}
          />
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Đã gửi thành công"
                value={sendProgress.sent}
                valueStyle={{ color: "#3f8600" }}
                prefix={<CheckCircleOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Thất bại"
                value={sendProgress.failed}
                valueStyle={{ color: "#cf1322" }}
                prefix={<CloseCircleOutlined />}
              />
            </Col>
          </Row>

          <div style={{ marginTop: 24 }}>
            <Progress
              percent={Math.round(
                ((sendProgress.sent + sendProgress.failed) /
                  sendProgress.total) *
                  100
              )}
              status={loadingSendAllEmails ? "active" : "normal"}
            />
            <div style={{ textAlign: "center", marginTop: 8 }}>
              {loadingSendAllEmails
                ? "Đang gửi báo cáo, vui lòng đợi..."
                : "Hoàn thành gửi báo cáo"}
            </div>
          </div>
        </Card>
      </Modal>
    </div>
  );
}

export default Thanhtoan;
