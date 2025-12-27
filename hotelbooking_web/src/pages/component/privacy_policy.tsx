import { Divider } from "antd";
import { APP1 } from "../../constants/constants";

function Privacy_Policy() {
    return ( 
        <div>
            <Divider style={{margin:"10px 0px 10px 0px"}} />
            <span style={{fontSize:13, textAlign:"center", display:"block"}}
            >Qua việc đăng nhập hoặc tạo tài khoản bạn đồng ý với các <a href="#">Điều khoản và Điều kiện</a> cũng như <a href="#">Chính sách An toàn và Bảo mật</a> của chúng tôi.</span>
            <Divider style={{margin:"10px 0px 10px 0px"}} />
            <span style={{fontSize:13, textAlign:"center",display:"block"}} >Bảo lưu mọi quyền</span>
            <span style={{fontSize:13, textAlign:"center",display:"block",marginBottom:40}} >Bản quyền (2006-2025)- {APP1.name}</span>
        </div>
     );
}

export default Privacy_Policy;