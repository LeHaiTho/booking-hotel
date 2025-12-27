import { Button, Form, Input, Space } from "antd";
import {APP1, baseUrl, COLORS } from "../../../constants/constants";
import {Privacy_Policy} from "../../component";
import { selectFormLoginMn } from "../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../redux/Slice/auth/formLoginMnSlice";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { login, User } from "../../../redux/Slice/auth/authSlice";

function LoginPassMn() {
    const stateFormLogin = useSelector(selectFormLoginMn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formLogin] = useForm(); 
    const onFinish = async (values:any) => {
        try{
            dispatch(updateForm(values));
            const res = await axios.post(`${baseUrl}auth/login`,{...stateFormLogin, ...values});
            if(res.status === 201){
                //lưu token vào localStorage
                localStorage.setItem('token', res.data.token);
                // Đưa token này lên dữ liệu store của redux 
                const token = localStorage.getItem('token');
                if(token){
                    const decode : User = jwtDecode(token);
                    console.log(decode);
                    dispatch(login(decode));
                    navigate(`/manage/home?token=${token}`);
                }
            }
        }catch(err){
            //Cập nhật lại trường lỗi
            formLogin.setFields([
                {
                    name: ['password'],
                    errors: ["Tài khoản hoặc mật khẩu không chính xác!"]
                }
            ])
        }
    }
    return ( 
        <div style={{display:"flex", justifyContent:"center", backgroundColor:"#fff", paddingTop:40}}>
                <Space direction="vertical" style={{width:350}}>
                    <h2>Nhập mật khẩu của bạn</h2>
                    <span>Vui lòng nhập mật khẩu <span>{APP1.name}</span> của bạn cho <span style={{fontWeight:"bold"}}>{stateFormLogin?.username}.</span>.</span>
                    <Form form={formLogin} onFinish={onFinish} layout="vertical">
                        <Form.Item initialValue={stateFormLogin?.password} name={"password"} label={<span>Mật khẩu</span>} rules={[
                            { required: true, message: "Vui lòng nhập mật khẩu!" },
                        ]}>
                            <Input.Password placeholder="Nhập mật khẩu của bạn" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary" style={{width:"100%", padding:18}}
                            >Đăng nhập</Button>   
                        </Form.Item>
                    </Form>
                    <Button type="text" style={{width:"100%", padding:18, fontWeight:"bold", color:COLORS.ALINK}}
                    >Quên mật khẩu?</Button>
                    <Privacy_Policy />
                </Space>
        </div>
     );
}

export default LoginPassMn;