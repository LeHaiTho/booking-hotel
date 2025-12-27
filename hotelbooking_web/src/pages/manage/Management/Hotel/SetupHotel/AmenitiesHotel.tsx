import { Button, Checkbox, Col, Row, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {LeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { baseUrl, COLORS } from "../../../../../constants/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../../../redux/Slice/Hotels_Mn/formRegisterHotelMnSlice";
import { selectFormRegisterHotelMn } from "../../../../../redux/selector";

function AmenitiesHotel() {
    const [selectFacilities, setSelectFacilities] = useState<any[]>([]);
    const [facilities, setFacilities] = useState<any[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // lấy token lên để tránh copy link vào trang 
    const token = localStorage.getItem('token');
    const isButtonDisabled = selectFacilities.length ===0;

    const formStateHotel = useSelector(selectFormRegisterHotelMn);
    //lấy data tiện nghi
    const getAPI_AmenitiesHotle = async () => {
        try{
            const res = await axios(`${baseUrl}hotel-properties/get-amenities-hotel`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setFacilities(res.data);
        }catch(err){
            console.log(err);
        }
    }
    const handleSubmit = () => {
        if(selectFacilities.length > 0){
            const value = selectFacilities.join(',');
            dispatch(updateForm({arrAmenities: value}));
            navigate(`/manage/register-hotel/setup-hotel/check-in-out-hotel?token=${token}`)
        }
    }
    useEffect(()=>{
        getAPI_AmenitiesHotle();
        if(formStateHotel && formStateHotel.arrAmenities){
            const value = formStateHotel.arrAmenities.split(',') || [];
            // const value_number = value.map((item:any)=>Number(item));
            //lấy dữ liệu từ form cũ chuống nếu có
            setSelectFacilities(value);
        }
    },[])
    // const facilities = [
    //     "Nhà hàng", "Dịch vụ phòng", "Quầy bar", "Lễ tân 24 giờ", "Phòng xông hơi",
    //     "Trung tâm thể dục", "Sân vườn", "Sân thượng / hiên", "Phòng không hút thuốc",
    //     "Xe đưa đón sân bay", "Phòng gia đình", "Trung tâm Spa & chăm sóc sức khoẻ",
    //     "Bồn tắm nóng/bể sục (Jacuzzi)", "WiFi miễn phí", "Điều hòa nhiệt độ",
    //     "Công viên nước", "Trạm sạc xe điện", "Hồ bơi", "Bãi biển"
    //   ];
    return ( 
        <Space direction="vertical" style={{padding:"60px 200px 60px 200px"}}>
             {/* Thanh tiến trình  */}
                              <Row style={{position:"fixed", top:64, right:0, left:0, display:"flex", zIndex:2}}>
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
                                            <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                                        </Col>
                                        <Col span={3}>
                                            <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                                        </Col>
                                        <Col span={3}>
                                            <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                                        </Col>
                                        <Col span={3}>
                                            <div style={{height:8, backgroundColor:"#dcdcdc", width:"100%"}}></div>
                                        </Col>
                                    </Row>
            <h1 style={{fontSize:35}}>Khách có thể sử dụng gì tại khách sạn của Quý vị?</h1>
            <Checkbox.Group value={selectFacilities} onChange={(value)=>{setSelectFacilities(value)}}>
                <Space style={{width:500, backgroundColor:"#fff", padding:20}} direction="vertical">
                { facilities && facilities.map((item) => (
                    <Checkbox key={item?.id} value={item?.name}>{item?.name}</Checkbox>
                ))}
                 <Row gutter={10} style={{marginTop:20}}>
                    <Col span={4}><Button onClick={()=>{navigate(-1)}} icon={<LeftOutlined />} style={{width:"100%", padding:18}}></Button></Col>
                    <Col span={20}><Button onClick={()=>{handleSubmit()}}
                    disabled={isButtonDisabled}
                    type="primary" style={{width:"100%", padding:18}}>Tiếp tục</Button></Col>
                </Row>
                </Space>
            </Checkbox.Group>
        </Space>
     );
}

export default AmenitiesHotel;