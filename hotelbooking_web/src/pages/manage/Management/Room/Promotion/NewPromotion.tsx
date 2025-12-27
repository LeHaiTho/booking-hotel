import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
  Select,
} from "antd";
import PromotionOverviewModal from "../../../../component/PromotionOverviewModal";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../../constants/constants";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectHotelMn } from "../../../../../redux/selector";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const { Option } = Select;

const NewPromotion = () => {
  const token = localStorage.getItem("token");
  const hotel = useSelector(selectHotelMn);
  const location = useLocation();
  const promotionTitle = location.state?.promotionTitle || "Ưu Đãi Mùa Du Lịch";
  const promotionStartDate = location.state?.promotionStartDate;
  const promotionEndDate = location.state?.promotionEndDate;
  const promotionDiscount = location.state?.promotionDiscount
    ? Number(location.state.promotionDiscount)
    : 20;

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomtype, setRoomtype] = useState<any[]>([]);
  const [selectedRoomOption, setSelectedRoomOption] =
    useState<string>("all-rooms");
  const [promotionDetail, setPromotionDetail] = useState<any>();

  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getAPIRoomtype = async () => {
    try {
      if (token && hotel) {
        const res = await axios.get(
          `${baseUrl}rooms/get-by-typeroom/${hotel?.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRoomtype(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onRoomOptionChange = (e: any) => {
    const value = e.target.value;
    setSelectedRoomOption(value);
    form.setFieldsValue({ roomSelection: value });
    if (value === "all-rooms") {
      form.setFieldsValue({ selectedRoomTypes: undefined });
    }
  };

  const onFinish = async (values: any) => {
    try {
      const startDate = values.dateRange?.[0]
        ? dayjs(values.dateRange[0]).format("YYYY-MM-DD")
        : null;
      const roomIds =
        values.roomSelection === "all-rooms"
          ? roomtype.flatMap((item: any) => item.ids)
          : values.selectedRoomTypes
          ? JSON.parse(values.selectedRoomTypes).ids
          : [];
      const payload = {
        name: values.promotionName,
        discount_type: "PERCENTAGE",
        discount_value: values.discount,
        start_date: startDate,
        end_date: values.dateRange?.[1]
          ? dayjs(values.dateRange[1]).format("YYYY-MM-DD")
          : null,
        roomIds,
        id_hotel: hotel?.id,
      };
      // Uncomment to enable API submission

      setPromotionDetail(payload);
      showModal();
    } catch (err) {
      console.log(err);
    }
  };
  console.log("promotionDetail", promotionDetail);
  // Convert promotion dates to dayjs for RangePicker
  const defaultDateRange =
    promotionStartDate && promotionEndDate
      ? [dayjs(promotionStartDate), dayjs(promotionEndDate)]
      : undefined;

  // Restrict dates outside the default range
  const disabledDate = (current: dayjs.Dayjs) => {
    if (!promotionStartDate || !promotionEndDate) return false;
    return (
      current < dayjs(promotionStartDate).startOf("day") ||
      current > dayjs(promotionEndDate).endOf("day")
    );
  };

  // Update promotionName when discount or dateRange changes
  useEffect(() => {
    const discount = form.getFieldValue("discount") || promotionDiscount;
    const dateRange = form.getFieldValue("dateRange") || defaultDateRange;
    form.setFieldsValue({
      promotionName: `${discount}% - ${promotionTitle} - ${
        dateRange?.[0]
          ? dayjs(dateRange[0]).format("DD MMMM YYYY")
          : "Ngày Không Xác Định"
      }`,
    });
  }, [
    form,
    promotionTitle,
    promotionDiscount,
    defaultDateRange,
    // Trigger on form field changes
    form.getFieldValue("discount"),
    form.getFieldValue("dateRange"),
  ]);

  useEffect(() => {
    getAPIRoomtype();
  }, [hotel, token]);

  return (
    <div style={{ padding: 24 }}>
      <Form
        form={form}
        layout="vertical"
        style={{ width: "50%" }}
        onFinish={onFinish}
        initialValues={{
          dateRange: defaultDateRange,
          priceType: ["all-prices"],
          roomSelection: "all-rooms",
          discount: promotionDiscount,
          promotionName: `${promotionDiscount}% - ${promotionTitle} - ${
            defaultDateRange?.[0]
              ? defaultDateRange[0].format("DD MMMM YYYY")
              : "Ngày Không Xác Định"
          }`,
        }}
      >
        {promotionStartDate && promotionEndDate && (
          <Card
            title={`Thêm chương trình khuyến mãi mới: ${promotionTitle}`}
            style={{ borderRadius: 0 }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Áp dụng từ ngày - đến ngày"
                  name="dateRange"
                  rules={[
                    { required: true, message: "Vui lòng chọn khoảng ngày" },
                  ]}
                >
                  <RangePicker
                    format="DD-MM-YYYY"
                    disabledDate={disabledDate}
                    // defaultValue={defaultDateRange}
                    onChange={(value) => {
                      form.setFieldsValue({ dateRange: value });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        )}

        <Card
          title="Thông tin chi tiết về khuyến mãi"
          style={{ marginTop: 20, borderRadius: 0 }}
        >
          <Form.Item
            label="Phòng nào sẽ được áp dụng?"
            name="roomSelection"
            rules={[{ required: true, message: "Vui lòng chọn phòng áp dụng" }]}
          >
            <Radio.Group onChange={onRoomOptionChange}>
              <Radio value="all-rooms">Tất cả phòng</Radio>
              <Radio value="choose-rooms">Chọn phòng</Radio>
            </Radio.Group>
          </Form.Item>

          {selectedRoomOption === "choose-rooms" && (
            <Form.Item
              label="Chọn loại chỗ nghỉ"
              name="selectedRoomTypes"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ít nhất một loại chỗ nghỉ",
                },
              ]}
            >
              <Select
                placeholder="Vui lòng chọn loại chỗ nghỉ"
                style={{ width: "100%" }}
                allowClear
              >
                {roomtype &&
                  roomtype.map((item: any) => (
                    <Option
                      key={item?.loaichonghi}
                      value={JSON.stringify(item)}
                    >
                      {item?.loaichonghi}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            label="Giảm giá bao nhiêu (%)?"
            name="discount"
            rules={[
              { required: true, message: "Vui lòng nhập phần trăm giảm giá" },
            ]}
          >
            <InputNumber
              min={promotionDiscount}
              max={99}
              defaultValue={promotionDiscount}
              onChange={(value) => {
                form.setFieldsValue({
                  discount: value,
                  promotionName: `${
                    value || promotionDiscount
                  }% - ${promotionTitle} - ${
                    form.getFieldValue("dateRange")?.[0]
                      ? dayjs(form.getFieldValue("dateRange")[0]).format(
                          "DD MMMM YYYY"
                        )
                      : "Ngày Không Xác Định"
                  }`,
                });
              }}
            />{" "}
            %
          </Form.Item>
        </Card>

        <Card title="Tên khuyến mãi" style={{ marginTop: 20, borderRadius: 0 }}>
          <Form.Item
            label="Nhập tên khuyến mãi"
            name="promotionName"
            rules={[
              { required: true, message: "Vui lòng nhập tên khuyến mãi" },
            ]}
          >
            <Input />
          </Form.Item>
        </Card>

        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            Xem lại chương trình khuyến mãi của Quý vị
          </Button>
          <Button onClick={() => form.resetFields()}>Quay lại</Button>
        </Form.Item>
      </Form>
      <PromotionOverviewModal
        open={isModalOpen}
        onClose={closeModal}
        promotionD={promotionDetail}
      />
    </div>
  );
};

export default NewPromotion;
