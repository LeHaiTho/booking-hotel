import { Layout, Space } from "antd";
import { APP1, COLORS } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
interface Props{
    children: React.ReactNode;
}
function RegisterHotelLayout(prop:Props) {
    const {children} = prop;
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Lấy token đã lưu
    useEffect(()=>{
        // kiểm tra link hiện tại có phải đúng token không 
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get("token"); // Lấy token từ URL
        const storedToken = localStorage.getItem("token"); // Lấy token đã lưu

        if (!urlToken || urlToken !== storedToken) {
            navigate("/manage/sigin-manage"); // Nếu token không hợp lệ, chuyển về login
        }
    },[navigate])
    return ( 
        <Layout>
            <Layout.Header  style={{
                backgroundColor: COLORS.BACKGROUND, position:"fixed", top:0, left:0, right:0, zIndex:10
            }}>
                <Space style={{color:"#fff"}}>
                    <h1 onClick={()=>navigate(`/manage/home?token=${token}`)} style={{cursor:"pointer"}}>{APP1.name}</h1>
                </Space>
            </Layout.Header>
            <Layout.Content style={{marginTop:64}}>
                {children}
            </Layout.Content>
        </Layout>
     );
}

export default RegisterHotelLayout;