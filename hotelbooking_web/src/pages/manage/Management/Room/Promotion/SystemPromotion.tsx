// import { Card, Row, Col, Typography, Button, Divider, Tag, Space } from "antd";
// import { GiftOutlined, MobileOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// const { Title, Text } = Typography;

// const promotions: any = [
//   {
//     category: "Chiến dịch",
//     items: [
//       {
//         icon: <GiftOutlined style={{ fontSize: 32, color: "#1890ff" }} />,
//         title: "Ưu Đãi Mùa Du Lịch",
//         description: "Gửi đi giảm giá 25% hoặc hơn",
//         tags: ["Hiệu quả", "Tăng tỉ lệ suất marketing"],
//         bookingPeriod: "Ngày 16 Tháng 3 Năm 2021 – Ngày 30 Tháng 9 Năm 2021",
//         stayPeriod: "Ngày 1 Tháng 4 Năm 2021 – Ngày 30 Tháng 9 Năm 2021",
//         notes:
//           "Lên kế hoạch trước và thu hút khách bằng cách giảm giá lưu trú đến ngày 30 tháng 9. Cơ hội của Quý vị sẽ được tăng hiệu quả tiếp thị và hiển thị rộng rãi.",
//       },
//     ],
//   },
//   {
//     category: "Nhắm theo thị trường",
//     items: [
//       {
//         icon: <MobileOutlined style={{ fontSize: 32, color: "#1890ff" }} />,
//         title: "Giá trên điện thoại",
//         description: "Giảm giá 10% và hơn nữa",
//         tags: ["Hãy hữu"],
//         notes:
//           "Linh hoạt động (có thể không áp dụng nếu lưu trú lên đến 30 ngày mới mở) – Tăng khả năng chuyển đổi cho khách trên điện thoại.",
//       },
//     ],
//   },
// ];

// const SystemPromotion = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   return (
//     <div style={{ padding: 24 }}>
//       <Title level={4}>Chọn khuyến mãi mới</Title>

//       {promotions.map((group: any, index: any) => (
//         <div key={index} style={{ marginBottom: 32 }}>
//           <Title level={5}>{group.category}</Title>

//           <Row gutter={[16, 16]}>
//             {group.items.map((promo: any, idx: any) => (
//               <Col span={24} key={idx}>
//                 <Card>
//                   <Row gutter={16}>
//                     <Col flex="40px">{promo.icon}</Col>
//                     <Col flex="auto">
//                       <Space direction="vertical" style={{ width: "100%" }}>
//                         <div>
//                           <Text strong>{promo.title}</Text>
//                           <br />
//                           <Text type="secondary">{promo.description}</Text>
//                         </div>

//                         <div>
//                           {promo.tags.map((tag: any, i: any) => (
//                             <Tag key={i} color="blue">
//                               {tag}
//                             </Tag>
//                           ))}
//                         </div>

//                         {promo.bookingPeriod && (
//                           <Text>
//                             <strong>Thời gian đặt:</strong>{" "}
//                             {promo.bookingPeriod}
//                           </Text>
//                         )}
//                         {promo.stayPeriod && (
//                           <Text>
//                             <strong>Ngày lưu trú:</strong> {promo.stayPeriod}
//                           </Text>
//                         )}
//                         <Text type="secondary">{promo.notes}</Text>
//                       </Space>
//                     </Col>
//                     <Col>
//                       <Button
//                         type="primary"
//                         onClick={() =>
//                           navigate(`/manage/new-promotion?token=${token}`)
//                         }
//                       >
//                         Thêm khuyến mãi
//                       </Button>
//                     </Col>
//                   </Row>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           {index < promotions.length - 1 && <Divider />}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SystemPromotion;

