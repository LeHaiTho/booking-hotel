import { Button, Col, Row, Space } from "antd";
import img_type_hotels from "../../../../assets/images/img_typehotel";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../../../constants/constants";

function TypeHotel_P4() {
    // lấy token lên để tránh copy link vào trang 
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    return ( 
        <Space direction="vertical" style={{display:"flex",height:"100vh",marginTop:-64,backgroundColor:"#f9f9fa"}}>
            {/* Thanh tiến trình  */}
            <Row style={{position:"fixed", top:64, right:0, left:0, display:"flex"}}>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"100%"}}></div>
                </Col>
            </Row>
            <Space direction="vertical" style={{justifyContent:"space-around", fontSize:16,
                width:466, height:486,padding:16,margin:"144px 200px 0px 200px", backgroundColor:"#fff"}}>
                <Space size={"large"} direction="vertical" style={{display:"flex",alignItems:"center", textAlign:"center"}}>
                    <span>Quý vị đăng đăng:</span>
                    <img src={img_type_hotels.hotles_main} height={75} width={75} alt="hotel" />
                    <h1>Một khách sạn nơi khách có thể đặt phòng</h1>
                </Space>
                <Space size={"middle"} direction="vertical" style={{display:"flex", textAlign:"center"}}>
                    <span>Quý vị thấy có đúng như chỗ nghỉ của mình không?</span>
                    <Button onClick={()=>{navigate(`/manage/register-hotel/setup-hotel/location-hotel?token=${token}`)}} type="primary" style={{width:"100%", padding:18}}>Tiếp tục</Button>
                    <Button 
                    onClick={()=>{navigate('/manage/register-hotel/type')}} 
                    style={{width:"100%", padding:18}}>Không, tôi cần thay đổi</Button>
                </Space>
            </Space>
        </Space>
     );
}

export default TypeHotel_P4;