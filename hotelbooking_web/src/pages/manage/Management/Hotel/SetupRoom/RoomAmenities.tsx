import { Button, Checkbox, Col, Divider, Form, Row, Space } from "antd";
import {LeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { COLORS } from "../../../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../../../redux/Slice/Hotels_Mn/formRegisterRoomMnSlice";
import { selectFormRegisterRoomMn } from "../../../../../redux/selector";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";

function RoomAmenities() {
    const navigate = useNavigate();
    const {idhotel} = useParams();
    const dispatch = useDispatch();
    const [form] = useForm();
    const formStateRoom = useSelector(selectFormRegisterRoomMn);
    const tiennghichung = ["Giá treo quần áo", "TV màn hình phẳng", "Điều hòa không khí", 
        "Ra trải giường", "Bàn làm việc", "Dịch vụ báo thức", "Khăn tắm", "Tủ hoặc phòng để quần áo",
        "Hệ thống sưởi", "Quạt máy", "Két an toàn", "Khăn tắm/Bộ khăn trải giường (có thu phí)", 
        "Hoàn toàn nằm ở tầng trệt"
    ]
    // lấy token lên để tránh copy link vào trang 
    const token = localStorage.getItem('token');

    const khonggian = ["Ban công", "Sân hiên", "Tầm nhìn ra khung cảnh"]

    const doan = ["Ấm đun nước điện", "Máy pha trà/cà phê", "Khu vực phòng ăn", "Bàn ăn", "Lò vi sóng"]
    const onFinish = (values:any) => {
        const payload = {
            doandichvu: values?.doandichvu.join(","),
            khonggian: values?.khonggian.join(","),
            tiennghichung: values?.tiennghichung.join(",")
        }
        dispatch(updateForm(payload));
        navigate(`/manage/register-hotel/setup-room/name-room/${idhotel}?token=${token}`)
    };
    useEffect(()=>{
        if(formStateRoom){
            form.setFieldsValue({
                doandichvu: formStateRoom?.doandichvu?.split(",") || [],
                khonggian: formStateRoom?.khonggian?.split(",") || [],
                tiennghichung: formStateRoom?.tiennghichung?.split(",") || []
            })
        }
    },[form])
    return ( 
        <Space direction="vertical" style={{padding:"60px 200px 60px 200px"}}>
             {/* Thanh tiến trình  */}
                        <Row style={{position:"fixed", top:64, right:0, left:0, display:"flex", zIndex:2}}>
                            <Col span={6}>
                                <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                            </Col>
                            <Col span={6}>
                                <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                            </Col>
                            <Col span={6}>
                                <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                            </Col>
                            <Col span={6}>
                                <div style={{height:8, backgroundColor:"#dcdcdc", width:"100%"}}></div>
                            </Col>
                        </Row>
            <h1 style={{fontSize:35}}>Khách có thể sử dụng gì trong phòng này?</h1>
            <Form form={form} onFinish={onFinish} layout="vertical" style={{backgroundColor:"#fff", padding:15, width:500}}>
                <Form.Item name={"tiennghichung"} rules={[{required: true, message:"Chọn tiện nghi mà phòng của Quý vị có."}]} label={<h3>Tiện nghi chung</h3>}>
                    <Checkbox.Group>
                        <Space size={1} direction="vertical">
                        {tiennghichung.map((item:any) => (
                            <Checkbox key={item} value={item}>{item}</Checkbox>
                        ))}
                        </Space>
                    </Checkbox.Group>
                </Form.Item>
                <Divider style={{margin:"10px 0px 10px 0px"}} />
                <Form.Item name={"khonggian"} label={<h3>Không gian ngoài trời và tầm nhìn</h3>}>
                    <Checkbox.Group>
                        <Space size={1} direction="vertical">
                        {khonggian.map((item:any) => (
                            <Checkbox key={item} value={item}>{item}</Checkbox>
                        ))}
                        </Space>
                    </Checkbox.Group>
                </Form.Item>
                <Divider style={{margin:"10px 0px 10px 0px"}} />
                <Form.Item name={"doandichvu"} label={<h3>Đồ ăn thức uống</h3>}>
                    <Checkbox.Group>
                        <Space size={1} direction="vertical">
                        {doan.map((item:any) => (
                            <Checkbox key={item} value={item}>{item}</Checkbox>
                        ))}
                        </Space>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item>
                    <Row>
                        <Col span={3}><Button onClick={()=>{navigate(-1)}} style={{padding:18}} icon={<LeftOutlined />} block></Button></Col>
                        <Col span={21}><Button
                        type="primary" htmlType="submit" style={{marginLeft:10,padding:18}} block>Tiếp tục</Button></Col>
                    </Row>
                </Form.Item>
            </Form>
        </Space>
     );
}

export default RoomAmenities;