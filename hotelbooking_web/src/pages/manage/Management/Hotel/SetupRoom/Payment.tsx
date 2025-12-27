import { Button, Col, Radio, Row, Space } from "antd";
import { APP1, COLORS } from "../../../../../constants/constants";
import { useNavigate} from "react-router-dom";
import {LeftOutlined } from '@ant-design/icons';

function Payment() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    return ( 
        <Space direction="vertical" size={"middle"} style={{padding:"40px 200px 40px 200px"}}>
           {/* Thanh tiến trình  */}
           <Row style={{position:"fixed", top:64, right:0, left:0, display:"flex", zIndex:2}}>
                  <Col span={24}>
                      <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"100%"}}></div>
                  </Col>
            </Row>
            <h1 style={{fontSize:35}}>Thanh toán</h1>
            <Space direction="vertical" style={{width:500, backgroundColor:"#fff", padding:20}}>
                <h2 style={{marginBottom:20}}>Khách thanh toán tiền phòng bằng cách nào?</h2>
                <Radio.Group defaultValue={"online"}>
                    <Space direction="vertical">
                        <Row>
                            <Col span={1}><Radio style={{textAlign:"justify"}} value={"online"} /></Col>
                            <Col span={23} style={{textAlign:"justify"}}>
                                <span>Thanh toán online khi đặt phòng. {APP1.name} sẽ hỗ trợ xử lý các khoản thanh toán của khách với dịch vụ Thanh toán bởi {APP1.name}.</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={1}><Radio value={"offline"} /></Col>
                            <Col span={23}>
                                <span>Bằng thẻ tín dụng, tại chỗ nghỉ</span>
                            </Col>
                        </Row>
                    </Space>
                </Radio.Group>
            </Space>
            <Space direction="vertical" style={{width:500, backgroundColor:"#fff", padding:20}}>
                <h3 style={{marginBottom:20}}>Cách hoạt động của Thanh toán bởi {APP1.name}</h3>
                <ol style={{padding:20}}>
                    <li style={{ marginBottom:15 }}><span style={{fontWeight:600}}>Khách sẽ thanh toán</span> thông qua {APP1.name} với các tùy chọn như PayPal, WeChat Pay và AliPay.</li>
                    <li style={{ marginBottom:15 }}><span style={{fontWeight:600}}>Chúng tôi xử lý khoản thanh toán của khách</span> để Quý vị không phải lo lắng về bồi hoàn, gian lận hay thẻ không hợp lệ.</li>
                    <li><span style={{fontWeight:600}}>{APP1.name} gửi thanh toán cho Quý vị.</span> Quý vị sẽ nhận được chuyển khoản ngân hàng trễ nhất là ngày 15 hằng tháng, bao gồm tất cả mọi đặt phòng có ngày trả phòng trong tháng trước đó.</li>
                </ol>
            </Space>

            <Row>
                <Col span={3}><Button onClick={()=>{navigate(-1)}} style={{padding:18}} icon={<LeftOutlined />} block></Button></Col>
                <Col span={21}><Button onClick={()=>{
                    navigate(`/manage/home?token=${token}`)
                }}
                type="primary" style={{marginLeft:10,padding:18}} block>Tiếp tục</Button></Col>
            </Row>
        </Space>
     );
}

export default Payment;