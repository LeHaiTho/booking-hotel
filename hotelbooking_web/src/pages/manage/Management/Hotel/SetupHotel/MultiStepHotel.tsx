import { Button, Col, Divider, Row, Space } from "antd";
import { ReactSVG } from 'react-svg';
import { multistep1, multistep2, multistep3, multistep4 } from "../../../../../assets/svgs/svgMultiStepHotel";
import { useNavigate, useParams } from "react-router-dom";
import {SwapOutlined} from '@ant-design/icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, formatCurrency } from "../../../../../constants/constants";
function MultiStepHotel() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [roomHotel, setRoomHotel] = useState<any[]>([]); //lấy Phòng trong khách sạn
    // lấy token lên để tránh copy link vào trang 
    const token = localStorage.getItem('token');
    const getAPI_Room = async () => {
        try{
            const res = await axios.get(`${baseUrl}hotel-properties/room/get-roombeds/${id}`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            if(res.status===200){
                setRoomHotel(res.data);
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getAPI_Room();
    },[])
    return ( 
        <Space direction="vertical" size={"large"} style={{display:"flex",alignItems:"center",padding:"20px 0px 20px 0px"}}>
           <Space style={{width:800, height:90, backgroundColor:"#fff",padding:20,justifyContent:"space-between", alignItems:"center"}}>
                <Space size={"middle"}>
                    <ReactSVG src={multistep1} />
                    <Space direction="vertical" size={1}>
                        <span style={{fontSize:12, color:"#595959"}}>Bước 1</span>
                        <span style={{fontSize:16,fontWeight:"bold"}}>Thông tin chỗ nghỉ</span>
                        <span style={{fontSize:12, color:"#595959"}}>Các thông tin cơ bản. Nhập tên chỗ nghỉ, địa chỉ, tiện nghi và nhiều hơn nữa.</span>
                    </Space>
                </Space>
                <Button onClick={()=>{
                    // navigate(`/manage/register-hotel/type?token=${token}`)
                }}
                 type="link">Chỉnh sửa</Button>
           </Space>

           <Space direction="vertical" size={1} style={{backgroundColor:"#fff"}}>
                <Space style={{width:800, height:110, backgroundColor:"#fff",padding:20,justifyContent:"space-between", alignItems:"center"}}>
                        <Space size="middle">
                            <ReactSVG src={multistep2} />
                            <Space direction="vertical" size={1}>
                                <span style={{fontSize:12, color:"#595959"}}>Bước 2</span>
                                <span style={{fontSize:16,fontWeight:"bold"}}>Phòng</span>
                                <span style={{fontSize:12, color:"#595959"}}>Hãy cho chúng tôi biết về phòng đầu tiên của Quý vị. Sau khi đã thiết lập xong một căn, Quý vị có thể thêm nhiều căn nữa.</span>
                            </Space>
                        </Space>
                        <Button onClick={()=>{navigate(`/manage/register-hotel/setup-room/room-details/${id}?token=${token}`)}} type="primary">Thêm phòng</Button>
                </Space>
                <Divider style={{margin:0}} />
                {
                    (roomHotel && roomHotel.length > 0) ? roomHotel.map((item:any)=>{
                        return <div key={item.id}>
                            <Row style={{padding:20}}>
                                <Col span={3} style={{display:"flex",justifyContent:"flex-start", alignItems:"center"}}>
                                    <img src={'https://q.bstatic.com/static/img/join/illustrated_bedroom.jpg'} height={60} width={60} alt="anh" />
                                </Col>
                                <Col span={15} style={{display:"flex", alignItems:"center"}}>
                                <Space direction="vertical" size={1} style={{width:"100%"}}>
                                    <h3>Phòng Giường Đôi</h3>
                                    <Row>
                                        <Col span={5}><span style={{fontSize:12, color:"#595959", fontWeight:600}}>Lượng khách</span></Col>
                                        <Col span={4}><span style={{fontSize:12, color:"#595959", fontWeight:600}}>Giường</span></Col>
                                        <Col span={5}><span style={{fontSize:12, color:"#595959", fontWeight:600}}>Phòng tắm</span></Col>
                                        <Col span={5}><span style={{fontSize:12, color:"#595959", fontWeight:600}}>Giá</span></Col>
                                        <Col span={5}><span style={{fontSize:12, color:"#595959", fontWeight:600}}>Phòng loại này</span></Col>
                                    </Row>
                                    <Row>
                                        <Col span={5}><span style={{fontSize:12, color:"#595959", fontWeight:600}}>{item?.soluongkhach}</span></Col>
                                        <Col span={4}><span style={{fontSize:12, color:"#595959", fontWeight:600}}>{item?.total_beds}</span></Col>
                                        <Col span={5}><span style={{fontSize:12, color:"#595959", fontWeight:600}}>{item?.phongtamrieng ? "Riêng" : "Chung"}</span></Col>
                                        <Col span={5}><span style={{fontSize:12, color:"#595959", fontWeight:600}}>{`VND ${formatCurrency(item?.sotien).split('₫')[0]}`}</span></Col>
                                        <Col span={5}><span style={{fontSize:12, color:"#595959", fontWeight:600}}>{item?.sophong}</span></Col>
                                    </Row>
                                </Space>
                                </Col>
                                <Col span={6} style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
                                    <Space size={1}>
                                        <Button disabled={true} type="text" style={{padding:10, fontSize:14, fontWeight:600}}>Xóa</Button>
                                        <Button type="text" style={{padding:10, fontSize:14, fontWeight:600, color:"#006ce4"}} iconPosition="end" icon={<SwapOutlined />}>Chỉnh sửa</Button>
                                    </Space>
                                </Col>
                            </Row>
                            <Divider style={{margin:0}} />
                        </div>
                    }) : <div></div>
                }

           </Space>
           
           <Space style={{width:800, height:90, backgroundColor:"#fff",padding:20,justifyContent:"space-between", alignItems:"center"}}>
                <Space size="middle">
                    <ReactSVG src={multistep3} />
                    <Space direction="vertical" size={1}>
                        <span style={{fontSize:12, color:"#595959"}}>Bước 3</span>
                        <span style={{fontSize:16,fontWeight:"bold"}}>Ảnh</span>
                        <span style={{fontSize:12, color:"#595959"}}>Chia sẻ một số hình ảnh chỗ nghỉ của Quý vị để khách biết mình nên có những kỳ vọng gì.</span>
                    </Space>
                </Space>
                <Button onClick={()=> { navigate(`/manage/register-hotel/setup-room/image-room/${id}?token=${token}`);}}
                 type="default">Thêm ảnh</Button>
           </Space>
           <Space style={{width:800, height:90, backgroundColor:"#fff",padding:20,justifyContent:"space-between", alignItems:"center"}}>
                <Space size="middle">
                    <ReactSVG src={multistep4} />
                    <Space direction="vertical" size={1}>
                        <span style={{fontSize:12, color:"#595959"}}>Bước 4</span>
                        <span style={{fontSize:16,fontWeight:"bold"}}>Những bước cuối cùng</span>
                        <span style={{fontSize:12, color:"#595959"}}>Nhập thông tin thanh toán và hóa đơn trước khi mở để nhận đặt phòng.</span>
                    </Space>
                </Space>
                <Button onClick={()=>{navigate(`/manage/register-hotel/setup-room/payment/${id}?token=${token}`)}}
                type="text">Thêm các thông tin cuối cùng</Button>
           </Space>
        </Space>
     );
}

export default MultiStepHotel;