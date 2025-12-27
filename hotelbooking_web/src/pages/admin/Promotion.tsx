import { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Switch,
  message,
  Popconfirm,
  Row,
  Col,
  Card,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import type { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface PromotionData {
  id: number;
  name: string;
  description: string;
  discount_type: "PERCENTAGE" | "FIXED";
  discount_value: number;
  start_date: string;
  end_date: string;
  min_stay: number | null;
  booking_days_in_advance: number | null;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

const Promotion: React.FC = () => {
  const [promotions, setPromotions] = useState<PromotionData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingPromotion, setEditingPromotion] =
    useState<PromotionData | null>(null);
  const [form] = Form.useForm();
  const token = localStorage.getItem("token");

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/promotion?systemOnly=true",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPromotions(response.data.promotions);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      message.error("Không thể tải danh sách khuyến mãi");
    } finally {
      setLoading(false);
    }
  };
  console.log(promotions);
  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleCreate = () => {
    setEditingPromotion(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: PromotionData) => {
    setEditingPromotion(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      discountType: record.discount_type,
      discountValue: record.discount_value,
      dateRange: [
        record.start_date ? moment(record.start_date) : "",
        record.end_date ? moment(record.end_date) : "",
      ],
      minStay: record.min_stay,
      bookingDaysInAdvance: record.booking_days_in_advance,
      isActive: record.is_active,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/promotion/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Xóa khuyến mãi thành công");
      fetchPromotions();
    } catch (error) {
      console.error("Error deleting promotion:", error);
      message.error("Không thể xóa khuyến mãi");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const [startDate, endDate] = values.dateRange;

      const promotionData = {
        name: values.name,
        description: values.description,
        discountType: values.discountType,
        discountValue: values.discountValue,
        startDate: startDate ? startDate.format("YYYY-MM-DD") : "",
        endDate: endDate ? endDate.format("YYYY-MM-DD") : "",
        minStay: values.minStay,
        bookingDaysInAdvance: values.bookingDaysInAdvance,
        isActive: values.isActive,
      };

      if (editingPromotion) {
        // Update existing promotion
        await axios.put(
          `http://localhost:5000/promotion/${editingPromotion.id}`,
          promotionData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        message.success("Cập nhật khuyến mãi thành công");
      } else {
        // Create new promotion
        await axios.post("http://localhost:5000/promotion", promotionData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Tạo khuyến mãi thành công");
      }

      setModalVisible(false);
      fetchPromotions();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Có lỗi xảy ra khi lưu khuyến mãi");
    }
  };

  // Disallow selecting dates before today
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < moment().startOf("day");
  };

  const columns = [
    {
      title: "Tên khuyến mãi",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Loại giảm giá",
      dataIndex: "discount_type",
      key: "discount_type",
      render: (type: string) =>
        type === "PERCENTAGE" ? "Phần trăm" : "Số tiền cố định",
    },
    {
      title: "Giá trị",
      dataIndex: "discount_value",
      key: "discount_value",
      render: (value: number, record: PromotionData) => (
        <Text>
          {record.discount_type === "PERCENTAGE"
            ? `${value}%`
            : `${value.toLocaleString("vi-VN")} VND`}
        </Text>
      ),
    },
    {
      title: "Thời gian áp dụng",
      key: "period",
      render: (_: any, record: PromotionData) => (
        <Text>
          {record.start_date && moment(record.start_date).format("DD/MM/YYYY")}{" "}
          - {record.end_date && moment(record.end_date).format("DD/MM/YYYY")}
        </Text>
      ),
    },
    {
      title: "Số đêm tối thiểu",
      dataIndex: "min_stay",
      key: "min_stay",
      render: (value: number | null) => (value ? value : "--"),
    },
    {
      title: "Đặt trước (ngày)",
      dataIndex: "booking_days_in_advance",
      key: "booking_days_in_advance",
      render: (value: number | null) => (value ? value : "--"),
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      render: (active: boolean) => (
        <Text type={active ? "success" : "danger"}>
          {active ? "Đang hoạt động" : "Không hoạt động"}
        </Text>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => moment(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: PromotionData) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa khuyến mãi này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={3}>Quản lý khuyến mãi hệ thống</Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Thêm khuyến mãi mới
          </Button>
        </Col>
      </Row>

      <Card>
        <Table
          dataSource={promotions}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ padding: 12 }}>
                <Text strong>Mô tả:</Text>
                <p>{record.description || "Không có mô tả"}</p>
              </div>
            ),
          }}
        />
      </Card>

      <Modal
        title={
          editingPromotion ? "Chỉnh sửa khuyến mãi" : "Thêm khuyến mãi mới"
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            {editingPromotion ? "Cập nhật" : "Tạo mới"}
          </Button>,
        ]}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            discountType: "PERCENTAGE",
            discountValue: 10,
            isActive: true,
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Tên khuyến mãi"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khuyến mãi" },
                ]}
              >
                <Input placeholder="Nhập tên khuyến mãi" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="description" label="Mô tả">
                <TextArea rows={4} placeholder="Nhập mô tả khuyến mãi" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="discountType"
                label="Loại giảm giá"
                rules={[
                  { required: true, message: "Vui lòng chọn loại giảm giá" },
                ]}
              >
                <Select>
                  <Option value="PERCENTAGE">Phần trăm (%)</Option>
                  <Option value="FIXED">Số tiền cố định (VND)</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="discountValue"
                label="Giá trị giảm giá"
                rules={[
                  { required: true, message: "Vui lòng nhập giá trị giảm giá" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  max={
                    form.getFieldValue("discountType") === "PERCENTAGE"
                      ? 100
                      : 10000000
                  }
                  formatter={(value) =>
                    form.getFieldValue("discountType") === "PERCENTAGE"
                      ? `${value}%`
                      : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value: any) =>
                    value!.replace(/\$\s?|(,*)/g, "").replace("%", "")
                  }
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="dateRange"
                label="Thời gian áp dụng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian áp dụng",
                  },
                ]}
              >
                <RangePicker
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  disabledDate={disabledDate}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="minStay" label="Số đêm tối thiểu">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Không giới hạn"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="bookingDaysInAdvance" label="Đặt trước (ngày)">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Không giới hạn"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="isActive"
                label="Trạng thái"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Hoạt động"
                  unCheckedChildren="Không hoạt động"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Promotion;
