import { Button, Rate, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../constants/constants";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
function Khachsan() {
  const [dataHotel, setDataHotel] = useState<any>([]);
  const Column = [
    {
      title: "STT",
      dataIndex: "id",
      render: (text: any) => <span>{`HT0    ${text}`}</span>,
    },
    {
      title: "Tên khách sạn",
      dataIndex: "name",
      render: (text: any) => <span>{`${text}`}</span>,
    },
    {
      title: "Thành phố",
      dataIndex: "city",
      render: (text: any) => <span>{`${text}`}</span>,
    },
    {
      title: "Quốc gia",
      dataIndex: "country",
      render: (text: any) => <span>{`${text}`}</span>,
    },
    {
      title: "Xếp hạng",
      dataIndex: "rate",
      render: (text: any) => <Rate disabled value={text} />,
    },
    {
      title: <span style={{ color: "#3A76D2" }}>Chức năng</span>,
      key: "id",
      dataIndex: "id",
      render: (_: any) => (
        <Space>
          <Button
            type="primary"
            style={{ backgroundColor: "orange" }}
            icon={<FormOutlined />}
          ></Button>
          <Button
            type="primary"
            style={{ backgroundColor: "red" }}
            icon={<DeleteOutlined />}
          ></Button>
        </Space>
      ),
    },
  ];
  const getAPIBookingAll = async () => {
    try {
      const res = await axios.get(`${baseUrl}admin/thongke-hotel`);
      setDataHotel(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAPIBookingAll();
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontWeight: 500 }}>Quản lý khách sạn</h1>
      {dataHotel && <Table columns={Column} dataSource={dataHotel} />}
    </div>
  );
}

export default Khachsan;
