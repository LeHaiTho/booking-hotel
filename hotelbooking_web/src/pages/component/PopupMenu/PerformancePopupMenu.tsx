import { Tag } from "antd";

function PerformancePopupMenu() {
    return ( 
        <div className="performancepopupmenu" style={{marginTop:5,position:"absolute", top:"100%", left:0, color:"#000",
           backgroundColor:"#fff", display:"none"
        }}>
           <ul style={{ padding: 0, margin: "0px 0px 5px 0px", listStyle: "none", width:250, 
               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
           }}>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Trung tâm cơ hội</li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Chương trình đối tác Genius <Tag color="#008009">Mới</Tag></li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Chương trình đối tác ưu tiên</li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Bộ công cụ Lưu trú dài ngày</li>
               <li style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Công cụ thúc đẩy sự hiện diện</li>
           </ul>
        </div>
    );
}

export default PerformancePopupMenu;