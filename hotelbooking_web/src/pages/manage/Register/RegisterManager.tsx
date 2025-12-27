import { Button, Divider, Form, Input, Space } from "antd";
import { COLORS } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import { selectFormRegisterMn } from "../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { updateForm} from "../../../redux/Slice/auth/formRegisterMnSlice";
import {Privacy_Policy} from "../../component";
function RegisterManager() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formRegisterMnSelector = useSelector(selectFormRegisterMn);

    const onFinishEmail = (values:any) => {
        //Thành công mới vào đây
        // console.log("Success:", values);
        dispatch(updateForm(values));
        // console.log(formRegisterMnSelector);
        navigate("/manage/contact-info");
    };

    return ( 
        <div style={{display:"flex", justifyContent:"center", backgroundColor:"#fff", paddingTop:40}}>
                <Space direction="vertical" style={{width:350}}>
                    <h2>Tạo tài khoản đối tác</h2>
                    <span>Tạo tài khoản để đăng ký và quản lý chỗ nghỉ.</span>
                    <span style={{fontWeight:600}}>Địa chỉ email</span>
                    <Form onFinish={onFinishEmail} layout="vertical">
                        <Form.Item initialValue={formRegisterMnSelector?.email} name={"email"} rules={[
                            {required: true, message:"Vui lòng nhập email của bạn"},
                            {type: "email", message:"Email đầu vào không hợp lệ"},
                        ]}>
                            <Input placeholder="nhập địa chỉ email..."></Input>
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit" type="primary" style={{width:"100%", padding:18}}>Tiếp tục</Button>
                        </Form.Item>
                    </Form>
                    <Divider style={{margin:"10px 0px 10px 0px"}} />
                    <span style={{fontSize:13, textAlign:"center", display:"block"}}
                    >Quý vị có thắc mắc về chỗ nghỉ của mình hay extranet? Hãy ghé thăm <span style={{color:COLORS.ALINK, cursor:"pointer"}}>Trung tâm Trợ giúp Đối tác</span> để tìm hiểu thêm</span>
                    <Button type="default" style={{width:"100%",padding:18}} >Đăng nhập</Button>
                    <Privacy_Policy />
                </Space>
        </div>
     );
}

export default RegisterManager;