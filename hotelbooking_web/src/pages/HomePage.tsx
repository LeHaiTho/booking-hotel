import { Button, Col, Row, Space, Steps } from "antd";
import { APP1, COLORS } from "../constants/constants";
import { images } from "../assets/images";
import "./home.css"
import { useNavigate } from "react-router-dom";
function HomePage() {
    const navigate = useNavigate();
    return ( 
        <div>
             {/* phần 1  */}
            <Space style={{paddingLeft:100, paddingRight:100, backgroundColor:"#fff"}}>
                <Space direction="vertical" size={"large"} style={{
                        padding: 50, textAlign:"justify"
                    }}>
                    <h1>Tham gia chương trình liên kết của <span style={{color:COLORS.BACKGROUND}}>{APP1.name}</span> ngay hôm nay</h1>
                    <span style={{lineHeight: '1.5'}}
                    >Hưởng hoa hồng khi quảng bá các dịch vụ du lịch của {APP1.name} - đăng ký hôm nay qua mạng lưới liên kết chính thức của chúng tôi</span>
                    <Button type="primary" style={{
                        backgroundColor:COLORS.BUTTON, color:"#fff",fontWeight:600, padding:18
                    }} onClick={()=>navigate('/manage/register')}>Đăng ký</Button>
                </Space>
                <Space>
                    <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/46255696.jpg?k=debb486d614e3bfcf5ff18c4cdb763388dee398f7ecbb547535c9bbb20fa16c6&o=&hp=1" 
                    alt="hihi" height={390} width={750}/>
                </Space>
            </Space>
            {/* phần 2  */}
            <Space direction="vertical" style={{padding:"70px 100px 70px 150px", backgroundColor:"#f5f5f5"}}>
                <h2>Vì sao nên đăng ký chương trình đối tác liên kết của {APP1.name}?</h2>
                <span style={{color:"gray", fontWeight:600}}
                >Đưa doanh nghiệp lên tầng cao mới với một trong những chương trình liên kết du lịch tốt nhất trên thế giới</span>
                <Row gutter={[16,16]} style={{marginTop:50}}>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Space direction="vertical">
                            <img src={images.tien} height={120} width={120} alt="hihi" />
                            <h2>Chuyển đổi lưu lượng truy cập thành doanh thu</h2>
                            <span style={{textAlign:"justify", lineHeight:"1.5"}} >Tăng doanh thu khi quảng bá hơn 28 triệu đăng ký chỗ nghỉ, bên cạnh các lựa chọn đi lại và địa điểm tham quan ở hơn 60.000 vị trí.</span>
                        </Space>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Space direction="vertical">
                            <img src={images.dichvu} height={120} width={120} alt="hihi" />
                            <h2>Lựa chọn dịch vụ đa dạng</h2>
                            <span style={{textAlign:"justify", lineHeight:"1.5"}} >Từ khách sạn đến nhà cây, vé tham quan phút chót, hoặc dịch vụ thuê xe để đi lại – chúng tôi đều có.</span>
                        </Space>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Space direction="vertical">
                            <img src={images.nhiemvu} height={120} width={120} alt="hihi" />
                            <h2>Dễ sử dụng</h2>
                            <span style={{textAlign:"justify", lineHeight:"1.5"}} >Chúng tôi tối ưu hóa các sản phẩm liên kết với tiêu chí thuận tiện và dễ sử dụng để Quý vị có thể tập trung vào việc kinh doanh.</span>
                        </Space>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Space direction="vertical">
                            <img src={images.tuvan} height={120} width={120} alt="hihi" />
                            <h2>Dịch vụ tập trung vào khách hàng</h2>
                            <span style={{textAlign:"justify", lineHeight:"1.5"}} >Chúng tôi sử dụng công nghệ hiện đại và cung cấp dịch vụ khách hàng 24/7 để giúp khách hàng của Quý vị dễ dàng đặt chỗ.</span>
                        </Space>
                    </Col>

                </Row>
            </Space>
            {/* phần 3  */}
            <Space style={{backgroundColor:"#fff", display:"flex",padding:"70px 100px 70px 150px"}}>
                <Space direction="vertical">
                    <h2>Cách thức hoạt động ra sao?</h2>
                    <span style={{color:"gray", fontWeight:600}}>Tăng doanh thu với chúng tôi</span>
                    <Space style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Space direction="vertical" style={{marginTop:50}}>
                        <Steps className="custom-steps"
                            direction="vertical"
                            current={-1} //tắt hoạt động các bước
                            items={[
                            {
                                title: 'Đăng ký',
                                description:'Tham gia cùng chúng tôi, miễn phí và dễ dàng',
                            },
                            {
                                title: 'Đăng ký qua mạng lưới liên kết của chúng tôi',
                                description:'Chọn khu vực của Quý vị và hoàn tất đăng ký với Awin hoặc CJ',
                            },
                            {
                                title: `Quảng bá ${APP1.name}`,
                                description:'Thêm đường link, banner và các công cụ dễ sử dụng khác vào trang của Quý vị',
                            },
                            {
                                title: 'Tăng doanh thu',
                                description:'Hưởng hoa hồng trên các đơn đặt đủ điều kiện được thực hiện thông qua các công cụ tích hợp trên trang của Quý vị',
                            },
                            ]}
                        />
                        </Space>
                        <Space>
                            <img alt="hihi" height={400} width={600} style={{borderRadius:20}}
                            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/512094293.jpg?k=3696bc39f522445adf0ff425d371587481aa686f3e835304200a4fd0ddd1c40c&o=&hp=1"></img>
                        </Space>
                    </Space>
                </Space>
            </Space>
            {/* phần 4  */}
            <Row style={{
                backgroundColor:COLORS.BACKGROUND, display:"flex", padding:"70px 100px 70px 100px", color:"#fff"
            }}>
                <Col span={12}>
                    <Space direction="vertical">
                    <h2>Quý vị muốn đăng ký chỗ nghỉ?</h2>
                    <span>Quý vị muốn đăng chỗ nghỉ của mình trên {APP1.name}? <span style={{cursor:"pointer"}}>Tìm hiểu thêm về đăng chỗ nghỉ trên {APP1.name}.</span></span>
                    </Space>
                </Col>
                <Col span={12}>
                    <Space direction="vertical" style={{display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
                    <span style={{cursor:"pointer"}}>Về {APP1.name}</span>
                    <span style={{cursor:"pointer"}}>Những câu hỏi thường gặp</span>
                    <span style={{cursor:"pointer"}}>Cơ hội việc làm</span>
                    <span style={{cursor:"pointer"}}>Truyền thông</span>
                    <span style={{cursor:"pointer"}}>Bảo mật trên Cookie</span>
                    </Space>
                </Col>
            </Row>
        </div>
     );
}

export default HomePage;