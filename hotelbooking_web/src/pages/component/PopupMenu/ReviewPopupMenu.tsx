import { useNavigate } from "react-router-dom";

function ReviewPopupMenu() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <div
      className="reviewpopupmenu"
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
          style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}
          onClick={() => navigate("/manage/customer-rating?token=" + token)}
        >
          Đánh giá của khách
        </li>
        <li
          style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}
        >
          Trải nghiệm khách
        </li>
      </ul>
    </div>
  );
}

export default ReviewPopupMenu;
