import { Button, Form, Input, Space } from "antd";
import { APP1 } from "../../../constants/constants";
import "react-phone-number-input/style.css";
import PhoneNumberInput from "react-phone-number-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectFormRegisterMn } from "../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../redux/Slice/auth/formRegisterMnSlice";
import { Privacy_Policy } from "../../component";

function ContactInfoManager() {
  const stateForm = useSelector(selectFormRegisterMn); //lấy biến form
  const [countrycode, setContrycode] = useState(
    stateForm?.country_code || "+84"
  );
  const dispatch = useDispatch();
  const handleChange = (phone: any) => {
    console.log(phone);
    setContrycode(phone);
  };
  const navigate = useNavigate();

  const onFinishContact = (values: any) => {
    try {
      // console.log('success', values)
      //lấy nội dung của form
      dispatch(updateForm(values));
      navigate("/manage/create-password");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingTop: 40,
      }}
    >
      <Space direction="vertical" style={{ width: 350 }}>
        <h2>Thông tin liên lạc</h2>
        <span>
          Để tài khoản {APP1.name} của bạn được bảo mật chúng tôi cần biết họ
          tên đầy đủ và số điện thoại của bạn
        </span>
        <Form layout="vertical" onFinish={onFinishContact}>
          <Form.Item
            initialValue={stateForm?.firstname}
            name={"firstname"}
            label={<span style={{ fontWeight: 600 }}>Tên</span>}
            rules={[
              { required: true, message: "Vui lòng nhập tên của bạn" },
              { min: 2, message: "Tên của bạn phải ít nhất 2 ký tự" },
              { max: 20, message: "Tên của bạn phải nhiều nhất 10 ký tự" },
            ]}
          >
            <Input placeholder={"Nhập tên của bạn..."}></Input>
          </Form.Item>
          <Form.Item
            initialValue={stateForm?.lastname}
            name={"lastname"}
            label={<span style={{ fontWeight: 600 }}>Họ</span>}
            rules={[
              { required: true, message: "Vui lòng nhập tên của bạn" },
              { min: 2, message: "Tên của bạn phải ít nhất 2 ký tự" },
              { max: 20, message: "Tên của bạn phải nhiều nhất 10 ký tự" },
            ]}
          >
            <Input placeholder={"Nhập họ của bạn..."}></Input>
          </Form.Item>
          {/* Chọn mã vùng quốc tế  */}
          {/* <Form.Item initialValue={stateForm?.country_code || countrycode} name={"country_code"} label={<span style={{fontWeight:600}}>Số điện thoại</span>}>
                            <PhoneNumberInput
                                international
                                defaultCountry="VN" // Mã vùng mặc định cho Việt Nam
                                value={countrycode}
                                onChange={handleChange}
                            />
                        </Form.Item> */}
          <Form.Item
            initialValue={stateForm?.phonenumber}
            name={"phonenumber"}
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                validator: (_, value) => {
                  const phoneRegex = /^[0-9]{9,11}$/; // Chỉ cho phép số từ 10 đến 15 chữ số
                  if (!value || phoneRegex.test(value)) {
                    return Promise.resolve(); // Hợp lệ
                  }
                  return Promise.reject(
                    new Error("Số điện thoại không hợp lệ (10 - 12 số)")
                  );
                },
              },
            ]}
          >
            <Space.Compact>
              <Input
                style={{ width: "20%" }}
                value={countrycode}
                defaultValue={countrycode}
              />
              <Input
                defaultValue={stateForm?.phonenumber}
                style={{ width: "80%" }}
                placeholder="Nhập số điện thoại ..."
              />
            </Space.Compact>
          </Form.Item>
          <span style={{ fontSize: 13 }}>
            Chúng tôi sẽ gửi mã xác thực 2 yếu tố đến số này khi Quý vị đăng
            nhập.
          </span>
          <Form.Item style={{ marginTop: 5 }}>
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100%", padding: 18 }}
            >
              Tiếp theo
            </Button>
          </Form.Item>
        </Form>
        <Privacy_Policy />
      </Space>
    </div>
  );
}

export default ContactInfoManager;
