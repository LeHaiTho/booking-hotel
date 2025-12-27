import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
interface Prop {
  idhotel?: number;
}
function PlaceToStayPopupMenu(prop: Prop) {
  const { idhotel } = prop;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div
      className="placetostaypopupmenu"
      style={{
        marginTop: 5,
        position: "absolute",
        top: "100%",
        left: 0,
        color: "#000",
        backgroundColor: "#fff",
        display: "none",
      }}
    >
      <ul
        style={{
          padding: 0,
          margin: "0px 0px 5px 0px",
          listStyle: "none",
          width: 250,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Điểm trang chỗ nghỉ</li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Thông tin chung & trạng thái chỗ nghỉ</li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Phí/thuế/thuế GTGT</li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Hình ảnh</li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Chính sách</li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Tiện nghi và dịch vụ</li> */}
        <li
          onClick={() =>
            navigate(
              `/manage/place-to-stay-room/detail-room-u?token=${token}`,
              { state: idhotel }
            )
          }
          style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}
        >
          Chi tiết phòng
        </li>
        {/* <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Tiện nghi phòng</li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Hồ sơ của Quý vị</li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Xem mô tả chỗ nghỉ</li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Tùy chọn tính năng nhắn tin</li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Tính bền vững <Tag color="#008009">Mới</Tag></li> */}
      </ul>
    </div>
  );
}

export default PlaceToStayPopupMenu;
