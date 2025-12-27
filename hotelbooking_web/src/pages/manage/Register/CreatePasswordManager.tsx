import { Button, Form, Input, Space } from "antd";
import {useNavigate } from "react-router-dom";
import { updateForm, resetForm } from "../../../redux/Slice/auth/formRegisterMnSlice";
import {selectFormRegisterMn} from  "../../../redux/selector"
import { useDispatch, useSelector } from "react-redux";
import {Privacy_Policy} from "../../component";
import axios from "axios";
import { baseUrl } from "../../../constants/constants";
function CreatePasswordManager() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateForm = useSelector(selectFormRegisterMn)
    const onFinish = async (values:any)=>{
        try{
            dispatch(updateForm(values));
            //stateForm khi nhấn chưa cập nhật kịp sẽ gây lỗi nên, phải giải nén để bắn cho server
            await axios.post(`${baseUrl}auth/register`, {...stateForm, ...values});
            navigate('/manage/verify-account', {state: stateForm});
            dispatch(resetForm());
        }catch(err){console.log(err);}
    }
    return ( 
        <div style={{display:"flex", justifyContent:"center", backgroundColor:"#fff", paddingTop:40}}>
                <Space direction="vertical" style={{width:350}}>
                    <h2>Tạo mật khẩu</h2>
                    <span>Dùng ít nhất 10 ký tự trong đó có chữ hoa, chữ thường và số</span>
                    <Form onFinish={onFinish} layout="vertical">
                        <Form.Item initialValue={stateForm?.password} label={<span style={{fontWeight:600}}>Mật khẩu</span>} name={"password"}
                        rules={[
                            { required: true, message: "Vui lòng nhập mật khẩu!" },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/,
                                message: "Mật khẩu phải có ít nhất 10 ký tự, bao gồm chữ hoa, chữ thường và số!",
                            },
                        ]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label={<span style={{fontWeight:600}}>Xác nhận mật khẩu</span>}
                        name="confirmPassword" initialValue={stateForm?.password}
                        dependencies={['password']}
                        rules={[
                            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                                },
                            }),
                        ]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary" style={{width:"100%", padding:18}}>Tạo tài khoản</Button>
                        </Form.Item>
                    </Form>
                    <Privacy_Policy />
                </Space>
        </div>
     );
}

export default CreatePasswordManager;