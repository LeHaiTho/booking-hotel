import { Modal, Typography, Row, Col, Divider, Button, message } from "antd";
import dayjs from "dayjs";
import { baseUrl } from "../../constants/constants";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const PromotionOverviewModal = ({
  open,
  onClose,
  promotionD,
  onSuccess,
}: any) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log("promotionD", promotionD);

  const promotionDetails = [
    {
      label: "Thông tin chi tiết về khuyến mãi",
      value: promotionD?.name,
    },
    {
      label: "Loại giá và phòng",
      value: "Tất cả loại giá (phòng) được đặt từ tất cả loại giá đã chọn",
    },
    {
      label: "Thời gian áp dụng",
      value: promotionD?.start_date
        ? `${dayjs(promotionD?.start_date).format("DD MMMM YYYY")} – ${dayjs(
            promotionD?.end_date
          ).format("DD MMMM YYYY")}`
        : "Không giới hạn",
    },
    // {
    //   label: "Thời gian đặt",
    //   value: "Ngày 16 Tháng 3 Năm 2021 – Ngày 30 Tháng 9 Năm 2021",
    // },
    {
      label: "Tên khuyến mãi",
      value: promotionD?.name,
    },
  ];

  const handleActivatePromotion = async () => {
    try {
      const promotionData = {
        name: promotionD?.name,
        description: promotionD?.description,
        discountType: promotionD?.discount_type,
        discountValue: promotionD?.discount_value,
        startDate: promotionD?.start_date,
        endDate: promotionD?.end_date,
        minStay: promotionD?.min_stay,
        ids_room: promotionD?.roomIds,
        id_hotel: promotionD?.id_hotel,
      };
      setIsLoading(true);
      console.log(promotionData);
      const res = await axios.post(
        `http://localhost:5000/promotion/apply`,
        promotionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201) {
        message.success("Khuyến mãi đã được kích hoạt");
        onClose();

        // Gọi callback onSuccess nếu được cung cấp
        if (typeof onSuccess === "function") {
          onSuccess();
        }

        // Chuyển hướng về trang danh sách khuyến mãi
        navigate(`/manage/promotion-list?token=${token}`);
      }
    } catch (error) {
      console.error("Lỗi khi kích hoạt khuyến mãi:", error);
      message.error("Có lỗi xảy ra khi kích hoạt khuyến mãi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Tổng quan về Ưu Đãi Mùa Du Lịch"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Quay lại
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleActivatePromotion}
          loading={isLoading}
        >
          Kích hoạt
        </Button>,
      ]}
      width={700}
    >
      <Text>
        Sau khi Quý vị nhập vào kích hoạt, khách trên MNMQ.com sẽ thấy được
        khuyến mãi này. Quý vị có thể chỉnh sửa bất cứ chi tiết nào ở đây hoặc
        trên trang "Khuyến mãi".
      </Text>

      <Divider />

      {promotionDetails.map((item, index) => (
        <Row
          key={index}
          justify="space-between"
          style={{ padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}
        >
          <Col span={10}>
            <Text strong>{item.label}</Text>
          </Col>
          <Col span={10}>
            <Text>{item.value}</Text>
          </Col>
          {/* <Col>
            <a href="#">Chỉnh sửa</a>
          </Col> */}
        </Row>
      ))}
    </Modal>
  );
};

export default PromotionOverviewModal;
