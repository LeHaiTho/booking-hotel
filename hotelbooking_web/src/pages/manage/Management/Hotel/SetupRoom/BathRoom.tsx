import { Button, Checkbox, Col, Divider, Form, Radio, Row, Space } from "antd";
import {LeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { COLORS } from "../../../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../../../redux/Slice/Hotels_Mn/formRegisterRoomMnSlice";
import { selectFormRegisterRoomMn } from "../../../../../redux/selector";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";

function BathRoom() {
    //lấy id của khách sạn khi truyền qua parameter 
    const {idhotel} = useParams();
    const [form] = useForm();
    const dispatch = useDispatch();
    const formStateRoom = useSelector(selectFormRegisterRoomMn);
    const navigate = useNavigate();
    // lấy token lên để tránh copy link vào trang 
    const token = localStorage.getItem('token');

    const vatdung = ["Giấy vệ sinh", "Vòi sen", "Nhà vệ sinh", "Máy sấy tóc", "Bồn tắm", 
        "Đồ vệ sinh cá nhân miễn phí", "Chậu rửa vệ sinh (bidet)", "Dép", "Áo choàng tắm",
        "Bồn tắm spa"
    ]
    const onFinish = (values:any) => {
         const payload = {
            phongtamrieng: values?.phongtamrieng,
            vatdungbathroom: values?.vatdungbathroom.join(','),
         }
        dispatch(updateForm(payload));
        navigate(`/manage/register-hotel/setup-room/room-amenities/${idhotel}?token=${token}`);
    };

    useEffect(()=>{
        if(formStateRoom){
            form.setFieldsValue({
                phongtamrieng: formStateRoom?.phongtamrieng || true,
                vatdungbathroom: formStateRoom?.vatdungbathroom?.split(',') || [],
            })
        }
    },[])
    return ( 
        <Space direction="vertical" style={{padding:"40px 200px 0px 200px"}}>
            {/* Thanh tiến trình  */}
            <Row style={{position:"fixed", top:64, right:0, left:0, display:"flex", zIndex:2}}>
                <Col span={6}>
                    <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                </Col>
                <Col span={6}>
                    <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                </Col>
                <Col span={6}>
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"98%"}}></div>
                </Col>
                <Col span={6}>
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"100%"}}></div>
                </Col>
            </Row>
            <h1 style={{fontSize:35}}>Thông tin phòng tắm</h1>
            <Form form={form} layout="vertical" onFinish={onFinish} >
                <Space direction="vertical" style={{backgroundColor:"#fff", padding:15, width:600}}>
                    <Form.Item initialValue={true} name="phongtamrieng" label={<h3>Đây có phải phòng tắm riêng không?</h3>}>
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value={true}>Đúng</Radio>
                                <Radio value={false}>Không phải, đây là phòng tắm chung</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Divider style={{margin:"10px 0px 10px 0px"}} />
                    <Form.Item rules={[{required: true, message:"Trong phòng tắm của Quý vị có những gì."}]} name={"vatdungbathroom"} label={<h3>Phòng tắm trong phòng này có vật dụng gì?</h3>}>
                        <Checkbox.Group>
                            <Space size={1} direction="vertical">
                            {vatdung.map((item) => (
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
                </Space>
            </Form>
        </Space>
     );
}

export default BathRoom;