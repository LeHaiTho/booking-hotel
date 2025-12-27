import { Button, Empty, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../../constants/constants";
import { useSelector } from "react-redux";
import { selectHotelMn } from "../../../../../redux/selector";
import { useNavigate } from "react-router-dom";

function DetailRoomU() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [rooms, setRooms] = useState<any[]>([]);//lấy những phòng theo khách sạn
    const hotel = useSelector(selectHotelMn)

    const getApiRoom = async () => {
        if(hotel){
            //gọi API lấy phòng theo khách sạn
            const res = await axios.get(`${baseUrl}hotel-properties/room/get-roombeds/${hotel?.id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            // console.log(res.data)
            setRooms(res.data)
        }
    }
    useEffect(()=>{
        getApiRoom();
    },[hotel])
    return ( 
        <div style={{padding:"20px 20px 60px 20px", backgroundColor:"#fff"}}>
            <h1 style={{fontWeight:400, marginTop:20, marginBottom:40}}>Chi tiết phòng</h1>
            <Space wrap size={"large"}>
                {
                    rooms ? rooms.map((item: any)=>{
                        return <Space key={item?.id} direction="vertical" style={{border:"1px solid #cecece"}}>
                        <div style={{position:"relative"}}>
                            <img src="https://q.bstatic.com/static/img/join/illustrated_bedroom.jpg"
                            height={330} width={348} alt="image" />
                            <div>
                                <Space direction="vertical" style={{position:"absolute", bottom:0, left:0, right:0, padding:10,
                                    background:"rgba(0, 0, 0, 0.5)", color:"#fff", textShadow:"2px 2px 4px rgba(0, 0, 0, 0.8)"
                                }}>
                                    <h2>{item?.nameroom}</h2>
                                    <span>{`(${item?.id}-1312431234)`}</span>
                                </Space>
                            </div>
                        </div>
    
                        <Space direction="vertical" style={{padding:10}}>
                            <span>Số khách tối đa: <span style={{fontWeight:"bold"}}>{item?.soluongkhach} khách</span></span>
                            <span>Số người lớn tối đa: <span style={{fontWeight:"bold"}}>{item?.soluongkhach} người lớn</span></span>
                            <span>Số trẻ em tối đa: <span style={{fontWeight:"bold"}}>{item?.soluongkhach} trẻ em</span></span>
                            <span>Số lượng loại này: <span style={{fontWeight:"bold"}}>1</span></span>
                        </Space>
    
                        <Space style={{padding:10}}>
                            <Button onClick={()=>navigate(`/manage/place-to-stay-room/detail-room-u1/${item?.id}?token=${token}`)}>Chỉnh sửa</Button>
                            <Button type="primary">Đăng tải hình ảnh</Button>
                        </Space>
                    </Space>
                    })  : <Empty />
                }
            </Space>
        </div>
     );
}

export default DetailRoomU;