import { Avatar, Badge, Button, Divider, Layout, Popover, Space } from "antd";
import { APP1, baseUrl, COLORS } from "../constants/constants";
import {
  svg_1,
  svg_10,
  svg_11,
  svg_12,
  svg_13,
  svg_14,
  svg_2,
  svg_3,
  svg_4,
  svg_5,
  svg_6,
  svg_7,
  svg_8,
  svg_9,
} from "../assets/svgs";
import "./index.css";
import { CopyOutlined, DownOutlined } from "@ant-design/icons";
import { ReactSVG } from "react-svg";
import { Input } from "antd";
import { UserActionsPopup } from "./components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AnalyzePopupMenu,
  BookingRoomPopupMenu,
  CalendarPopupMenu,
  FinancePopupMenu,
  MailboxPopupMenu,
  PerformancePopupMenu,
  PlaceToStayPopupMenu,
  PromotionalPopupMenu,
  ReviewPopupMenu,
} from "../pages/component/PopupMenu";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectHotelMn } from "../redux/selector";
import axios from "axios";
import { update } from "../redux/Slice/Hotels_Mn/hotelMnSlice";
interface Props {
  children: React.ReactNode;
}
function HomeLayout(prop: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const [IsOpenPopup, setIsOpenPopup] = useState(false);
  //Khách sạn được chọn
  const selectHotel = useSelector(selectHotelMn);
  console.log(selectHotel);
  //khách sạn đã hoàn thành đăng ký
  const [hotelRegister, setHotelRegister] = useState<any[]>([]);
  const { children } = prop;
  // lấy token lên để tránh copy link vào trang
  const token = localStorage.getItem("token");
  //lấy những khách sạn đã đăng ký sửa lại isRegister thành true
  const getAPIHotelRegister = async () => {
    try {
      if (auth) {
        const res = await axios.post(
          `${baseUrl}hotel-properties/hotel/register-isboolean/${auth?.id}`,
          { isRegister: false },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHotelRegister(res.data);
        //mặc định
        dispatch(update(res.data[0]));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAPIHotelRegister();
  }, [auth]);
  useEffect(() => {
    // kiểm tra link hiện tại có phải đúng token không
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token"); // Lấy token từ URL
    const storedToken = localStorage.getItem("token"); // Lấy token đã lưu

    if (!urlToken || urlToken !== storedToken) {
      navigate("/manage/sigin-manage"); // Nếu token không hợp lệ, chuyển về login
    }
  }, [navigate]);
  return (
    <Layout>
      <Layout.Header
        style={{
          backgroundColor: COLORS.BACKGROUND,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          color: "#fff",
          height: 144,
          width: "100%", // Đảm bảo phủ kín chiều ngang
        }}
      >
        {/* part 1 */}
        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Space
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>{APP1.name}</h1>
            <Popover
              open={IsOpenPopup}
              arrow={false}
              placement="bottomLeft"
              trigger={"click"}
              title={
                <Space direction="vertical" size={1} style={{ minWidth: 300 }}>
                  <span>{`${auth?.lastname} ${auth?.firstname}`}</span>
                  <span
                    style={{
                      border: "1px solid #6b6b6b",
                      padding: 3,
                      color: "#6b6b6b",
                      fontSize: 12,
                      fontWeight: 400,
                    }}
                  >
                    ID pháp nhân: {auth?.id}
                  </span>
                </Space>
              }
              content={
                <Space
                  size={1}
                  direction="vertical"
                  style={{ display: "flex", paddingBottom: 10 }}
                >
                  {hotelRegister ? (
                    hotelRegister.map((item: any) => {
                      return (
                        <div
                          key={item?.id}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            dispatch(update(item));
                            setIsOpenPopup(false);
                          }}
                        >
                          <Divider style={{ margin: "5px 0px 5px 0px" }} />
                          <Space
                            className="item-hotel-menu"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: 3,
                            }}
                          >
                            <Space
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Avatar
                                alt="image"
                                shape="square"
                                src={
                                  item?.images
                                    ? `${baseUrl}hotel-properties/hotel/get-image/${
                                        item?.id
                                      }/${item?.images?.split(",")[0]}`
                                    : `https://www.hotellinksolutions.com/images/blog/cac-nguon-booking-khach-san.jpg`
                                }
                                size={"large"}
                              />
                              <Space size={1} direction="vertical">
                                <span style={{ fontWeight: "bold" }}>
                                  {item?.name}
                                </span>
                                <span
                                  style={{
                                    border: "1px solid #6b6b6b",
                                    padding: 3,
                                    color: "#6b6b6b",
                                    fontSize: 12,
                                    fontWeight: 400,
                                  }}
                                >{`${item?.id}-1234213`}</span>
                              </Space>
                            </Space>
                            <CopyOutlined
                              style={{ fontSize: 16, color: "#6b6b6b" }}
                            />
                          </Space>
                        </div>
                      );
                    })
                  ) : (
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "#cecece",
                      }}
                    >
                      Danh sách trống
                    </span>
                  )}
                </Space>
              }
              onOpenChange={setIsOpenPopup}
            >
              <Space
                className="group-hover"
                onClick={() => setIsOpenPopup(true)}
                direction="horizontal"
                style={{
                  padding: "0px 3px 0px 3px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectHotel ? (
                  <div>
                    <span
                      style={{ textTransform: "uppercase", fontWeight: 500 }}
                    >
                      {selectHotel?.name}{" "}
                    </span>
                    <span
                      style={{
                        border: "0.5px solid #fff",
                        padding: 3,
                        fontWeight: 600,
                      }}
                    >{`${selectHotel?.id}-1234213`}</span>
                  </div>
                ) : (
                  <div>
                    <span>Việt Anh</span>
                    <span
                      style={{
                        border: "0.5px solid #fff",
                        padding: 3,
                        fontWeight: 600,
                      }}
                    >
                      12348769
                    </span>
                  </div>
                )}
                <ReactSVG src={svg_1} />
              </Space>
            </Popover>
            <ReactSVG src={svg_2} />
          </Space>
          <Space
            size={"large"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input.Search
                size="large"
                placeholder="Tìm trang và đơn đặt phòng"
                allowClear
                style={{ width: 300 }}
              />
            </div>
            <Space size={"large"}>
              <ReactSVG src={svg_13} />
              <UserActionsPopup>
                <ReactSVG style={{ cursor: "pointer" }} src={svg_14} />
              </UserActionsPopup>
            </Space>
          </Space>
        </Space>
        {/* part 2  */}
        <Space
          direction="horizontal"
          size={"small"}
          style={{
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div
            className="group-hover-home"
            onClick={() => {
              navigate(`/manage/home?token=${token}`);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 5px 15px 5px",
              margin: 0,
            }}
          >
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <ReactSVG src={svg_3} />
            </div>
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <span>Trang chủ</span>
            </div>
          </div>

          <div
            className="group-hover-home calendar-menu"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 5px 15px 5px",
              margin: 0,
              position: "relative",
            }}
          >
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <Badge color="#cc0000" size={"small"} count={5}>
                <ReactSVG src={svg_4} />
              </Badge>{" "}
            </div>
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <span>
                Giá & Tình trạng phòng trống{" "}
                <DownOutlined style={{ fontSize: 10 }} />
              </span>
            </div>
            <CalendarPopupMenu idhotel={selectHotel?.id} />
          </div>
          <div
            className="group-hover-home promotional-menu"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 5px 15px 5px",
              margin: 0,
              position: "relative",
            }}
          >
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <ReactSVG src={svg_5} />
            </div>
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <span>
                Chương trình khuyến mãi{" "}
                <DownOutlined style={{ fontSize: 10 }} />
              </span>
            </div>
            <PromotionalPopupMenu />
          </div>
          {/* <div
            className="group-hover-home bookingroompopupmenu"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 5px 15px 5px",
              margin: 0,
            }}
          >
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <ReactSVG src={svg_6} />
            </div>
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <span>Đặt phòng</span>
              <DownOutlined style={{ fontSize: 10 }} />
            </div>
            <BookingRoomPopupMenu />
          </div> */}
          <div
            className="group-hover-home placetostay-menu"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 5px 15px 5px",
              margin: 0,
              position: "relative",
            }}
          >
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <Badge color="#cc0000" size={"small"} count={5}>
                <ReactSVG src={svg_7} />
              </Badge>{" "}
            </div>
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <span>
                Chỗ nghỉ <DownOutlined style={{ fontSize: 10 }} />
              </span>
            </div>
            <PlaceToStayPopupMenu idhotel={selectHotel?.id} />
          </div>
          {/* <div
            className="group-hover-home performance-menu"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 5px 15px 5px",
              margin: 0,
              position: "relative",
            }}
          >
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <Badge color="#cc0000" size={"small"} count={5}>
                <ReactSVG src={svg_8} />
              </Badge>{" "}
            </div>
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <span>
                Thúc đẩy hiệu suất <DownOutlined style={{ fontSize: 10 }} />
              </span>
            </div>
            <PerformancePopupMenu />
          </div>
          <div
            className="group-hover-home mailbox-menu"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 5px 15px 5px",
              margin: 0,
              position: "relative",
            }}
          >
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <ReactSVG src={svg_9} />
            </div>
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <span>
                Hộp thư <DownOutlined style={{ fontSize: 10 }} />
              </span>
            </div>
            <MailboxPopupMenu />
          </div> */}
          <div
            className="group-hover-home review-menu"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 5px 15px 5px",
              margin: 0,
              position: "relative",
            }}
          >
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <ReactSVG src={svg_10} />
            </div>
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <span>
                Đánh giá của khách <DownOutlined style={{ fontSize: 10 }} />
              </span>
            </div>
            <ReviewPopupMenu />
          </div>
          <div
            className="group-hover-home finance-menu"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 5px 15px 5px",
              margin: 0,
              position: "relative",
            }}
          >
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <ReactSVG src={svg_11} />
            </div>
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <span>
                Lịch đặt phòng <DownOutlined style={{ fontSize: 10 }} />
              </span>
            </div>
            <FinancePopupMenu />
          </div>
          <div
            className="group-hover-home analyze-menu"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 5px 15px 5px",
              margin: 0,
              position: "relative",
            }}
          >
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <ReactSVG src={svg_12} />
            </div>
            <div style={{ height: 30, padding: 0, margin: 0 }}>
              <span>
                Phân tích <DownOutlined style={{ fontSize: 10 }} />
              </span>
            </div>
            <AnalyzePopupMenu />
          </div>
        </Space>
      </Layout.Header>
      <Layout.Content style={{ marginTop: 144 }}>{children}</Layout.Content>
      <Layout.Footer
        style={{
          backgroundColor: COLORS.BACKGROUND,
        }}
      >
        <Space direction="vertical" style={{ display: "flex" }}>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Space size={"large"}>
              <a href="#" style={{ color: "#fff" }}>
                Giới thiệu về chúng tôi
              </a>
              <a href="#" style={{ color: "#fff" }}>
                Chính sách Bảo mật và Cookie
              </a>
              <a href="#" style={{ color: "#fff" }}>
                Các Câu Hỏi Thường Gặp
              </a>
            </Space>
            <Space size={"large"}>
              <Button
                type="primary"
                style={{ backgroundColor: COLORS.BUTTON, padding: 16 }}
                onClick={() => {
                  navigate(`/manage/register-hotel/type?token=${token}`);
                }}
              >
                Thêm chỗ nghỉ mới
              </Button>
              <Button
                type="primary"
                style={{ backgroundColor: COLORS.BUTTON, padding: 16 }}
              >
                Chia sẻ góp ý của Quý vị
              </Button>
            </Space>
          </Space>
          <Divider />
          <span style={{ color: "#fff" }}>© Bản quyền {APP1.name} 2025</span>
        </Space>
      </Layout.Footer>
    </Layout>
  );
}
export default HomeLayout;
