import { Button, Col, Input, Row, Space } from "antd";
import img_type_hotels from "../../../../assets/images/img_typehotel";
import {CheckCircleOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../../../constants/constants";
import { useState } from "react";
import "./StyleHotel.css"
function TypeHotel_P3() {
    const navigate = useNavigate();
    const [selectitemid, setSelectitemid] = useState("motkhachsan");
    const [quantityGuesthouse, setQuantityGuesthouse] = useState(2);
    const isButtonDisabled = selectitemid === "nhieukhachsan" && quantityGuesthouse < 2;
    // lấy token lên để tránh copy link vào trang 
    const token = localStorage.getItem('token');
    return (
        <Space direction="vertical" style={{display:"flex",padding:"144px 170px 80px 200px",backgroundColor:"#f9f9fa",marginTop:-64, height:"100vh"}}>
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
             <h1 style={{fontSize:35}}>Quý vị định đăng bao nhiêu khách sạn?</h1>

             <Space direction="vertical" style={{marginTop:30, width:470,padding:10, backgroundColor:"#fff"}}>
                 <Space direction="vertical" size={"large"} >
                    <Space className={selectitemid==='motkhachsan'?"item-typehotel-p2":""} size={"large"} 
                    style={{position:"relative",
                        border:"0.5px solid #cecece",padding:16, textAlign:"justify", width:"100%"}}
                    onClick={()=>{setSelectitemid('motkhachsan')}}>
                        <img src={img_type_hotels.home_main} alt="hotel" width={51} height={51} />
                        <span>Một khách sạn với 1 hay nhiều phòng mà khách có thể đặt</span>
                        <CheckCircleOutlined className={selectitemid==='motkhachsan'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                    </Space>
                    <Space className={selectitemid==='nhieukhachsan'?"item-typehotel-p2":""} size={"large"} 
                    style={{position:"relative",
                        border:"0.5px solid #cecece", padding:16, textAlign:"justify", width:"100%"}}
                        onClick={()=>{setSelectitemid('nhieukhachsan')}}>
                        <img src={img_type_hotels.multiple_homes} alt="hotel" width={51} height={51} />
                        <span>Nhiều khách sạn với 1 hay nhiều phòng mà khách có thể đặt</span>
                        <CheckCircleOutlined className={selectitemid==='nhieukhachsan'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                    </Space>
                    {
                        selectitemid === "nhieukhachsan" && <Space direction="vertical" size={"large"}>
                            <span style={{fontSize:16}}>Số lượng chỗ nghỉ</span>
                            <Input onChange={(even)=>setQuantityGuesthouse(Number(even.target.value))} defaultValue={2} min={2} style={{width:100}} type="number" />
                        </Space>
                    }
                 </Space>

                 <Row gutter={10} style={{marginTop:20}}>
                    <Col span={4}><Button onClick={()=>{navigate(-1)}} icon={<LeftOutlined />} style={{width:"100%", padding:18}}></Button></Col>
                    <Col span={20}><Button onClick={()=>{navigate(`/manage/register-hotel/type-part-4?token=${token}`)}}
                     disabled={isButtonDisabled} type="primary" style={{width:"100%", padding:18}}>Tiếp tục</Button></Col>
                </Row>
             </Space>
        </Space>
    );
}

export default TypeHotel_P3;