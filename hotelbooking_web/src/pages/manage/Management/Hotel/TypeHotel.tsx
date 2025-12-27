import { Button, Col, Row, Space } from "antd";
import { APP1, COLORS } from "../../../../constants/constants";
import img_type_hotels from "../../../../assets/images/img_typehotel";
import { useNavigate } from "react-router-dom";

function TypeHotel() {
    const navigate = useNavigate();
    // lấy token lên để tránh copy link vào trang 
    const token = localStorage.getItem('token');
    return (  
        <Space direction="vertical" style={{display:"flex",padding:"144px 200px 80px 200px",backgroundColor:"#f9f9fa",marginTop:-64,height:"100vh"}}>
            {/* Thanh tiến trình  */}
            <Row style={{position:"fixed", top:64, right:0, left:0, display:"flex"}}>
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
            <h1 style={{fontSize:35}}>Đăng chỗ nghỉ của Quý vị trên {APP1.name} và bắt đầu đón tiếp khách thật nhanh chóng!</h1>
            <span style={{fontSize:20}}>Để bắt đầu, chọn loại chỗ nghỉ Quý vị muốn đăng trên {APP1.name}</span>
            <Space style={{marginTop:20}} size={"large"}>
            <Space direction="vertical" style={{
                    backgroundColor:"#fff",width:218, height:220,padding:"8px 16px", alignItems:"center",
                    justifyContent:"space-between", border:"0.5px solid #cecece"
                }}>
                    <Space direction="vertical" style={{alignItems:"center", textAlign:"center"}}>
                        <img height={50} width={50} src={img_type_hotels.hotles_main} alt="hihi" />
                        <span style={{fontWeight:"bold"}}>Khách sạn, nhà nghỉ B&B hay tương tự</span>
                        <span>Các chỗ nghỉ như khách sạn, nhà nghỉ B&B, nhà khách, hostel, khách sạn căn hộ, v.v.</span>
                    </Space>
                    <Space>
                        <Button onClick={()=>{navigate(`/manage/register-hotel/type-part-2/?token=${token}`);}} type="primary" style={{width:200}}>Đăng chỗ nghỉ</Button>
                    </Space>
                </Space>

                <Space direction="vertical" style={{
                    backgroundColor:"#fff",width:218, height:220,padding:"8px 16px", alignItems:"center",
                    justifyContent:"space-between", border:"0.5px solid #cecece"
                }}>
                    <Space direction="vertical" style={{alignItems:"center", textAlign:"center"}}>
                        <img height={50} width={50} src={img_type_hotels.one_apt_main} alt="hihi" />
                        <span style={{fontWeight:"bold"}}>Căn hộ</span>
                        <span>Chỗ nghỉ tự nấu nướng, đầy đủ nội thất mà khách thuê nguyên căn.</span>
                    </Space>
                    <Space>
                        <Button type="primary" style={{width:200}}>Đăng chỗ nghỉ</Button>
                    </Space>
                </Space>

                <Space direction="vertical" style={{
                    backgroundColor:"#fff",width:218, height:220,padding:"8px 16px", alignItems:"center",
                    justifyContent:"space-between", border:"0.5px solid #cecece"
                }}>
                    <Space direction="vertical" style={{alignItems:"center", textAlign:"center"}}>
                        <img height={50} width={50} src={img_type_hotels.home_main} alt="hihi" />
                        <span style={{fontWeight:"bold"}}>Nhà</span>
                        <span>Các chỗ nghỉ như căn hộ, nhà nghỉ dưỡng, biệt thự, v.v.</span>
                    </Space>
                    <Space>
                        <Button type="primary" style={{width:200}}>Đăng chỗ nghỉ</Button>
                    </Space>
                </Space>

                
                <Space direction="vertical" style={{
                    backgroundColor:"#fff",width:218, height:220,padding:"8px 16px", alignItems:"center",
                    justifyContent:"space-between", border:"0.5px solid #cecece"
                }}>
                    <Space direction="vertical" style={{alignItems:"center", textAlign:"center"}}>
                        <img height={50} width={50} src={img_type_hotels.tent_big} alt="hihi" />
                        <span style={{fontWeight:"bold"}}>Các loại chỗ nghỉ khác</span>
                        <span>Các chỗ nghỉ như tàu thuyền, khu cắm trại, lều trại sang trọng, v.v.</span>
                    </Space>
                    <Space>
                        <Button type="primary" style={{width:200}}>Đăng chỗ nghỉ</Button>
                    </Space>
                </Space>
            </Space>
        </Space>
    );
}

export default TypeHotel;