import { Card, Row, Col, Typography, Button, Divider, Tag, Space } from "antd";
import { GiftOutlined, MobileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
const { Title, Text } = Typography;

const SystemPromotion = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [promotions, setPromotions] = useState<any[]>([]);

  const fetchPromotions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/promotion?systemOnly=true",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const apiPromotions = res.data.promotions;
      console.log(apiPromotions, "groupedPromotions");

      // Group promotions into categories
      const groupedPromotions = [
        {
          category: "Chiến dịch",
          items: apiPromotions
            .filter(
              (promo: any) => promo.start_date && promo.end_date // Seasonal promotions with specific dates
            )
            .map((promo: any) => ({
              icon: <GiftOutlined style={{ fontSize: 32, color: "#1890ff" }} />,
              title: promo.name,
              id: promo.id,
              start_date: promo?.start_date,
              end_date: promo?.end_date,
              discount_value: promo?.discount_value,
              min_stay: promo?.min_stay,
              is_active: promo?.is_active,
              description: promo?.description,
              tags: ["Hiệu quả", "Tăng tỉ lệ suất marketing"],
              bookingPeriod: promo.booking_days_in_advance
                ? `Đặt trước ${promo.booking_days_in_advance} ngày`
                : "Không giới hạn",
              stayPeriod: promo.start_date
                ? `${dayjs(promo.start_date).format("DD MMMM YYYY")} – ${dayjs(
                    promo.end_date
                  ).format("DD MMMM YYYY")}`
                : "Không giới hạn",
              notes: `Giảm ${promo.discount_value}% cho lưu trú tối thiểu ${
                promo.min_stay
              } ngày. Khuyến mãi ${
                promo.is_active ? "đang hoạt động" : "đã hết hạn"
              }.`,
            })),
        },
        {
          category: "Nhắm theo thị trường",
          items: apiPromotions
            .filter((promo: any) => !promo.start_date || !promo.end_date) // Non-seasonal or mobile-specific
            .map((promo: any) => ({
              icon: (
                <MobileOutlined style={{ fontSize: 32, color: "#1890ff" }} />
              ),
              title: promo.name,
              id: promo.id,
              start_date: promo?.start_date,
              end_date: promo?.end_date,
              discount_value: promo?.discount_value,
              min_stay: promo?.min_stay,
              is_active: promo?.is_active,
              description: promo?.description,
              tags: ["Hữu ích"],
              notes: `Giảm ${promo.discount_value}% cho lưu trú tối thiểu ${
                promo.min_stay
              } ngày. Khuyến mãi ${
                promo.is_active ? "đang hoạt động" : "đã hết hạn"
              }.`,
            })),
        },
      ].filter((group) => group.items.length > 0); // Only include categories with items

      setPromotions(groupedPromotions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);
  console.log(promotions, "promotions");
  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>Chọn khuyến mãi mới</Title>

      {promotions.map((group: any, index: any) => (
        <div key={index} style={{ marginBottom: 32 }}>
          <Title level={5}>{group.category}</Title>

          <Row gutter={[16, 16]}>
            {group.items.map((promo: any, idx: any) => (
              <Col span={24} key={idx}>
                <Card>
                  <Row gutter={16}>
                    <Col flex="40px">{promo.icon}</Col>
                    <Col flex="auto">
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <div>
                          <Text strong>{promo.title}</Text>
                          <br />
                          <Text type="secondary">{promo.description}</Text>
                        </div>

                        <div>
                          {promo.tags.map((tag: any, i: any) => (
                            <Tag key={i} color="blue">
                              {tag}
                            </Tag>
                          ))}
                        </div>

                        {promo.bookingPeriod && (
                          <Text>
                            <strong>Thời gian đặt:</strong>{" "}
                            {promo.bookingPeriod}
                          </Text>
                        )}
                        {promo.stayPeriod && (
                          <Text>
                            <strong>Ngày lưu trú:</strong> {promo.stayPeriod}
                          </Text>
                        )}
                        <Text type="secondary">{promo.notes}</Text>
                      </Space>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        onClick={() => {
                          console.log("promo", promo);
                          navigate(`/manage/new-promotion?token=${token}`, {
                            state: {
                              promotionTitle: promo.title,
                              promotionStartDate: promo.start_date,
                              promotionEndDate: promo.end_date,
                              promotionDiscount: promo.discount_value,
                            },
                          });
                        }}
                      >
                        Thêm khuyến mãi
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>

          {index < promotions.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
};

export default SystemPromotion;
