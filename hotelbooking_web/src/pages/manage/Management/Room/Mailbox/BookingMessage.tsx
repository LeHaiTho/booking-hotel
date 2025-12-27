import { Col, Empty, Input, Row, Select, Space, Switch, Tabs } from "antd";
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
const {Option} = Select;
function BookingMessage() {
    return ( 
        <div style={{padding:20, backgroundColor:"#fff"}}>
            <Tabs defaultActiveKey="1"
                items={[
                {
                    key: '1',
                    label: 'Khách',
                    children: <div>
                        <Row>
                            <Col span={6}>
                                <Space direction="vertical" style={{width:"100%"}}>
                                    <Space style={{display:"flex", justifyContent:"space-between", alignItems:"center", fontWeight:500, fontSize:18}}>
                                        <span>Tin nhắn</span>
                                        <SearchOutlined />
                                    </Space>
                                    <Input style={{padding:8}} placeholder="Tìm bằng tên hoặc mã số đặt phòng" />
                                    <span>Sắp xếp tin nhắn</span>
                                    <Select defaultValue={["3"]} suffixIcon={<CaretDownOutlined />} placeholder={"Tất cả tin nhắn"} style={{width:"100%", height:40}}>
                                        <Option key={"1"}>Tin nhắn đã gửi</Option>
                                        <Option key={"2"}>Tin nhắn chưa trả lời</Option>
                                        <Option key={"3"}>Tất cả tin nhắn</Option>
                                    </Select>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Empty styles={{ image: { height: 300 } }}  style={{backgroundColor:"#f5f5f5"}} image={`https://r-xx.bstatic.com/backend_static/common/img/partner-messaging/support/no-messages--desktop@2x/88c596d950e929e731f6e413db3200843544cb1f.png`}
                                 
                                 description={<Space direction="vertical">
                                        <h2>Không có tin nhắn</h2>
                                        <span>Các cuộc hội thoại giữa Quý vị và khách sẽ hiển thị tại đây</span>
                                 </Space>} />
                            </Col>
                            <Col span={6}>
                                <span style={{textAlign:"justify"}}>Booking.com nhận tất cả tin nhắn tại đây và xử lý những thông tin này theo <a href="#">Chính sách Bảo mật và Cookie</a> của mình</span>
                            </Col>
                        </Row>
                    </div>,
                  },
                  {
                    key: '2',
                    label: 'Dịch vụ khách hàng',
                    children: <div>
                                <Row>
                                    <Col span={6}>
                                        <Space direction="vertical" style={{width:"100%"}}>
                                            <Space style={{display:"flex", justifyContent:"space-between", alignItems:"center", fontWeight:500, fontSize:18}}>
                                                <span>Tin nhắn</span>
                                            </Space>
                                            <Input style={{padding:8}} prefix={<SearchOutlined />} placeholder="Tìm theo mã đặt phòng" />
                                            <Space>
                                                <Switch defaultChecked /> <span>Chỉ hiện thị tin nhắn chưa đọc</span>
                                            </Space>
                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Empty styles={{ image: { height: 300 } }}  style={{backgroundColor:"#f5f5f5"}} image={`https://r-xx.bstatic.com/backend_static/common/img/partner-messaging/support/no-messages--desktop@2x/88c596d950e929e731f6e413db3200843544cb1f.png`}
                                        
                                        description={<Space direction="vertical">
                                                <h2>Không có tin nhắn</h2>
                                                <span>Các cuộc hội thoại giữa Quý vị và khách sẽ hiển thị tại đây</span>
                                        </Space>} />
                                    </Col>
                                    <Col span={6}>
                                        <span style={{textAlign:"justify"}}>Booking.com nhận tất cả tin nhắn tại đây và xử lý những thông tin này theo <a href="#">Chính sách Bảo mật và Cookie</a> của mình</span>
                                    </Col>
                                </Row>
                            </div>,
                  },
            ]}  />
        </div>
     );
}

export default BookingMessage;