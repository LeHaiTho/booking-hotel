import { Tag } from "antd";
import "../../../pages/component/style.css";
import { useNavigate } from "react-router-dom";
interface Prop {
  idhotel?: number;
}
function CalendarPopupMenu(prop: Prop) {
  //lấy id của khách sạn truyền vào
  const { idhotel } = prop;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <div
      className="calendarpopupmenu"
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
        <li
          onClick={() =>
            navigate(`/manage/calendar-and-room/calendar?token=${token}`, {
              state: idhotel,
            })
          }
          style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}
        >
          Lịch
        </li>
        {/* <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Mở/Đóng phòng</li>
                <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Sao chép giá hàng năm <Tag color="#008009">Mới</Tag></li>
                <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Quy tắc giới hạn linh động <Tag color="#008009">Mới</Tag></li>
                <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Đồng bộ hóa lịch</li>
                <li onClick={()=>navigate(`/manage/calendar-and-room/price-room?token=${token}`)} style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Loại giá</li>
                <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Dịch vụ giá trị gia tăng <Tag color="#008009">Mới</Tag></li>
                <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Giá theo số lượng khách</li>
                <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Mức giá theo quốc gia <Tag color="#008009">Mới</Tag></li>
                <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Giá trên điện thoại <Tag color="#008009">Mới</Tag></li> */}
      </ul>
    </div>
  );
}

export default CalendarPopupMenu;
