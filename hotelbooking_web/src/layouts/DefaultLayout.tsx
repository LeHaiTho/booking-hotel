import { Button, Layout, Space } from "antd";
import {COLORS, APP1} from "../constants/constants";
import "./index.css"
import { useNavigate } from "react-router-dom";
// import { Outlet } from "react-router-dom";
//Định nghĩa prop
interface Props {
    children?: React.ReactNode;
}
function DefaultLayout(prop: Props) {
    const navigate = useNavigate();
    const {children} = prop;
    return ( 
        
        <Layout>
            <Layout.Header style={{
                backgroundColor: COLORS.BACKGROUND, position:"fixed", top:0, left:0, right:0, zIndex:1
            }}>
                <Space direction="horizontal" style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center", color:"#fff"
                }}>
                    <Space direction="horizontal">
                        <h2 style={{cursor:"pointer"}} onClick={()=>navigate('/')}>{APP1.name}</h2>
                        <span onClick={()=>navigate('/')} style={{fontSize:14, color:"#aabedc", cursor:"pointer"}}>Trung tâm đối tác liên kết</span>
                    </Space>
                    <Space>
                        <Button type="default" style={{color:COLORS.BUTTON,fontWeight:500, padding:18}}
                        onClick={()=>navigate('/manage/register')}
                        >Đăng ký</Button>
                        <Button type="primary" style={{color:"#fff",fontWeight:600, padding:18, backgroundColor:COLORS.BUTTON}}
                        onClick={()=>navigate('/manage/sigin-manage')}>Đăng nhập</Button>
                    </Space>
                </Space>
            </Layout.Header>
            <Layout.Content style={{marginTop:64}}>
                {/* Hiện thị nội dung được truyền vào */}
                {children}
                {/* <Outlet /> */}
            </Layout.Content>
        </Layout>
     );
}

export default DefaultLayout;