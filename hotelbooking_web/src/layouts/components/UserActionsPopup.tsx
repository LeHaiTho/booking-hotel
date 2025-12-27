import { Avatar, Popover, Space, Tag } from "antd";
import { ReactSVG } from "react-svg";
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'

import { bk_icon_streamline_account_create, bk_icon_streamline_bell_normal, bk_icon_streamline_confirmation, bk_icon_streamline_group, bk_icon_streamline_key, bk_icon_streamline_mobile_phone, bk_icon_streamline_note_edit, bk_icon_streamline_settings, bk_icon_streamline_share, bk_icon_streamline_task_list_heart } from "../../assets/svgs/svgUserActionPopup";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/selector";
import { logout } from "../../redux/Slice/auth/authSlice";
import { useNavigate } from "react-router-dom";
interface Props{
    children: React.ReactNode;
}
function UserActionsPopup(prop:Props) {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const navigate = useNavigate();
    const { children } = prop;
    return ( 
        <Popover style={{padding:0, margin:0}} placement="bottomRight" trigger={"click"} 
        title={
            <Space>
                <Avatar size={"small"} icon={<UserOutlined />} />
                <Space direction="vertical" size={1}>
                     <span>{auth?.email}</span>
                     <Tag color="green">Tài khoản chính</Tag>
                </Space>
            </Space>
        } 
        content={
            <Space direction="vertical" size={1}>
                <Space className="itemUserAction" style={{display:"flex", alignItems:"center", padding:5, cursor:"pointer"}}>
                    <ReactSVG src={bk_icon_streamline_key} />
                    <span>Thay đổi mật khẩu</span>
                </Space>
                <Space className="itemUserAction" style={{display:"flex", alignItems:"center", padding:5, cursor:"pointer"}}>
                    <ReactSVG src={bk_icon_streamline_bell_normal} />
                    <span>Cài đặt thông báo</span>
                </Space>
                <Space className="itemUserAction" style={{display:"flex", alignItems:"center", padding:5, cursor:"pointer"}}>
                    <ReactSVG src={bk_icon_streamline_task_list_heart} />
                    <span>Cá nhân hóa nội dung của Quý vị</span>
                </Space>
                <Space className="itemUserAction" style={{display:"flex", alignItems:"center", padding:5, cursor:"pointer"}}>
                    <ReactSVG src={bk_icon_streamline_account_create} />
                    <span>Tạo và quản lý người dùng</span>
                </Space>
                <Space className="itemUserAction" style={{display:"flex", alignItems:"center", padding:5, cursor:"pointer"}}>
                    <ReactSVG src={bk_icon_streamline_group} />
                    <span>Thông tin liên hệ</span>
                </Space>
                <Space className="itemUserAction" style={{display:"flex", alignItems:"center", padding:5, cursor:"pointer"}}>
                    <ReactSVG src={bk_icon_streamline_mobile_phone} />
                    <span>Các thiết bị của tôi</span>
                </Space>
                <Space className="itemUserAction" style={{display:"flex", alignItems:"center", padding:5, cursor:"pointer"}}>
                    <ReactSVG src={bk_icon_streamline_share} />
                    <span>Nhà cung cấp kết nối</span>
                </Space>
                <Space className="itemUserAction" style={{display:"flex", alignItems:"center", padding:5, cursor:"pointer"}}>
                    <ReactSVG src={bk_icon_streamline_note_edit} />
                    <span>Hợp đồng</span>
                </Space>
                <Space className="itemUserAction" style={{display:"flex", alignItems:"center", padding:5, cursor:"pointer"}}>
                    <ReactSVG src={bk_icon_streamline_settings} />
                    <span>Bảo mật</span>
                </Space>
                <Space className="itemUserAction" style={{display:"flex", alignItems:"center", padding:5, cursor:"pointer"}}>
                    <ReactSVG src={bk_icon_streamline_confirmation} />
                    <span>Trung tâm pháp lý và tuân thủ</span>
                </Space>
                <Space onClick={()=>{
                    dispatch(logout());
                    navigate('/')
                }} className="itemUserAction" style={{display:"flex", alignItems:"center", padding:5, cursor:"pointer"}}>
                    <LogoutOutlined style={{fontSize:20}} />
                    <span>Đăng xuất</span>
                </Space>
            </Space>
        }>
            <span>{children}</span>
        </Popover>
     );
}

export default UserActionsPopup;