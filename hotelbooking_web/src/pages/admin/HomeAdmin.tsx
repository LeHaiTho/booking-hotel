import { Button, Input, Space, Table} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, COLORS, formatDateHour } from "../../constants/constants";
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import "./index.css"
const {Search} = Input
function HomeAdmin() {
    const [dsUser, setDsUser] = useState<any[]>();
    //Lấy thông tin user người dùng
    const getAPIUserNguoidung = async ()=> {
        try{
             //gọi API lấy thông tin user người dùng
            const res = await axios.get(`${baseUrl}hotel-properties/user/get-info/quanly`);
            console.log(res.data);
           setDsUser(res.data);
        }catch(e){
            console.error(e);
        }
    }
    const columns = [
        {title: <span style={{color:"#3A76D2"}}>ID</span>, key:'id', dataIndex: 'id', render: (text: any)=> <span style={{fontWeight:500, color:COLORS.GRAYCOLOR}}>{text}</span>},
        {title: <span style={{color:"#3A76D2"}}>Họ và Tên</span>, key:'id', dataIndex: 'id', render: (_:any, record:any) => <span style={{fontWeight:500, color:COLORS.GRAYCOLOR}}>{`${record?.lastname} ${record?.firstname}`}</span>},
        {title: <span style={{color:"#3A76D2"}}>Email</span>, key:'email', dataIndex: 'email', render: (text: any)=> <span style={{fontWeight:500, color:COLORS.GRAYCOLOR}}>{text}</span>},
        {title: <span style={{color:"#3A76D2"}}>Ngày đăng ký</span>, key:'createdAt', dataIndex: 'createdAt',
        sorter: (a:any, b:any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        showSorterTooltip: false,
         render: (text:any)=> <span style={{fontWeight:500, color:COLORS.GRAYCOLOR}}>{formatDateHour(text)}</span>},
        {title: <span style={{color:"#3A76D2"}}>Chức năng</span>, key:'id', dataIndex: 'id', render: (_:any)=> <Space>
            <Button type="primary" style={{backgroundColor:"orange"}} icon={<FormOutlined />}></Button>
            <Button type="primary" style={{backgroundColor:"red"}} icon={<DeleteOutlined />}></Button>
        </Space>},
    ]
    useEffect(()=>{
        getAPIUserNguoidung();
    },[])
    return ( 
        <div style={{padding:20}}>
            <Space direction="vertical" size={"large"}>
                <h2>Danh sách tìm kiếm</h2>
               <Space direction="vertical" style={{marginBottom:20}}>
                    <Space>
                        <Search placeholder="Nhập Email hoặc Họ và Tên..." style={{zIndex:1, width:500}} enterButton />
                    </Space>
                    <span style={{fontStyle:"italic"}}>Từ khóa tìm kiếm không lớn hơn 64 ký tự</span>
               </Space>
            </Space>
            {
                dsUser && <Table pagination={{pageSize:5}} bordered columns={columns} dataSource={dsUser} />
            }
        </div>
     );
}

export default HomeAdmin;