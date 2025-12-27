import { Col, Empty, Row, Space, Tabs } from "antd";

function CustomerFAQs() {
    return ( 
        <div style={{padding:"20px 150px 20px 150px", backgroundColor:"#fff"}}>
            <h2 style={{fontWeight:500, marginBottom:10}}>Câu hỏi dành cho chỗ nghỉ của Quý vị</h2>
            <span style={{display:"flex",textAlign:"justify", lineHeight:1.6}}>Mục Hỏi đáp này là mục mới sẽ được hiển thị trong trang thông tin chỗ nghỉ và phòng của Quý vị. Giờ Quý vị có thể trả lời tất cả câu hỏi từ mọi người về chỗ nghỉ hay phòng mà họ quan tâm. Chúng tôi sẽ đăng công khai những câu trả lời của Quý vị để những ai quan tâm có thể đọc. Chúng tôi khuyến khích Quý vị chia sẻ thông tin chi tiết và chính xác, hữu ích cho mọi người trong tương lai. Vui lòng đảm bảo nội dung câu trả lời tôn trọng sự riêng tư của mọi người và không có nội dung không phù hợp.
            </span>
            <Row style={{marginTop:30}}>
                <Col span={16}>
                    <Tabs items={[
                        {
                            label: 'Câu hỏi mới',
                            key: '1',
                            children: <Empty
                                 description= {
                                    <Space direction="vertical" >
                                        <h2>Quý vị không có câu hỏi nào chưa trả lời</h2>
                                        <div style={{width:400}}>
                                            <span style={{display:"flex",textAlign:"justify"}}>Thật tuyệt! Quý vị hiện không có câu hỏi nào chưa trả lời cả. Khi khách hàng tiềm năng gửi câu hỏi qua trang chỗ nghỉ, chúng sẽ hiển thị tại đây cho đến khi Quý vị phản hồi hoặc đánh dấu "đã lưu trữ".</span>
                                        </div>
                                    </Space>
                                 }
                             />,
                          },
                          {
                            label: 'Đã trả lời',
                            key: '2',
                            children: <Empty
                            description= {
                               <Space direction="vertical">
                                   <h2>Quý vị không có câu hỏi nào đã trả lời</h2>
                                   <div style={{width:400}}>
                                   <span style={{display:"flex",textAlign:"justify"}}>Tất cả câu hỏi Quý vị trả lời sẽ hiển thị tại đây. Quý vị cũng có thể gỡ bỏ các câu trả lời của mình ở đây bằng cách nhấn nút "xóa".</span>
                                   </div>
                               </Space>
                            }
                        />,
                          },
                          {
                            label: 'Đã lưu trữ',
                            key: '3',
                            children: <Empty
                            description= {
                               <Space direction="vertical">
                                   <h2>Quý vị không có câu hỏi nào được lưu trữ</h2>
                                   <div style={{width:400}}>
                                   <span style={{display:"flex",textAlign:"justify"}}>Khi Quý vị không muốn trả lời câu hỏi nào, Quý vị có thể lưu lại để xem sau bằng cách nhấn "Lưu trữ". Tất cả câu hỏi được lưu trữ sẽ hiển thị tại đây. Đừng lo, Quý vị luôn có thể tìm lại và trả lời chúng bất kỳ lúc nào Quý vị muốn.</span>
                                   </div>
                               </Space>
                            }
                        />,
                          },
                    ]} />
                </Col>
                <Col span={8}>
                    <Space direction="vertical" size={"large"}>
                        <Space style={{backgroundColor:"#fff"}}>
                            <Row style={{border:"1px solid #cecece", padding:20}}>
                                <Col span={6}>
                                    <img src="https://r-xx.bstatic.com/backend_static/common/icons/partner-thumbnails/insights/56f0122997ed2793742c3441d5baf820fa48e16c.svg" height={112} width={78} alt="image" />
                                </Col>
                                <Col span={18}>
                                <Space direction="vertical" style={{width:"100%", textAlign:"justify"}}>
                                    <span style={{textAlign:"justify", lineHeight:1.7}}>
                                        <span style={{fontWeight:"bold"}}>Mẹo:</span> Hãy cố gắng trả lời để làm sao hỗ trợ được những khách hàng tiềm năng khác
                                    </span>
                                    <span style={{textAlign:"justify", lineHeight:1.7}}>
                                        Dù đây là phản hồi cho câu hỏi của một vị khách tiềm năng, tất cả những ai truy cập trang của Quý vị đều có thể thấy tin nhắn trừ khi Quý vị để chế độ riêng tư. Quý vị hãy cố gắng đưa ra các câu trả lời thật hữu ích cho tất cả mọi người để khách biết liệu chỗ nghỉ có phù hợp với họ hay không.
                                    </span>
                                    <a href="#" onClick={(e) => e.preventDefault()}>Hiển thị mẹo tiếp theo</a>
                            </Space>
                                </Col>
                            </Row>
                        </Space>

                        <Space style={{backgroundColor:"#fff"}}>
                            <Row style={{border:"1px solid #cecece", padding:20}}>
                                <Col span={6}>
                                    <img src="https://r-xx.bstatic.com/backend_static/common/icons/partner-thumbnails/message/f4b65617daa4aad1c0ae2f4af86967479d520e65.svg" height={112} width={78} alt="image" />
                                </Col>
                                <Col span={18}>
                                <Space direction="vertical" style={{width:"100%", textAlign:"justify"}}>
                                    <h3 style={{textAlign:"left"}}>Về mục hỏi đáp với chỗ nghỉ</h3>
                                    <span style={{textAlign:"justify", lineHeight:1.7}}>
                                        Khách hàng tiềm năng gửi câu hỏi cho chỗ nghỉ trước khi đặt. Câu trả lời của Quý vị sẽ được hiển thị công khai để chúng tôi có thể giúp kết nối khách tới chỗ nghỉ hoàn hảo dành cho họ.
                                    </span>
                                    <a href="#" onClick={(e) => e.preventDefault()}>Tìm hiểu thêm</a>
                            </Space>
                                </Col>
                            </Row>
                        </Space>
                    </Space>
                </Col>
            </Row>
        </div>
     );
}

export default CustomerFAQs;