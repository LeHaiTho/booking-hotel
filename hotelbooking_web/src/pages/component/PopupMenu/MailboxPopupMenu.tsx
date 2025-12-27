
import "../../../pages/component/style.css"
import { useNavigate } from "react-router-dom";
import { APP1 } from "../../../constants/constants";
function MailboxPopupMenu() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    return ( 
         <div className="mailboxpopupmenu" style={{marginTop:5,position:"absolute", top:"100%", left:0, color:"#000",
            backgroundColor:"#fff", display:"none"
         }}>
            <ul style={{ padding: 0, margin: "0px 0px 5px 0px", listStyle: "none", width:250, 
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
            }}>
                <li onClick={()=>navigate(`/manage/mail-box-room/booking-message?token=${token}`)} style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Tin nhắn về đặt phòng</li>
                <li onClick={()=>navigate(`/manage/mail-box-room/admin-message?token=${token}`)} style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Tin nhắn từ {APP1.name}</li>
                <li onClick={()=>navigate(`/manage/mail-box-room/customer-faqs-message?token=${token}`)}  style={{ padding: "10px 10px", lineHeight: "1.4", fontSize: "14px" }}>Hỏi đáp cho khách</li>
            </ul>
         </div>
     );
}

export default MailboxPopupMenu;