import { Button, Form, Input, Space } from "antd";
import { APP1, baseUrl, COLORS } from "../../../constants/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, User } from "../../../redux/Slice/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values: any) => {
        try{
            const res = await axios.post(`${baseUrl}auth/login`, values);
            if(res.status===201){
                //lưu token vào localStorage
                localStorage.setItem('token', res.data.token);
                // Đưa token này lên dữ liệu store của redux 
                const token = localStorage.getItem('token');
                if(token){
                    const decode : User = jwtDecode(token);
                    console.log(decode);
                    dispatch(login(decode));
                    navigate(`/admin/home/trangchu-index`);
                }    
            }
        }catch(err){
            console.error(err)
        }
    }

    return ( 
        <div style={{display:"flex",height:"100vh", justifyContent:"center", alignItems:"center"}}>
            <Space direction="vertical" style={{border:"1px solid #cecece", padding:20, display:"flex"}}>
                <h1 style={{fontFamily:"sans-serif", color:COLORS.BACKGROUND, fontStyle:"italic", textAlign:"center"}}>{APP1.name}</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label={<span style={{fontWeight:500}}>Email</span>} name={"username"} rules={[
                        {required: true, message:"Vui lòng nhập email của bạn!"},
                        {type:"email", message:"Email không hợp lệ!"}
                    ]}>
                        <Input style={{width:300}} placeholder="Nhập email của bạn"></Input>
                    </Form.Item>
                    <Form.Item label={<span style={{fontWeight:500}}>Mật khẩu</span>} name={"password"} rules={[
                        {required: true, message:"Vui lòng nhập mật khẩu của bạn!"},
                    ]}>
                        <Input.Password style={{width:300}} placeholder="Nhập mật khẩu của bạn"></Input.Password>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" block>Đăng nhập</Button>
                    </Form.Item>
                    
                </Form>
                <span style={{display:"flex",fontFamily:"sans-serif", fontSize:13, color:"gray", justifyContent:"center"}}>Bạn đang gặp sự cố khi đăng nhập</span>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                margin: '16px 0',
                }}>
                <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #e0e0e0' }} />
                <span style={{ padding: '0 10px', color: '#999', fontSize: '12px' }}>or</span>
                <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #e0e0e0' }} />
                </div>
                <Button type="primary" block>Trợ giúp</Button>
            </Space>
        </div>
     );
}

export default LoginAdmin;