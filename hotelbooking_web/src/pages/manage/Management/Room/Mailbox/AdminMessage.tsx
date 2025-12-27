import { Button, Col, Divider, Empty, Input, Row, Space, Tabs } from "antd";

function AdminMessage() {
    return ( 
        <div style={{padding:"20px 100px 20px 100px", backgroundColor:"#fff"}}>
            <h1>Hộp thư</h1>
            <Row>
                <Col span={18}>
                    <Tabs defaultActiveKey="1" items={[
                        {
                            label: 'Tất cả tin nhắn',
                            key: '1',
                            children: <Empty description="Quý vị không có tin nhắn nào" />
                          },
                          {
                            label: 'Đã đánh dấu',
                            key: '2',
                            children: <Empty description="Quý vị không có tin nhắn nào" />,
                          },
                          {
                            label: 'Đã gửi',
                            key: '3',
                            children: <Empty description="Quý vị không có tin nhắn nào" />,
                          },
                    ]} />
                </Col>
                <Col span={6} style={{border:"1px solid #cecece", padding:20, backgroundColor:"#fff"}} >
                    <Space direction="vertical">
                        <h1>Nhận hỗ trợ tức thì</h1>
                        <span>Tìm giải đáp cho câu hỏi của Quý vị thật nhanh chóng</span>
                        <Input placeholder="Nhập câu hỏi của Quý vị" />
                        <h3>Các chủ đề phổ biến</h3>
                        <ul>
                            <li style={{margin:"20px 0px 0px 20px"}}><a href="#">Đặt phòng</a></li>
                            <li style={{margin:"20px 0px 0px 20px"}}><a href="#">Hoa hồng, hóa đơn và thuế</a></li>
                            <li style={{margin:"20px 0px 0px 20px"}}><a href="#">Giá và Tình trạng phòng chống</a></li>
                        </ul>
                        <Button><span style={{color:"#2088d2"}}>Xem thêm chủ đề</span></Button>
                        <Divider style={{margin:"0px 10px 0px 10px"}} />
                        <h3>Không tìm được thông tin Quý vị cần?</h3>
                        <Button><span style={{color:"#2088d2"}}>Xem các lựa chọn liên hệ</span></Button>
                    </Space>
                </Col>
            </Row>
        </div>
     );
}

export default AdminMessage;