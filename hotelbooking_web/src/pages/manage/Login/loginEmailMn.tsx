import { Button, Divider, Form, Input, Space } from "antd";
import {COLORS } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import {Privacy_Policy} from "../../component";
import { selectFormLoginMn } from "../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../redux/Slice/auth/formLoginMnSlice";

function LoginEmailMn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateFormLogin = useSelector(selectFormLoginMn);
    const onFinish = (values:any) => {
        try{
            dispatch(updateForm(values));
            navigate('/manage/sigin-pass-manage')
        }catch(err){console.log(err);}
    }
    return ( 
        <div style={{display:"flex", justifyContent:"center", backgroundColor:"#fff", paddingTop:40}}>
                <Space direction="vertical" style={{width:350}}>
                    <h2>Đăng nhập để quản lý chỗ nghỉ</h2>
                    <Form onFinish={onFinish} layout="vertical">
                        <Form.Item initialValue={stateFormLogin?.username} name={"username"} label={<span style={{fontWeight:600}}>Tên đăng nhập</span>}
                        rules={[
                            {required: true, message:"Vui lòng nhập email của bạn"},
                            {type: "email", message:"Email đầu vào không hợp lệ"},
                        ]}>
                            <Input placeholder="nhập tên đăng nhập..." />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary" style={{width:"100%", padding:18}}>Kế tiếp</Button>   
                        </Form.Item>
                    </Form>
                    <Divider style={{margin:"10px 0px 10px 0px"}} />
                    <span style={{fontSize:13, display:"block"}}
                    >Quý vị có thắc mắc về chỗ nghỉ của mình hay extranet? Hãy ghé thăm <span style={{color:COLORS.ALINK, cursor:"pointer"}}>Trung tâm Trợ giúp Đối tác để tìm hiểu thêm.</span></span>
                    <Button type="default" style={{width:"100%", padding:18, color:COLORS.ALINK}}
                    onClick={()=>navigate('/manage/register')}>Tạo tài khoản đối tác</Button>
                    <Privacy_Policy />
                </Space>
        </div>
     );
}

export default LoginEmailMn;