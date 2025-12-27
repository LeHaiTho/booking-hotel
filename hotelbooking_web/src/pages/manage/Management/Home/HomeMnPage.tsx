import { Button, Col, Divider, Row, Space } from "antd";
import { APP1, baseUrl, COLORS } from "../../../../constants/constants";
import { ArrowDownOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../redux/selector";

function HomeMnPage() {
    const navigate = useNavigate();
    const auth = useSelector(selectAuth)
    //khách sạn chưa hoàn thành đăng ký
    const [hotelRegister, setHotelRegister] = useState<any[]>([]);

    // lấy token lên để tránh copy link vào trang 
    const token = localStorage.getItem('token');
    const getAPIHotelRegister = async () => {
        try{
            if(auth){
                const res = await axios.post(`${baseUrl}hotel-properties/hotel/register-isboolean/${auth?.id}`,{isRegister: false}, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setHotelRegister(res.data);
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getAPIHotelRegister();
    },[auth])
    return ( 
        <Space direction="vertical" style={{display:"flex", backgroundColor:"#f2f2f2", padding:"50px 100px 100px 100px"}}>
            <Space style={{display:"flex",justifyContent:"space-between"}}>
                <h1>Trang chủ Nhóm chỗ nghỉ</h1>
                <Button onClick={()=>{navigate(`/manage/register-hotel/type?token=${token}`)}}
                style={{backgroundColor:COLORS.BUTTON, padding:18}} type="primary">Thêm chỗ nghỉ mới</Button>
            </Space>
            <h2 style={{marginTop:40}}>Chỗ nghỉ chưa có trên {APP1.name} (1)</h2>
            <span>Phát triển kinh doanh bằng cách thêm các chỗ nghỉ này vào nền tảng du lịch trực tuyến lớn nhất thế giới, {APP1.name}.</span>
            <Space direction="vertical" size={1} style={{backgroundColor:"#fff",marginTop:10, display:"flex"}}>
                <Row gutter={10} style={{ padding:"5px 10px 5px 20px"}}>
                    <Col style={{fontWeight:600}} span={6}>Tên <ArrowDownOutlined /></Col>
                    <Col style={{fontWeight:600}} span={4}>Vị trí</Col>
                    <Col style={{fontWeight:600}} span={6}>Tiến trình đăng ký</Col>
                    <Col style={{fontWeight:600, paddingLeft:15}} span={8}>Hành động</Col>
                    <Divider style={{margin:"5px 0px 0px 0px"}} />
                </Row>
                {
                    hotelRegister && hotelRegister.map((item:any)=>{
                        return (
                            <Row key={item?.id} gutter={10} style={{ padding:20, display:"flex", alignItems:"center"}}>
                                <Col style={{fontWeight:600}} span={6}>{item?.name}</Col>
                                <Col style={{fontWeight:600}} span={4}>{item?.country}</Col>
                                <Col style={{fontWeight:600}} span={6}>Tiến trình đăng ký</Col>
                                <Col style={{fontWeight:600}} span={8}>
                                    <Space>
                                        <Button style={{color:COLORS.BACKGROUND}} onClick={()=>navigate(`/manage/register-hotel/setup-hotel/multi-step-hotel/${item?.id}?token=${token}`)}
                                        type="link">Tiếp tục đăng ký</Button>
                                        <Button danger icon={<DeleteOutlined />} type="link">Xóa</Button>
                                    </Space>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Space>
        </Space>
     );
}

export default HomeMnPage;