import { Button, Col, Form, Input, Radio, Row, Select, Space } from "antd";
import { IncreaseDecrease } from "../../../../component";
import { ReactSVG } from 'react-svg';
import {LeftOutlined } from '@ant-design/icons';
import { bedhotel1, bedhotel2, bedhotel3, bedhotel4 } from "../../../../../assets/svgs/svgBedHotel";
import { useNavigate, useParams } from "react-router-dom";
import { COLORS } from "../../../../../constants/constants";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../../../redux/Slice/Hotels_Mn/formRegisterRoomMnSlice";
import { selectFormRegisterRoomMn } from "../../../../../redux/selector";

const {Option} = Select;
function RoomDetails() {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false);
    const [form] = useForm();
    const dispatch = useDispatch();
    const {idhotel} = useParams();
    // lấy token lên để tránh copy link vào trang 
    const token = localStorage.getItem('token');
    const formStateRoom = useSelector(selectFormRegisterRoomMn);
    const onFinish = (values:any) => {
        //chỉ lấy những giường được chọn
        const filteredBeds = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => key.startsWith("giuong") && Number(value) > 0)
        );
        const payload = {
            dientichphong: values["dientichphong"],
            donvido: values["donvido"],
            issmoking: values["issmoking"],
            loaichonghi: values["loaichonghi"],
            soluongkhach: values["soluongkhach"],
            sophong: values["sophong"],
            ...filteredBeds
        }
        dispatch(updateForm(payload));
        navigate(`/manage/register-hotel/setup-room/bath-room/${idhotel}?token=${token}`);
    }
    const TypeRoom = ["Phòng đơn", "Phòng giường đôi", "Phòng 2 giường đơn", "Phòng giường đôi/2 giường đơn",
        "Phòng 3 người", "Phòng 4 người", "Suite", "Phòng gia đình", "Studio", "Căn hộ", "Phòng tập thể",
        "Giường trong phòng tập thể"
    ]
    const checkValidate = (_:any, allvalue:any)=> {
        //ít nhất phải có 1 giường
        const tongGiuong = allvalue.giuongdon + allvalue.giuongdoi + allvalue.giuonglon + allvalue.giuongcuclon + allvalue.giuongtang + allvalue.giuongsofa + allvalue.giuongfuton;
        if(allvalue.soluongkhach === 0 || tongGiuong === 0){
            setIsDisabled(true);
        }else{
            setIsDisabled(false);
        }
    }
    useEffect(()=>{
        if(formStateRoom){
            form.setFieldsValue({
                dientichphong: formStateRoom["dientichphong"],
                donvido: formStateRoom["donvido"] || 'met',
                issmoking: formStateRoom["issmoking"] || false,
                loaichonghi: formStateRoom["loaichonghi"] || "Phòng giường đôi",
                soluongkhach: formStateRoom["soluongkhach"] || 1,
                sophong: formStateRoom["sophong"] || 1,
                giuongdon: formStateRoom["giuongdon"] || 0,
                giuongdoi: formStateRoom["giuongdoi"] || 1,
                giuonglon: formStateRoom["giuonglon"] || 0,
                giuongcuclon: formStateRoom["giuongcuclon"] || 0,
                giuongtang: formStateRoom["giuongtang"] || 0,
                giuongsofa: formStateRoom["giuongsofa"] || 0,
                giuongfuton: formStateRoom["giuongfuton"] || 0,
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
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"98%"}}></div>
                </Col>
                <Col span={6}>
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"98%"}}></div>
                </Col>
                <Col span={6}>
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"100%"}}></div>
                </Col>
            </Row>
            <h1 style={{fontSize:35}}>Chi tiết phòng</h1>
            <Form onValuesChange={checkValidate} form={form} onFinish={onFinish} layout="vertical">
                <Space direction="vertical" size={"middle"} style={{width:595}}>
                    <Space direction="vertical" size={1} style={{backgroundColor:"#fff", display:"flex", padding:15}}>
                        <Form.Item initialValue={"Phòng giường đôi"} name={"loaichonghi"} label={<h3>Đây là loại chỗ nghỉ gì?</h3>}>
                            <Select  style={{ width: "100%" }}>
                                {TypeRoom.map((item) => (
                                <Option key={item} value={item}>
                                    {item}
                                </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item rules={[
                            { required: true, message: "Vui lòng nhập số phòng của Quý vị!" }
                        ]} initialValue={1} name={"sophong"} label={<h3>Quý vị có bao nhiêu phòng loại này?</h3>}>
                            <Input min={1} style={{width:100}} type="number" />
                        </Form.Item>
                    </Space>

                    <Space direction="vertical" style={{padding:15, backgroundColor:"#fff"}}>
                        <h3>Có loại giường nào trong phòng này?</h3>
                        <Space style={{display:"flex",width:566,height:70,
                            justifyContent:"space-between",alignItems:"center"}}>
                            <Space>
                                <ReactSVG src={bedhotel1} />
                                <div style={{display:"flex", flexDirection:"column"}}>
                                    <span style={{fontSize:14}}>Giường đơn</span>
                                    <span style={{fontSize:12,color:"#595959"}}>Rộng 90 - 130 cm</span>
                                </div>
                            </Space>
                            <Space>
                                <Form.Item style={{marginTop:20}} name="giuongdon" label={null} initialValue={0}>
                                    <IncreaseDecrease />
                                </Form.Item>
                            </Space> 
                        </Space>
    
                        <Space style={{display:"flex",width:566,height:70,
                            justifyContent:"space-between",alignItems:"center"}}>
                            <Space>
                                <ReactSVG src={bedhotel2} />
                                <div style={{display:"flex", flexDirection:"column"}}>
                                    <span style={{fontSize:14}}>Giường đôi</span>
                                    <span style={{fontSize:12,color:"#595959"}}>Rộng 131 - 150 cm</span>
                                </div>
                            </Space>
                            <Space>
                                <Form.Item style={{marginTop:20}} name="giuongdoi" label={null} initialValue={1}>
                                    <IncreaseDecrease />
                                </Form.Item>
                            </Space> 
                        </Space>
    
                        <Space style={{display:"flex",width:566,height:70,
                            justifyContent:"space-between",alignItems:"center"}}>
                            <Space>
                                <ReactSVG src={bedhotel2} />
                                <div style={{display:"flex", flexDirection:"column"}}>
                                    <span style={{fontSize:14}}>Giường lớn (cỡ King)</span>
                                    <span style={{fontSize:12,color:"#595959"}}>Rộng 151 - 180 cm</span>
                                </div>
                            </Space>
                            <Space>
                                <Form.Item style={{marginTop:20}} name="giuonglon" label={null} initialValue={0}>
                                    <IncreaseDecrease />
                                </Form.Item>
                            </Space> 
                        </Space>
    
                        <Space style={{display:"flex",width:566,height:70,
                            justifyContent:"space-between",alignItems:"center"}}>
                            <Space>
                                <ReactSVG src={bedhotel2} />
                                <div style={{display:"flex", flexDirection:"column"}}>
                                    <span style={{fontSize:14}}>Giường cực lớn (cỡ Super-king)</span>
                                    <span style={{fontSize:12,color:"#595959"}}>Rộng 181 - 210 cm</span>
                                </div>
                            </Space>
                            <Space>
                                <Form.Item style={{marginTop:20}} name="giuongcuclon" label={null} initialValue={0}>
                                    <IncreaseDecrease />
                                </Form.Item>
                            </Space> 
                        </Space>
    
                        <Space style={{display:"flex",width:566,height:70,
                            justifyContent:"space-between",alignItems:"center"}}>
                            <Space>
                                <ReactSVG src={bedhotel3} />
                                <div style={{display:"flex", flexDirection:"column"}}>
                                    <span style={{fontSize:14}}>Giường tầng</span>
                                    <span style={{fontSize:12,color:"#595959"}}>Nhiều kích cỡ</span>
                                </div>
                            </Space>
                            <Space>
                                <Form.Item style={{marginTop:20}} name="giuongtang" label={null} initialValue={0}>
                                    <IncreaseDecrease />
                                </Form.Item>
                            </Space> 
                        </Space>
    
                        <Space style={{display:"flex",width:566,height:70,
                            justifyContent:"space-between",alignItems:"center"}}>
                            <Space>
                                <ReactSVG src={bedhotel4} />
                                <div style={{display:"flex", flexDirection:"column"}}>
                                    <span style={{fontSize:14}}>Giường sofa</span>
                                    <span style={{fontSize:12,color:"#595959"}}>Nhiều kích cỡ</span>
                                </div>
                            </Space>
                            <Space>
                                <Form.Item style={{marginTop:20}} name="giuongsofa" label={null} initialValue={0}>
                                    <IncreaseDecrease />
                                </Form.Item>
                            </Space> 
                        </Space>
    
                        <Space style={{display:"flex",width:566,height:70,
                            justifyContent:"space-between",alignItems:"center"}}>
                            <Space>
                                <ReactSVG src={bedhotel2} />
                                <div style={{display:"flex", flexDirection:"column"}}>
                                    <span style={{fontSize:14}}>Nệm Futon</span>
                                    <span style={{fontSize:12,color:"#595959"}}>Nhiều kích cỡ</span>
                                </div>
                            </Space>
                            <Space>
                                <Form.Item style={{marginTop:20}} name="giuongfuton" label={null} initialValue={0}>
                                    <IncreaseDecrease />
                                </Form.Item>
                            </Space> 
                        </Space>
                    </Space>

                    <Space direction="vertical" size={1} style={{backgroundColor:"#fff", display:"flex", padding:15}}>
                            <Form.Item initialValue={1} name={"soluongkhach"} label={<h3>Bao nhiêu khách có thể nghỉ ở phòng này?</h3>}>
                                <IncreaseDecrease />
                            </Form.Item>
                    </Space>

                    <Space direction="vertical" size={1} style={{backgroundColor:"#fff", display:"flex", padding:15}}>
                            <h3 style={{marginBottom:10}}>Phòng này rộng bao nhiêu?</h3>
                            <span style={{fontWeight:500}}>Diện tích phòng - không bắt buộc</span>
                            <Space style={{marginTop:10}}>
                                <Form.Item rules={[
                                    { required: false, message: "Vui lòng điền diện tích phòng của Quý vị!" }
                                ]} name={"dientichphong"} label={""}>
                                    <Input min={1} style={{width:200}} type="number" />
                                </Form.Item>
                                <Form.Item initialValue={"met"} name={"donvido"} label="">
                                    <Select style={{width:150}}>
                                        <Option value="met" >mét vuông</Option>
                                        <Option value="feet" >feet vuông</Option>
                                    </Select>
                                </Form.Item>
                            </Space>
                            <Form.Item initialValue={false} name="issmoking" label={<h3>Có được hút thuốc trong phòng này không?</h3>}>
                                <Radio.Group>
                                    <Radio value={true}>Có</Radio>
                                    <Radio value={false}>Không</Radio>
                                </Radio.Group>
                            </Form.Item>
                    </Space>

                    <Form.Item style={{width:585}}>
                        <Row>
                            <Col span={3}><Button onClick={()=>{navigate(-1)}} style={{padding:18}} icon={<LeftOutlined />} block></Button></Col>
                            <Col span={21}><Button 
                            disabled={isDisabled} type="primary" htmlType="submit" style={{marginLeft:10,padding:18}} block>Tiếp tục</Button></Col>
                        </Row>
                    </Form.Item>
                </Space>
            </Form>
        </Space>
      );
}

export default RoomDetails;