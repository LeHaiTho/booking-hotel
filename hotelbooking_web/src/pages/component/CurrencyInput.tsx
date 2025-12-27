import { Space } from "antd";
import "./style.css"
interface Props {
    value?: any;
    onchange?: (item?:any) => void;
    styleprop?: React.CSSProperties; // Khai báo kiểu style là React.CSSProperties
}
function CurrencyInput(props: Props) {
    const { value, onchange, styleprop } = props;

    // Hàm để format số, thêm dấu . vào phân cách hàng nghìn
    const formatNumber = (num:any) => {
        return num
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu "." cho hàng nghìn
    };

    // Hàm xử lý khi người dùng thay đổi giá trị
  const handleChange = (e:any) => {
        let rawValue = e.target.value;

        // Loại bỏ tất cả các ký tự không phải số và dấu "."
        rawValue = rawValue.replace(/\D/g, "");

        // Nếu không có dữ liệu, reset giá trị
        if (rawValue === "") {
            onchange?.(""); // Gọi onChange từ props để reset
            return;
        }

        // Định dạng lại giá trị
        const formattedValue = formatNumber(rawValue);
        onchange?.(formattedValue); // Gọi onChange với giá trị đã format
    };

    return ( 
        <Space 
         style={{padding:10, border:"0.5px solid #e7e7e7", borderRadius:8, ...styleprop}}>
            <span>VND</span>
            <input
                width={"100%"}
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Nhập số tiền"
                style={{ border: "none", outline: "none", fontSize:17 }}
            />
        </Space>
    );
}

export default CurrencyInput;