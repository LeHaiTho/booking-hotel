import { Button, Space } from "antd";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
interface Props {
    value?: number; // Giá trị do Ant Design Form cung cấp
    onChange?: (value: number) => void; // Hàm cập nhật giá trị
}
function IncreaseDecrease(props: Props) {
    const {value=0, onChange} = props;
    const decrease = () => {
        if (value > 0) {
          onChange?.(value-1);
        }
      };
    
      const increase = () => {
        onChange?.(value + 1);
      };
    return ( 
        <Space style={{padding:5, border:"1px solid #868686", borderRadius:8, width:125, justifyContent:"space-between"}}>
            <Button onClick={decrease} disabled={value===0}
             type="text" icon={<MinusOutlined style={{fontSize:14}} />}></Button>
            <span style={{fontWeight:600}}>{value}</span>
            <Button onClick={(increase)}
            type="text" icon={<PlusOutlined style={{fontSize:14}} />}></Button>
        </Space>
    );
}

export default IncreaseDecrease;