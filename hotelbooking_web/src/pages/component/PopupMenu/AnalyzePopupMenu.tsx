import { Tag } from "antd";
import { useNavigate } from "react-router-dom";

function AnalyzePopupMenu() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <div
      className="analyzepopupmenu"
      style={{
        marginTop: 5,
        position: "absolute",
        top: "100%",
        right: 0,
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
          style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}
          onClick={() => {
            navigate(`/manage/dashboard?token=${token}`);
          }}
        >
          Dashboard phân tích
        </li>
        {/* <li
          style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}
        >
          Báo cáo pace và đơn đặt <Tag color="#008009">Mới</Tag>
        </li>
        <li
          style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}
        >
          Thống kê doanh số bán hàng
        </li>
        <li
          style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}
        >
          Phân tích chuyên sâu về khách đặt phòng
        </li>
        <li
          style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}
        >
          Đặc điểm các đơn hủy đặt phòng
        </li>
        <li
          style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}
        >
          Quản lý nhóm đối thủ cạnh tranh của Quý vị
        </li>
        <li
          style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}
        >
          Dashboard thứ hạng
        </li>
        <li
          style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}
        >
          Dashboard hiệu suất
        </li> */}
      </ul>
    </div>
  );
}

export default AnalyzePopupMenu;
