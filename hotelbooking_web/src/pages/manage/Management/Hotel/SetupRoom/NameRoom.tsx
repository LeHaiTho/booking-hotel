import { Button, Col, Divider, Form, Row, Select, Space } from "antd";
import { CurrencyInput } from "../../../../component";
import { useForm } from "antd/es/form/Form";
import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { APP1, baseUrl, COLORS } from "../../../../../constants/constants";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectFormRegisterRoomMn } from "../../../../../redux/selector";
import {
  resetForm,
  updateForm,
} from "../../../../../redux/Slice/Hotels_Mn/formRegisterRoomMnSlice";
import axios from "axios";
const { Option } = Select;

function NameRoom() {
  const [form] = useForm();
  const { idhotel } = useParams();
  const navigate = useNavigate();
  const [tiennhan, setTienNhan] = useState<any>(); //tiền nhận được sau khi giảm 15%
  // lấy token lên để tránh copy link vào trang
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const formStateRoom = useSelector(selectFormRegisterRoomMn);
  const toPay = (money: string): number => {
    const moneyNumber = money.replace(/\D/g, "");
    return Math.round((Number(moneyNumber) * 85) / 100);
  };
  const toPay1 = (money: string): number => {
    const moneyNumber = money.replace(/\D/g, "");
    return Number(moneyNumber);
  };
  //tính giá trị gốc
  const getFullValue = (currentValue: number, percent: number): number => {
    return (currentValue / percent) * 100;
  };
  const nameroom = [
    "Phòng Giường Đôi",
    "Phòng Giường Đôi Có Phòng Tắm Riêng",
    "Phòng Business 1 Giường Đôi với Quyền sử dụng Phòng tập thể dục.",
    "Phòng Có Giường Cỡ Queen Nhìn Ra Hồ Bơi ",
    "Phòng Deluxe Giường Đôi",
    "Phòng Tiêu Chuẩn Có Giường Cỡ King",
    "Phòng Có Giường Cỡ King - Phù Hợp Cho Khách Khuyết Tật",
    "Phòng Có Giường Cỡ King",
    "Phòng Có Giường Cỡ King Nhìn Ra Biển",
    "Phòng Có Giường Cỡ King Nhìn Ra Hồ Bơi",
    "Phòng Có Giường Cỡ King Nhìn Ra Hồ Nước",
    "Phòng Có Giường Cỡ King Nhìn Ra Vườn",
    "Phòng Có Giường Cỡ King Với Ban Công",
    "Phòng Có Giường Cỡ King Với Phòng Tắm Phù Hợp Cho Người Đi Xe Lăn - Phù Hợp Cho Khách Khuyết Tật",
    "Phòng Có Giường Cỡ Queen",
    "Phòng Có Giường Cỡ Queen - Phù Hợp Cho Khách Khuyết Tật",
    "Phòng Có Giường Cỡ Queen Nhìn Ra Biển",
    "Phòng Có Giường Cỡ Queen Nhìn Ra Vườn",
    "Phòng Có Giường Cỡ Queen Và Bồn Tắm Spa",
    "Phòng Có Giường Cỡ Queen Với Ban Công",
    "Phòng Có Giường Cỡ Queen Với Phòng Tắm Chung",
    "Phòng Deluxe",
    "Phòng Deluxe (1) Người lớn + 1 Trẻ em)",
    "Phòng Deluxe (1 người lớn + 2 trẻ em)",
    "Phòng Deluxe (2 Người lớn + 1 Trẻ em)",
    "Phòng Deluxe Có Giường Cỡ Queen",
    "Phòng Deluxe Có Giường Cỡ King",
    "Phòng Deluxe Giường Đôi (1 người lớn + 1 trẻ em)",
    "Phòng Deluxe Giường Đôi Có Vòi Sen",
    "Phòng Deluxe Giường Đôi Có Ban Công",
    "Phòng Deluxe Giường Đôi Có Bồn Tắm",
    "Phòng Deluxe Giường Đôi Kèm Giường Phụ",
    "Phòng Deluxe Giường Đôi Nhìn Ra Biển",
    "Phòng Deluxe Giường Đôi Nhìn Ra Biển Từ Phía Bên Cạnh",
    "Phòng Deluxe Giường Đôi Với Ban Công và Tầm Nhìn Ra Biển",
    "Phòng Deluxe Giường Đôi/2 Giường Đơn",
    "Phòng Deluxe Giường đôi (1 người lớn + 2 trẻ em)",
    "Phòng Deluxe Đôi Nhìn ra Lâu đài",
    "Phòng Giường Đôi (1 Người lớn + 1 Trẻ em)",
    "Phòng Giường Đôi - Có thiết kế cho Khách khuyết tật",
    "Phòng Giường Đôi Có Ban Công",
    "Phòng Giường Đôi Có Ban Công (2) Người Lớn + 1 Trẻ Em)",
    "Phòng Giường Đôi Có Ban Công (3 Người Lớn)",
    "Phòng Giường Đôi Có Bồn Tắm Spa",
    "Phòng Giường Đôi Có Giường Phụ",
    "Phòng Giường Đôi Có Sân Hiên",
    "Phòng Giường Đôi Có Sân Trong",
    "Phòng Giường Đôi Hạng Bình Dân",
    "Phòng Giường Đôi Hạng Tiết Kiệm",
    "Phòng Giường Đôi Lớn",
    "Phòng Giường Đôi Nhìn Ra Biển",
    "Phòng Giường Đôi Nhìn Ra Hồ Bơi",
    "Phòng Giường Đôi Nhìn Ra Hồ Nước",
    "Phòng Giường Đôi Nhìn Ra Núi",
    "Phòng Giường Đôi Nhìn Ra Vườn",
    "Phòng Giường Đôi Nhỏ",
    "Phòng Giường Đôi Với Phòng Tắm Chung",
    "Phòng Giường Đôi Với Phòng Tắm Riêng Bên Ngoài",
    "Phòng Giường Đôi có Ban công và Nhìn ra Biển",
    "Phòng Giường Đôi với Nhà vệ sinh Chung",
    "Phòng Giường đôi Deluxe (2 Người lớn + 1 Trẻ em)",
    "Phòng Superior Có Giường Cỡ King",
    "Phòng Superior Có Giường Cỡ Queen",
    "Phòng Superior Giường Đôi",
    "Phòng Tiêu Chuẩn Có Giường Cỡ Queen",
    "Phòng Tiêu Chuẩn Giường Đôi",
    "Phòng Tiêu Chuẩn Giường Đôi Có Quạt Máy",
    "Phòng Tiêu Chuẩn Giường Đôi Với Phòng Tắm Chung",
    "Phòng có giường cỡ King với Bồn tắm Spa",
    "Phòng có giường cỡ King nhìn ra cảnh núi non",
  ];
  const onFinish = async (values: any) => {
    console.log(values);
    //topay() để lấy hoa hồng toPay(values?.sotien) sửa ngày 10/03/2025
    const payload = {
      nameroom: values?.nameroom,
      sotien: toPay1(values?.sotien),
    };
    dispatch(updateForm(payload));
    const payloads = {
      ...formStateRoom,
      ...payload,
    };
    try {
      const res = await axios.post(
        `${baseUrl}hotel-properties/room/create/${idhotel}`,
        payloads,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        dispatch(resetForm());
        navigate(
          `/manage/register-hotel/setup-hotel/multi-step-hotel/${idhotel}?token=${token}`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (formStateRoom) {
      form.setFieldsValue({
        nameroom: formStateRoom?.nameroom || "Phòng giường đôi",
        sotien: formStateRoom?.sotien
          ? formatCurrency(getFullValue(formStateRoom?.sotien, 85)).split(
              "₫"
            )[0]
          : "",
      });
      if (formStateRoom.sotien) {
        setTienNhan(formStateRoom?.sotien);
      }
    }
  }, [form]);
  return (
    <Space direction="vertical" style={{ padding: "40px 200px 0px 200px" }}>
      {/* Thanh tiến trình  */}
      <Row
        style={{
          position: "fixed",
          top: 64,
          right: 0,
          left: 0,
          display: "flex",
          zIndex: 2,
        }}
      >
        <Col span={6}>
          <div
            style={{ height: 8, backgroundColor: COLORS.BUTTON, width: "98%" }}
          ></div>
        </Col>
        <Col span={6}>
          <div
            style={{ height: 8, backgroundColor: COLORS.BUTTON, width: "98%" }}
          ></div>
        </Col>
        <Col span={6}>
          <div
            style={{ height: 8, backgroundColor: COLORS.BUTTON, width: "98%" }}
          ></div>
        </Col>
        <Col span={6}>
          <div
            style={{ height: 8, backgroundColor: COLORS.BUTTON, width: "100%" }}
          ></div>
        </Col>
      </Row>
      <h1 style={{ fontSize: 35 }}>Tên của phòng này là gì?</h1>
      <Space
        direction="vertical"
        style={{ width: 750, backgroundColor: "#fff", padding: 15 }}
      >
        <span>
          Đây là tên mà khách sẽ thấy trên trang chỗ nghỉ của Quý vị. Hãy chọn
          tên miêu tả phòng này chính xác nhất.
        </span>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item
            initialValue={"Phòng giường đôi"}
            name={"nameroom"}
            label={<span style={{ fontWeight: 500 }}>Tên phòng</span>}
          >
            <Select style={{ width: "100%" }}>
              {nameroom.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <h3 style={{ marginBottom: 10 }}>
            Thiết lập giá mỗi đêm cho phòng này
          </h3>
          <span style={{ fontWeight: 600, marginBottom: 10 }}>
            Quý vị muốn thu bao nhiêu tiền mỗi đêm?
          </span>
          <Form.Item
            initialValue={""}
            name={"sotien"}
            rules={[
              { required: true, message: "Nhập số tiền phòng của Quý vị." },
            ]}
            label={<span>Số tiền khách trả</span>}
          >
            <CurrencyInput
              styleprop={{ width: "100%" }}
              value={form.getFieldValue("sotien")} // Lấy giá trị từ Form
              onchange={(value) => {
                form.setFieldsValue({ sotien: value });
                setTienNhan(toPay(value));
              }}
            />
          </Form.Item>
          <Space
            style={{ margin: "0px 10px 10px 10px" }}
            size={1}
            direction="vertical"
          >
            <span>Bao gồm các loại thuế, phí và hoa hồng</span>
            <span>
              15,00%{" "}
              <span style={{ fontWeight: 500 }}>Hoa hồng cho {APP1.name}</span>
            </span>
            <span style={{ marginLeft: 30 }}>
              <CheckOutlined style={{ color: "#008234" }} /> Trợ giúp 24/7 bằng
              ngôn ngữ của Quý vị
            </span>
            <span style={{ marginLeft: 30 }}>
              <CheckOutlined style={{ color: "#008234" }} /> Tiết kiệm thời gian
              với đặt phòng được xác nhận tự động
            </span>
            <span style={{ marginLeft: 30 }}>
              <CheckOutlined style={{ color: "#008234" }} /> Chúng tôi sẽ quảng
              bá chỗ nghỉ của Quý vị trên Google
            </span>
            <Divider style={{ margin: "10px 0px 10px 0px" }} />
            {tiennhan && tiennhan !== 0 ? (
              <span>
                VND{" "}
                <span style={{ fontWeight: 500 }}>
                  {formatCurrency(tiennhan).split("₫")[0]}
                </span>{" "}
                Doanh thu của Quý vị (bao gồm thuế)
              </span>
            ) : (
              <div></div>
            )}
          </Space>
          <Form.Item>
            <Row>
              <Col span={3}>
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                  style={{ padding: 18 }}
                  icon={<LeftOutlined />}
                  block
                ></Button>
              </Col>
              <Col span={21}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: 10, padding: 18 }}
                  block
                >
                  Tiếp tục
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Space>
    </Space>
  );
}

export default NameRoom;
