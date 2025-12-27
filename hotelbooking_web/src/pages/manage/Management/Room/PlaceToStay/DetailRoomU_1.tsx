import { Button, Col, Form,Input,Row, Select, Space } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../../../constants/constants";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
const {Option} = Select;
function DetailRoomU_1() {
    const {idroom} = useParams();// Lấy idroom từ URL params
    const [form] = useForm();
    const [dataRoom, setDataRoom] = useState<any>();
    const TypeRoom = ["Phòng đơn", "Phòng giường đôi", "Phòng 2 giường đơn", "Phòng giường đôi/2 giường đơn",
        "Phòng 3 người", "Phòng 4 người", "Suite", "Phòng gia đình", "Studio", "Căn hộ", "Phòng tập thể",
        "Giường trong phòng tập thể"
    ]
    const NameRoom = ["Phòng Giường Đôi", "Phòng Giường Đôi Có Phòng Tắm Riêng", "Phòng Business 1 Giường Đôi với Quyền sử dụng Phòng tập thể dục.",
        "Phòng Có Giường Cỡ Queen Nhìn Ra Hồ Bơi ", "Phòng Deluxe Giường Đôi" , "Phòng Tiêu Chuẩn Có Giường Cỡ King",
        "Phòng Có Giường Cỡ King - Phù Hợp Cho Khách Khuyết Tật", "Phòng Có Giường Cỡ King", "Phòng Có Giường Cỡ King Nhìn Ra Biển",
        "Phòng Có Giường Cỡ King Nhìn Ra Hồ Bơi", "Phòng Có Giường Cỡ King Nhìn Ra Hồ Nước", "Phòng Có Giường Cỡ King Nhìn Ra Vườn",
        "Phòng Có Giường Cỡ King Với Ban Công","Phòng Có Giường Cỡ King Với Phòng Tắm Phù Hợp Cho Người Đi Xe Lăn - Phù Hợp Cho Khách Khuyết Tật",
        "Phòng Có Giường Cỡ Queen", "Phòng Có Giường Cỡ Queen - Phù Hợp Cho Khách Khuyết Tật", "Phòng Có Giường Cỡ Queen Nhìn Ra Biển",
        "Phòng Có Giường Cỡ Queen Nhìn Ra Vườn", "Phòng Có Giường Cỡ Queen Và Bồn Tắm Spa", "Phòng Có Giường Cỡ Queen Với Ban Công",
        "Phòng Có Giường Cỡ Queen Với Phòng Tắm Chung", "Phòng Deluxe", "Phòng Deluxe (1) Người lớn + 1 Trẻ em)",
        "Phòng Deluxe (1 người lớn + 2 trẻ em)", "Phòng Deluxe (2 Người lớn + 1 Trẻ em)", "Phòng Deluxe Có Giường Cỡ Queen",
        "Phòng Deluxe Có Giường Cỡ King", "Phòng Deluxe Giường Đôi (1 người lớn + 1 trẻ em)", "Phòng Deluxe Giường Đôi Có Vòi Sen",
        "Phòng Deluxe Giường Đôi Có Ban Công", "Phòng Deluxe Giường Đôi Có Bồn Tắm", "Phòng Deluxe Giường Đôi Kèm Giường Phụ",
        "Phòng Deluxe Giường Đôi Nhìn Ra Biển","Phòng Deluxe Giường Đôi Nhìn Ra Biển Từ Phía Bên Cạnh", "Phòng Deluxe Giường Đôi Với Ban Công và Tầm Nhìn Ra Biển",
        "Phòng Deluxe Giường Đôi/2 Giường Đơn","Phòng Deluxe Giường đôi (1 người lớn + 2 trẻ em)","Phòng Deluxe Đôi Nhìn ra Lâu đài",
        "Phòng Giường Đôi (1 Người lớn + 1 Trẻ em)","Phòng Giường Đôi - Có thiết kế cho Khách khuyết tật","Phòng Giường Đôi Có Ban Công",
        "Phòng Giường Đôi Có Ban Công (2) Người Lớn + 1 Trẻ Em)","Phòng Giường Đôi Có Ban Công (3 Người Lớn)","Phòng Giường Đôi Có Bồn Tắm Spa",
        "Phòng Giường Đôi Có Giường Phụ","Phòng Giường Đôi Có Sân Hiên","Phòng Giường Đôi Có Sân Trong","Phòng Giường Đôi Hạng Bình Dân",
        "Phòng Giường Đôi Hạng Tiết Kiệm","Phòng Giường Đôi Lớn", "Phòng Giường Đôi Nhìn Ra Biển","Phòng Giường Đôi Nhìn Ra Hồ Bơi",
        "Phòng Giường Đôi Nhìn Ra Hồ Nước", "Phòng Giường Đôi Nhìn Ra Núi", "Phòng Giường Đôi Nhìn Ra Vườn", "Phòng Giường Đôi Nhỏ",
        "Phòng Giường Đôi Với Phòng Tắm Chung","Phòng Giường Đôi Với Phòng Tắm Riêng Bên Ngoài","Phòng Giường Đôi có Ban công và Nhìn ra Biển",
        "Phòng Giường Đôi với Nhà vệ sinh Chung","Phòng Giường đôi Deluxe (2 Người lớn + 1 Trẻ em)","Phòng Superior Có Giường Cỡ King",
        "Phòng Superior Có Giường Cỡ Queen","Phòng Superior Giường Đôi","Phòng Tiêu Chuẩn Có Giường Cỡ Queen","Phòng Tiêu Chuẩn Giường Đôi",
        "Phòng Tiêu Chuẩn Giường Đôi Có Quạt Máy","Phòng Tiêu Chuẩn Giường Đôi Với Phòng Tắm Chung","Phòng có giường cỡ King với Bồn tắm Spa",
        "Phòng có giường cỡ King nhìn ra cảnh núi non"
    ]
    const getAPIroombyID = async () => {
        try{
            const res = await axios.get(`${baseUrl}hotel-properties/room/get-rooms-update/${idroom}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            })
            setDataRoom(res.data);
            console.log(res.data)
        }catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        getAPIroombyID();
    }, [])
    const onFinish = async (values: any) => {
        try{
            try{
                const res = await axios.post(`${baseUrl}hotel-properties/room/get-rooms-update/update-room/10`,values,{
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                });
                console.log(res.data);
            }catch(err){
                console.log(err);
            }
        }catch(err){
            console.log(err);
        }
    }
    return ( 
       <div style={{padding:"20px 60px 40px 60px", backgroundColor:"#fff"}}>
           {
                dataRoom && 
                <Form layout="vertical" form={form} onFinish={onFinish}>
                <div style={{border:"1px solid #cecece", padding:10, position:"relative", marginTop:20}}>
                    <h1 style={{fontWeight:400, position:"absolute", top:-20, left:5, backgroundColor:"#fff", padding:"0px 10px 10px 10px"}}>Chi tiết phòng</h1>
                    <Space direction="vertical" style={{marginTop:20}}>
                        {/* Loại phòng */}
                       <Row>
                           <Col span={12} style={{padding:10}}>
                               <Form.Item label="Loại phòng" name="loaichonghi" initialValue={dataRoom?.room?.loaichonghi}>
                                   <Select placeholder="Chọn loại phòng">
                                       {
                                           TypeRoom && TypeRoom.map((item:any, index)=>{
                                               return <Option key={index} value={item}>{item}</Option>
                                           })
                                       }
                                   </Select>
                               </Form.Item>
       
                                {/* Tên phòng */}
                               <Form.Item label="Tên phòng" name="nameroom" initialValue={dataRoom?.room?.nameroom}>
                                   <div>
                                       <Select placeholder="Chọn tên phòng" defaultValue={dataRoom?.room?.nameroom}>
                                           {
                                               NameRoom && NameRoom.map((item:any, index)=>{
                                                   return <Option key={index} value={item}>{item}</Option>
                                               })
                                           }
                                       </Select>
                                       <span style={{fontSize:13, color:"#737373"}}>Đây là tên mà khách sẽ thấy trên trang web Booking.com.</span>
                                   </div>
                               </Form.Item>
       
                                 {/* Số phòng */}
                                   <Form.Item label="Số phòng (loại này)" name="sophong" initialValue={dataRoom?.room?.sophong}>
                                       <div>
                                           <Input max={1000} min={1} type="number" defaultValue={dataRoom?.room?.sophong} />
                                           <span style={{fontSize:13, color:"#737373"}}>Trong số 1 phòng tại chỗ nghỉ của Quý vị</span>
                                       </div>
                                   </Form.Item>
                           </Col>
                           <Col span={12} style={{padding:10, display:"flex",flexDirection:"column"}}>
                           {/* Đơn vị đo */}
                               <Form.Item label="Đơn vị đo" name="donvido" initialValue={dataRoom?.room?.donvido}>
                                   <Select placeholder="Chọn loại phòng" defaultValue={dataRoom?.room?.donvido}>
                                       <Option value="met">mét vuông</Option>
                                       <Option value="feet">feet vuông</Option>
                                   </Select>
                               </Form.Item>
                               {/* Diện tích phòng  */}
                               <Form.Item label="Diện tích phòng" name="dientichphong" initialValue={dataRoom?.room?.dientichphong}>
                                   <Input type="number" max={1000} min={1} defaultValue={dataRoom?.room?.dientichphong} />
                               </Form.Item>
                               {/* Tên tùy chọn */}
                               <Form.Item label="Tên tùy chọn (không bắt buộc)">
                                   <div>
                                       <Input placeholder="Nhập tên tùy chọn" />
                                       <span style={{fontSize:13, color:"#737373"}}>Tạo tên tùy chọn riêng để tham khảo.</span>
                                   </div>
                               </Form.Item>
                           </Col>
                       </Row>
                        </Space>
                </div>
    
                {/* Tùy chọn giường  */}
                <div style={{border:"1px solid #cecece", padding:10, position:"relative", marginTop:40}}>
                    <h1 style={{fontWeight:400, position:"absolute", top:-20, left:5, backgroundColor:"#fff", padding:"0px 10px 10px 10px"}}>Tùy chọn giường</h1>
                    <Space  direction="vertical" style={{marginTop:20, backgroundColor:"#f5f5f5", padding:20, width:"100%"}}>
                        <Space direction="vertical" size={1} style={{width:"100%"}}>
                            <span style={{fontWeight:"bold", color:"#0077CC"}}>Loại giường thông thường</span>
                           <Space style={{ marginTop:10}}>
                                <div style={{minWidth:500}}><span style={{fontWeight:"bold", color:"#545454"}}>Phòng này có giường loại nào?</span></div>
                                <span style={{fontWeight:"bold", color:"#545454"}} >Số lượng</span>
                           </Space>
                            
                            <Space style={{width:"100%", marginTop:10}}>
                                {/* Tên giường */}
                                <Form.Item>
                                    <Space style={{padding:10, border:"1px solid #cecece", width:500 ,backgroundColor:"#fff"}}>Giường đơn / 90 - 130cm chiều rộng</Space>
                                </Form.Item>
                               
                                {/* Số phòng */}
                                <Form.Item name="giuongdon" initialValue={dataRoom?.beds?.["1"]?.quantity || 0}>
                                    <Input style={{padding:10}} max={100} min={0} type="number" />
                                </Form.Item>
                            </Space>
                            <Space style={{width:"100%"}}>
                                {/* Tên giường */}
                                <Form.Item label="">
                                    <Space style={{padding:10, border:"1px solid #cecece", width:500 ,backgroundColor:"#fff"}}>Giường đôi / 131-150cm chiều rộng</Space>
                                </Form.Item>
                                {/* Số phòng */}
                                <Form.Item label="" name="giuongdoi" initialValue={dataRoom?.beds?.["2"]?.quantity || 0 }>
                                    <Input style={{padding:10}} max={100} min={0} type="number" />
                                </Form.Item>
                            </Space>
                            <Space style={{width:"100%"}}>
                                {/* Tên giường */}
                                <Form.Item label="" >
                                    <Space style={{padding:10, border:"1px solid #cecece", width:500 ,backgroundColor:"#fff"}}>Giường lớn (cỡ King) / 151 - 180cm chiều rộng</Space>
                                </Form.Item>
                                {/* Số phòng */}
                                <Form.Item label="" name="giuonglon" initialValue={dataRoom?.beds?.["3"]?.quantity || 0}>
                                    <Input style={{padding:10}} max={100} min={0} type="number" />
                                </Form.Item>
                            </Space>
                            <Space style={{width:"100%"}}>
                                {/* Tên giường */}
                                <Form.Item label="">
                                    <Space style={{padding:10, border:"1px solid #cecece", width:500 ,backgroundColor:"#fff"}}>Giường cực lớn (cỡ Super-king) / 181 - 210cm chiều rộng</Space>
                                </Form.Item>
                                {/* Số phòng */}
                                <Form.Item label="" name="giuongcuclon" initialValue={dataRoom?.beds?.["4"]?.quantity || 0}>
                                    <Input style={{padding:10}} max={100} min={0} type="number" />
                                </Form.Item>
                            </Space>
                            <Space style={{width:"100%"}}>
                                {/* Tên giường */}
                                <Form.Item label="" >
                                    <Space style={{padding:10, border:"1px solid #cecece", width:500 ,backgroundColor:"#fff"}}>Giường tầng / Nhiều kích cỡ</Space>
                                </Form.Item>
                                {/* Số phòng */}
                                <Form.Item label="" name="giuongtang" initialValue={dataRoom?.beds?.["5"]?.quantity || 0}>
                                    <Input style={{padding:10}} max={100} min={0} type="number" />
                                </Form.Item>
                            </Space>
                            <Space style={{width:"100%"}}>
                                {/* Tên giường */}
                                <Form.Item label="">
                                    <Space style={{padding:10, border:"1px solid #cecece", width:500 ,backgroundColor:"#fff"}}>Giường sofa / Nhiều kích cỡ</Space>
                                </Form.Item>
                                {/* Số phòng */}
                                <Form.Item label="" name="giuongsofa" initialValue={dataRoom?.beds?.["6"]?.quantity || 0}>
                                    <Input style={{padding:10}} max={100} min={0} type="number" />
                                </Form.Item>
                            </Space>
                            <Space style={{width:"100%"}}>
                                {/* Tên giường */}
                                <Form.Item label="">
                                    <Space style={{padding:10, border:"1px solid #cecece", width:500 ,backgroundColor:"#fff"}}>Nệm Futon / Nhiều kích cỡ</Space>
                                </Form.Item>
                                {/* Số phòng */}
                                <Form.Item label="" name="giuongfuton" initialValue={dataRoom?.beds?.["7"]?.quantity || 0}>
                                    <Input style={{padding:10}} max={100} min={0} type="number" />
                                </Form.Item>
                            </Space>               
                        </Space>
                    </Space>
                </div>
                <div style={{marginTop:20}}>
                    <Row style={{display:"flex", justifyContent:"space-between"}}>
                        <Col span={11}>
                            <Form.Item>
                                <Button style={{padding:20}} block>Quay lại Phần tổng quan phòng</Button>
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item>
                                <Button style={{padding:20}} block type="primary" htmlType="submit" >Tiếp tục</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
           </Form>
           }
       </div>
     );
}

export default DetailRoomU_1;