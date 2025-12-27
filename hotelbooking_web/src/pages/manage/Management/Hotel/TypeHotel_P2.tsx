import { Button, Col, Row, Space } from "antd";
import { CheckCircleOutlined, LeftOutlined } from '@ant-design/icons';
import { baseUrl, COLORS } from "../../../../constants/constants";
import "./StyleHotel.css"
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../../redux/Slice/Hotels_Mn/formRegisterHotelMnSlice";
import { selectFormRegisterHotelMn } from "../../../../redux/selector";

function TypeHotel_P2() {
    const formStateHotel = useSelector(selectFormRegisterHotelMn)
    const [selectitemid, setSelectitemid] = useState(formStateHotel?.type || null);
    const [typehotel, setTypehotel] = useState<any[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // lấy token lên để tránh copy link vào trang 
    const token = localStorage.getItem('token');
    const getAPITypeHotel = async () => {
        try{
            const res = await axios.get(`${baseUrl}hotel-properties/get-type-hotel`,{
                headers: {Authorization: `Bearer ${token}`},
            })
            setTypehotel(res.data)
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getAPITypeHotel();
    },[])
    const handleSubmit = () => {
        // lưu vào state form Redux 
        if(selectitemid!=null){
            dispatch(updateForm({type: selectitemid}));
            navigate(`/manage/register-hotel/type-part-3?token=${token}`)
        }
    }
    return (  
        <Space direction="vertical" style={{display:"flex",padding:"80px 150px 80px 200px",backgroundColor:"#f9f9fa"}}>
            {/* Thanh tiến trình  */}
            <Row style={{position:"fixed", top:64, right:0, left:0, display:"flex"}}>
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
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"100%"}}></div>
                </Col>
            </Row>
            <h1 style={{fontSize:35}}>Chỗ nghỉ nào trong danh sách dưới đây giống với chỗ nghỉ của Quý vị nhất?</h1>
            <Space style={{marginTop:20, backgroundColor:"#fff", padding:10}} size={"large"} wrap>

                {
                    typehotel && typehotel.map((item:any)=>{
                        return (
                            <Space key={item.id} className={selectitemid===item?.name?"item-typehotel-p2":""} direction="vertical" style={{
                                position:"relative",
                                width:268, height:128, padding:16, textAlign:"justify",
                                border:"0.5px solid #cecece", cursor:"pointer"}}
                                onClick={()=>{setSelectitemid(item?.name)}}>
                                <span style={{fontWeight:"bold"}}>{item?.name}</span>
                                <span>{item?.description}</span>
                                <CheckCircleOutlined className={selectitemid===item?.name?"item-icon":""} style={{
                                    position:"absolute", top:-10, right:-10,display:"none",
                                    backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                            </Space>
                        )
                    })
                }

                {/* <Space className={selectitemid==='khachsan'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('khachsan')}}>
                    <span style={{fontWeight:"bold"}}>Khách sạn</span>
                    <span>Chỗ nghỉ cho khách du lịch, thường có nhà hàng, phòng họp và các dịch vụ khác dành cho khách</span>
                    <CheckCircleOutlined className={selectitemid==='khachsan'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='nhakhach'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('nhakhach')}}>
                    <span style={{fontWeight:"bold"}}>Nhà khách</span>
                    <span>Nhà riêng với tiện nghi sống riêng cho chủ nhà và khách</span>
                    <CheckCircleOutlined className={selectitemid==='nhakhach'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='nhanghibvab'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('nhanghibvab')}}>
                    <span style={{fontWeight:"bold"}}>Nhà nghỉ B&B</span>
                    <span>Nhà riêng có chỗ nghỉ qua đêm và phục vụ bữa sáng</span>
                    <CheckCircleOutlined className={selectitemid==='nhanghibvab'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>
                
                <Space className={selectitemid==='chonghinhadan'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('chonghinhadan')}}>
                    <span style={{fontWeight:"bold"}}>Chỗ nghỉ nhà dân</span>
                    <span>Nhà chung là nơi khách có phòng riêng và host sẽ ở đó khi khách đến nghỉ. Một số tiện nghi sẽ được dùng chung giữa host và khách.</span>
                    <CheckCircleOutlined className={selectitemid==='chonghinhadan'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='nhatro'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('nhatro')}}>
                    <span style={{fontWeight:"bold"}}>Nhà trọ</span>
                    <span>Chỗ nghỉ tiết kiệm với hầu hết các giường được kê theo kiểu ký túc xá và mang tính chất tập thể</span>
                    <CheckCircleOutlined className={selectitemid==='nhatro'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='khachsancanho'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('khachsancanho')}}>
                    <span style={{fontWeight:"bold"}}>Khách sạn căn hộ</span>
                    <span>Căn hộ tự phục vụ với một số tiện nghi của khách sạn như quầy lễ tân</span>
                    <CheckCircleOutlined className={selectitemid==='khachsancanho'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='khachsankhoangngu'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('khachsankhoangngu')}}>
                    <span style={{fontWeight:"bold"}}>Khách sạn khoang ngủ (capsule)</span>
                    <span>Các buồng hoặc khoang ngủ cực kỳ nhỏ cung cấp chỗ nghỉ qua đêm đơn giản giá rẻ cho khách</span>
                    <CheckCircleOutlined className={selectitemid==='khachsankhoangngu'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='nhanghinongthon'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('nhanghinongthon')}}>
                    <span style={{fontWeight:"bold"}}>Nhà nghỉ nông thôn</span>
                    <span>Nhà riêng với chỗ nghỉ đơn giản nằm ở vùng thôn quê</span>
                    <CheckCircleOutlined className={selectitemid==='nhanghinongthon'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='nhanghitrangtrai'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('nhanghitrangtrai')}}>
                    <span style={{fontWeight:"bold"}}>Nhà nghỉ trang trại</span>
                    <span>Nông trại tư nhân với chỗ nghỉ đơn giản</span>
                    <CheckCircleOutlined className={selectitemid==='nhanghitrangtrai'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='quantro'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('quantro')}}>
                    <span style={{fontWeight:"bold"}}>Quán trọ</span>
                    <span>Chỗ nghỉ nhỏ, đơn giản và mang phong cách mộc mạc</span>
                    <CheckCircleOutlined className={selectitemid==='quantro'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='khanhsantinhnhan'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('khanhsantinhnhan')}}>
                    <span style={{fontWeight:"bold"}}>Khách sạn tình nhân</span>
                    <span>Chỗ nghỉ dành riêng cho người lớn, cho thuê theo giờ hoặc theo đêm</span>
                    <CheckCircleOutlined className={selectitemid==='khanhsantinhnhan'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='nhanghivenduong'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('nhanghivenduong')}}>
                    <span style={{fontWeight:"bold"}}>Nhà nghỉ ven đường</span>
                    <span>Khách sạn ven đường thường dành cho khách lái xe máy, có lối đi thẳng vào bãi đỗ xe và hầu như không được trang bị nhiều tiện nghi</span>
                    <CheckCircleOutlined className={selectitemid==='nhanghivenduong'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='resort'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('resort')}}>
                    <span style={{fontWeight:"bold"}}>Resort</span>
                    <span>Chỗ nghỉ ngơi thư giãn với nhà hàng, các hoạt động trong khuôn viên và thường mang phong cách sang trọng</span>
                    <CheckCircleOutlined className={selectitemid==='resort'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='riad'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('riad')}}>
                    <span style={{fontWeight:"bold"}}>Riad</span>
                    <span>Chỗ nghỉ truyền thống của người Ma Rốc với sân trong và mang không gian quý phái</span>
                    <CheckCircleOutlined className={selectitemid==='riad'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='ryokan'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('ryokan')}}>
                    <span style={{fontWeight:"bold"}}>Ryokan</span>
                    <span>Chỗ nghỉ truyền thống theo phong cách Nhật Bản, cho phép khách lựa chọn bữa ăn</span>
                    <CheckCircleOutlined className={selectitemid==='ryokan'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space>

                <Space className={selectitemid==='nhanghigiuathiennhien'?"item-typehotel-p2":""} direction="vertical" style={{
                    position:"relative",
                    width:268, height:128, padding:16, textAlign:"justify",
                    border:"0.5px solid #cecece", cursor:"pointer"}}
                    onClick={()=>{setSelectitemid('nhanghigiuathiennhien')}}>
                    <span style={{fontWeight:"bold"}}>Nhà nghỉ giữa thiên nhiên</span>
                    <span>Nhà riêng với chỗ nghỉ nằm bao bọc giữa thiên nhiên, như núi non hoặc rừng cây</span>
                    <CheckCircleOutlined className={selectitemid==='nhanghigiuathiennhien'?"item-icon":""} style={{
                        position:"absolute", top:-10, right:-10,display:"none",
                        backgroundColor:COLORS.BACKGROUND,fontSize:20, borderRadius:100, color:"#fff"}} />
                </Space> */}
            </Space>
            <Row gutter={10} style={{marginTop:20}}>
                <Col span={2}><Button onClick={()=>{navigate(-1)}} icon={<LeftOutlined />} style={{width:"100%", padding:18}}></Button></Col>
                <Col span={22}><Button disabled={selectitemid===null} onClick={()=>{handleSubmit()}} type="primary" style={{width:"100%", padding:18}}>Tiếp tục</Button></Col>
            </Row>
        </Space>
    );
}

export default TypeHotel_P2;