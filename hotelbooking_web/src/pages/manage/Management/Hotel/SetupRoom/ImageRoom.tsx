import { Button, Col, Divider, Row, Space} from "antd";
import {CameraOutlined, CloseOutlined, LeftOutlined} from '@ant-design/icons';
import { baseUrl, COLORS } from "../../../../../constants/constants";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function ImageRoom() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<any[]>([]);
    const {idhotel} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleDrop = (e:any)=>{
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer?.files).map((file:any)=>{
        return {
          id: `${file.name}-${Date.now()}`, // Tạo id duy nhất
          file,
          preview: URL.createObjectURL(file)
        }
     });
      console.log(droppedFiles);
      setFileList([...fileList, ...droppedFiles]);
   }
   const handleRemove = (preview: string)=>{
      // Lọc ra những file không có preview trùng với cái cần xóa
      setFileList((prevFileList) => prevFileList.filter((file) => file.preview !== preview));
   }
    const handleChange = (e:any)=>{
       e.preventDefault();
       const files = Array.from(e.target?.files).map((file:any)=>{
          return {
            id: `${file.name}_${Date.now()}`, // Tạo id duy nhất
            file,
            preview: URL.createObjectURL(file)
          }
       });
       setFileList([...fileList,...files]);
    }
    const handleSubmit = async () => {
       try{
          const formData = new FormData();
          if(fileList.length >= 5 && fileList.length <= 10){
            fileList.forEach((file) => {
                formData.append("images", file.file);
             });
             const res = await axios.post(`${baseUrl}hotel-properties/hotel/create-image/${idhotel}`, formData, {
               headers: {Authorization: `Bearer ${token}`}
             })
             if(res.status===200){
                navigate(`/manage/register-hotel/setup-hotel/multi-step-hotel/${idhotel}?token=${token}`)
             }
          }
       }catch(err){
         console.log(err);
       }
    }
    return (
        <Space direction="vertical" style={{padding:"60px 200px 60px 200px", height:"100vh"}}>
           {/* Thanh tiến trình  */}
           <Row style={{position:"fixed", top:64, right:0, left:0, display:"flex", zIndex:2}}>
                  <Col span={24}>
                      <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"100%"}}></div>
                  </Col>
            </Row>
            <h1 style={{fontSize:35}}>Khách sạn của Quý vị trông ra sao?</h1>
            <Space direction="vertical" style={{backgroundColor:"#fff", padding:20, width:600}}>
                <span><span style={{fontWeight:600}}>Đăng tải ít nhất 5 ảnh của chỗ nghỉ.</span> Càng đăng nhiều, Quý vị càng có cơ hội nhận đặt phòng. Quý vị có thể thêm ảnh sau.</span>
                
                    <Space onDragOver={(e) => e.preventDefault()} 
                    onDrop={handleDrop}
                    size={"middle"} direction="vertical" style={{marginTop:20,border: "1px dashed gray", padding:20, display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <span style={{fontWeight:600}}>Kéo và thả hoặc</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/jpeg, image/png"
                          style={{display:"none"}}
                          onChange={handleChange}
                          // onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])}
                        />
                        <Button onClick={()=>{
                           fileInputRef.current?.click();
                        }}
                        style={{color:COLORS.BACKGROUND, border:"1px solid #003b95"}} icon={<CameraOutlined style={{color:COLORS.BACKGROUND}} />} type="default">Đăng tải ảnh</Button>
                        <span style={{fontWeight:300}}>jpg/jpeg hoặc png, tối đa 47MB mỗi file</span>
                    </Space>
                    <Divider style={{margin:"5px 0px 5px 0px"}} />
                    <Space wrap size={"large"} style={{display:"flex", justifyContent:"space-between"}}>
                        {
                          (fileList && fileList.length > 0) ? fileList.map((item:any)=>{
                              return <div key={item?.id} style={{position:"relative"}}>
                                <img key={item?.id}  style={{objectFit:"cover", border:"1px solid #cecece"}} src={item?.preview} alt="anh" width={255} height={250} />
                                <Button onClick={()=>{handleRemove(item?.preview)}}
                                style={{position:"absolute", top:2, right:2, backgroundColor:"#fff", border:"1px solid #000"}} 
                                shape="circle" type="primary" icon={<CloseOutlined style={{color:"#000"}} />}></Button>
                              </div>
                          }) : <div></div>
                        }
                    </Space>

                    <Row>
                        <Col span={3}><Button onClick={()=>{navigate(-1)}} style={{padding:18}} icon={<LeftOutlined />} block></Button></Col>
                        <Col span={21}><Button disabled={fileList.length <5} onClick={handleSubmit}
                        type="primary" style={{marginLeft:10,padding:18}} block>Tiếp tục</Button></Col>
                    </Row>
            </Space>
        </Space>
     );
}

export default ImageRoom;