import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
const { Option } = Select;
import countries from "world-countries";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../../../redux/Slice/Hotels_Mn/formRegisterHotelMnSlice";
import { selectFormRegisterHotelMn } from "../../../../../redux/selector";
import {LeftOutlined } from '@ant-design/icons';

// Định nghĩa icon tùy chỉnh vì mặc định icon của Leaflet bị lỗi khi sử dụng với React
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const LocationHotel = () => {
  const formStateHotel = useSelector(selectFormRegisterHotelMn)
  const [address, setAddress] = useState<any>(null);// địa chỉ map trên bản đồ
  const [selectedCountry, setSelectedCountry] = useState<string | null>("Vietnam");
  const [form] = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // lấy token lên để tránh copy link vào trang 
  const token = localStorage.getItem('token');
  // Vị trí ban đầu của bản đồ (Ví dụ: Hà Nội)
  const [position, setPosition] = useState<[number, number]>([21.0285, 105.8542]);
    // Component lắng nghe sự kiện click trên bản đồ
  const LocationFinder = () => {
    useMapEvents({
      click: (e) => {
        getAddressFromLatLon(e.latlng.lat, e.latlng.lng); // Lấy địa chỉ từ tọa độ
        setPosition([e.latlng.lat, e.latlng.lng]); // Cập nhật tọa độ khi click
      },
    });
    return null;
  };
  // Tìm tọa độ từ tên quốc gia
  const handleSearch = async () => {
    if (!selectedCountry) return;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${selectedCountry}`;
    try {
      const response = await axios.get(url);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0]; // Lấy tọa độ đầu tiên
        setPosition([parseFloat(lat), parseFloat(lon)]); // Cập nhật vị trí marker
      }
    } catch (error) {
      console.error("Lỗi tìm tọa độ:", error);
    }
  };
  // Component cập nhật bản đồ
  const ChangeMapView = ({ position }: { position: [number, number] }) => {
    const map = useMap(); // Lấy đối tượng map
    map.setView(position); // Di chuyển map đến vị trí mới
    return null; // Không render gì cả
  };
  const getAddressFromLatLon = async (lat:any, lon:any) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await response.json();
    // console.log(data)
    setAddress(data);
  };
  //map địa chỉ mới
  useEffect(()=>{
      if(address){
        form.setFieldsValue({
          address: address?.display_name,
          country: address?.address?.country,
          city: address?.address?.state
        })
      }
  },[address])
  //lấy vị trị mới
  const onFinish = (values:any) => {
    dispatch(updateForm(values))
    navigate(`/manage/register-hotel/setup-hotel/name-hotel?token=${token}`)
  }
  useEffect(()=>{
    handleSearch();
  },[selectedCountry])
  useEffect(()=>{
    if(formStateHotel){
       form.setFieldsValue({
          address: formStateHotel?.address,
          apartment:formStateHotel?.apartment,
          city:formStateHotel?.city,
          country:formStateHotel?.country,
          zipcode: formStateHotel?.zipcode
       })
    }
  },[form])
  return (
    <div style={{position:"relative"}}>
      {/* Thanh tiến trình  */}
      <Row style={{position:"fixed", top:64, right:0, left:0, display:"flex", zIndex:2}}>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:COLORS.BUTTON, width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"98%"}}></div>
                </Col>
                <Col span={3}>
                    <div style={{height:8, backgroundColor:"#dcdcdc", width:"100%"}}></div>
                </Col>
            </Row>
      <MapContainer center={position} zoom={6} style={{display:"flex",marginTop:-64,height: "100vh", width: "100%",zIndex:1}}>
        {/* Lớp gạch bản đồ (TileLayer) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
       {/* Lắng nghe sự kiện click */}
        <LocationFinder />
        {position && <ChangeMapView position={position} />}
        {
          position && <Marker
          position={position}
          icon={customIcon}
          // draggable={true} //có thể kéo thả marker
          // eventHandlers={{
          //   dragend: (e) => {
          //     const { lat, lng } = e.target.getLatLng();
          //     setPosition([lat, lng]);
          //   },
          // }}
        >
          <Popup>Vị trí hiện tại của bạn!</Popup>
        </Marker>
        }
      </MapContainer>

      {/* Form  */}
      <Space direction="vertical" style={{zIndex:2,position:"absolute", top:100, left:100}}>
        <h1>Chỗ nghỉ của Quý vị ở đâu?</h1>
        <Space direction="vertical">
        <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ width: 500, margin: "auto", background: "#fff", padding: 20, borderRadius: 10 }}>
      {/* Tìm địa chỉ */}
      <Form.Item
        label="Tìm địa chỉ của Quý vị"
        name="address"
        rules={[{ required: true, message: "Địa chỉ chỗ nghỉ của Quý vị là gì?" }]}>
        <Input placeholder="Bắt đầu gõ địa chỉ của Quý vị" />
      </Form.Item>

      {/* Số căn hộ hoặc tầng */}
      <Form.Item
        label="Số căn hộ hoặc tầng (không bắt buộc)"
        name="apartment">
        <Input placeholder="Nhập số căn hộ hoặc tầng" />
      </Form.Item>

      {/* Vùng/quốc gia */}
      <Form.Item initialValue={selectedCountry}
        label="Vùng/quốc gia"
        name="country"
        rules={[{ required: true, message: "Chọn quốc gia của Quý vị!" }]}
>
        <Select onChange={(country)=>{setSelectedCountry(country);}}>
        {countries.map((country) => (
          <Option key={country.cca2} value={country.name.common}>
            {country.name.common}
          </Option>
        ))}
        </Select>
      </Form.Item>

      {/* Thành phố và mã bưu chính */}
      <div style={{ display: "flex", gap: "10px" }}>
        <Form.Item
          label="Thành phố"
          name="city"
          style={{ flex: 1 }}
          rules={[{ required: true, message: "Chỗ nghỉ của Quý vị nằm ở thành phố nào?" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Mã bưu chính"
          name="zipcode"
          style={{ flex: 1 }}
          rules={[{ required: false, message: "Mã bưu chính của Quý vị là gì?" }]}>
          <Input />
        </Form.Item>
      </div>

      {/* Nút gửi */}
      <Form.Item>
        <Row>
              <Col span={3}><Button onClick={()=>{navigate(-1)}} style={{padding:18}} icon={<LeftOutlined />} block></Button></Col>
              <Col span={21}><Button
              type="primary" htmlType="submit" style={{marginLeft:10,padding:18}} block>Tiếp tục</Button></Col>
        </Row>
      </Form.Item>
    </Form>
        </Space>
      </Space>
    </div>
  );
};

export default LocationHotel;
