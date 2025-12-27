import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DefaultLayout, HomeLayout, RegisterHotelLayout } from "../layouts";
import {
  HomePage,
  RegisterManager,
  ContactInfoManager,
  CreatePasswordManager,
  VerifyAccountManager,
  LoginEmailMn,
  LoginPassMn,
  HomeMnPage,
  //Hotel
  TypeHotel,
  TypeHotel_P2,
  TypeHotel_P3,
  TypeHotel_P4,
  LocationHotel,
  NameHotel,
  AmenitiesHotel,
  CheckInOutHotel,
  MultiStepHotel,
  RoomDetails,
  BathRoom,
  RoomAmenities,
  NameRoom,
  ImageRoom,
  Payment,
  CalendarRoom,
  PriceRoom,
  BookingMessage,
  AdminMessage,
  CustomerFAQs,
  DetailRoomU_1,
} from "../pages";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login, User } from "../redux/Slice/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import DetailRoomU from "../pages/manage/Management/Room/PlaceToStay/DetailRoomU";
import { AdminLayout } from "../layouts/admin";
import { BookingAll, HomeAdmin, LoginAdmin } from "../pages/admin";
import IndexAdmin from "../pages/admin/IndexAdmin";
import PromotionList from "../pages/manage/Management/Room/Promotion/PromotionList";
import SystemPromotion from "../pages/manage/Management/Room/Promotion/SystemPromotion";
import NewPromotion from "../pages/manage/Management/Room/Promotion/NewPromotion";
import CustomerRating from "../pages/manage/Management/CustomerRating";
import UserManager from "../pages/admin/UserManager";
import Thanhtoan from "../pages/admin/Thanhtoan";
import Khachsan from "../pages/admin/Khachsan";
import TypeHotelAd from "../pages/admin/TypeHotelAd";
import RevenueReport from "../pages/manage/Management/dashboard/RevenueReport";
import DashboardManager from "../pages/manage/Management/dashboard/DashboardManager";
import Promotion from "../pages/admin/Promotion";
const AppRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Đưa token này lên dữ liệu store của redux
    const token = localStorage.getItem("token");
    if (token) {
      const decode: User = jwtDecode(token);
      dispatch(login(decode));
    }
  }, []);
  return (
    <Router>
      <Routes>
        {/* Route chung  */}
        <Route
          path="/"
          element={
            <DefaultLayout>
              <HomePage />
            </DefaultLayout>
          }
        />

        {/* Route cho quản lý  */}
        <Route path="/manage">
          <Route
            index
            element={
              <DefaultLayout>
                <RegisterManager />
              </DefaultLayout>
            }
          />
          <Route
            path="register"
            element={
              <DefaultLayout>
                <RegisterManager />
              </DefaultLayout>
            }
          />
          <Route
            path="contact-info"
            element={
              <DefaultLayout>
                <ContactInfoManager />
              </DefaultLayout>
            }
          />
          <Route
            path="create-password"
            element={
              <DefaultLayout>
                <CreatePasswordManager />
              </DefaultLayout>
            }
          />
          <Route
            path="verify-account"
            element={
              <DefaultLayout>
                <VerifyAccountManager />
              </DefaultLayout>
            }
          />
          <Route
            path="sigin-manage"
            element={
              <DefaultLayout>
                <LoginEmailMn />
              </DefaultLayout>
            }
          />
          <Route
            path="sigin-pass-manage"
            element={
              <DefaultLayout>
                <LoginPassMn />
              </DefaultLayout>
            }
          />

          {/* Home  */}
          <Route
            path="home"
            element={
              <HomeLayout>
                <HomeMnPage />
              </HomeLayout>
            }
          />
          {/* RegisterHotel  */}
          <Route
            path="register-hotel/type"
            element={
              <RegisterHotelLayout>
                <TypeHotel />
              </RegisterHotelLayout>
            }
          />
          <Route
            path="register-hotel/type-part-2"
            element={
              <RegisterHotelLayout>
                <TypeHotel_P2 />
              </RegisterHotelLayout>
            }
          />
          <Route
            path="register-hotel/type-part-3"
            element={
              <RegisterHotelLayout>
                <TypeHotel_P3 />
              </RegisterHotelLayout>
            }
          />
          <Route
            path="register-hotel/type-part-4"
            element={
              <RegisterHotelLayout>
                <TypeHotel_P4 />
              </RegisterHotelLayout>
            }
          />
          {/* Setup - Hotel  */}
          <Route
            path="register-hotel/setup-hotel/location-hotel"
            element={
              <RegisterHotelLayout>
                <LocationHotel />
              </RegisterHotelLayout>
            }
          />
          <Route
            path="register-hotel/setup-hotel/name-hotel"
            element={
              <RegisterHotelLayout>
                <NameHotel />
              </RegisterHotelLayout>
            }
          />
          <Route
            path="register-hotel/setup-hotel/amenities-hotel"
            element={
              <RegisterHotelLayout>
                <AmenitiesHotel />
              </RegisterHotelLayout>
            }
          />
          <Route
            path="register-hotel/setup-hotel/check-in-out-hotel"
            element={
              <RegisterHotelLayout>
                <CheckInOutHotel />
              </RegisterHotelLayout>
            }
          />
          <Route
            path="register-hotel/setup-hotel/multi-step-hotel/:id"
            element={
              <RegisterHotelLayout>
                <MultiStepHotel />
              </RegisterHotelLayout>
            }
          />
          {/* Setup - Room  */}
          <Route
            path="register-hotel/setup-room/room-details/:idhotel"
            element={
              <RegisterHotelLayout>
                <RoomDetails />
              </RegisterHotelLayout>
            }
          />
          <Route
            path="register-hotel/setup-room/bath-room/:idhotel"
            element={
              <RegisterHotelLayout>
                <BathRoom />
              </RegisterHotelLayout>
            }
          />
          <Route
            path="register-hotel/setup-room/room-amenities/:idhotel"
            element={
              <RegisterHotelLayout>
                <RoomAmenities />
              </RegisterHotelLayout>
            }
          />
          <Route
            path="register-hotel/setup-room/name-room/:idhotel"
            element={
              <RegisterHotelLayout>
                <NameRoom />
              </RegisterHotelLayout>
            }
          />
          <Route
            path="register-hotel/setup-room/image-room/:idhotel"
            element={
              <RegisterHotelLayout>
                <ImageRoom />
              </RegisterHotelLayout>
            }
          />
          <Route
            path="register-hotel/setup-room/payment/:idhotel"
            element={
              <RegisterHotelLayout>
                <Payment />
              </RegisterHotelLayout>
            }
          />

          {/* CalendarRoom */}
          <Route
            path="calendar-and-room/calendar"
            element={
              <HomeLayout>
                <CalendarRoom />
              </HomeLayout>
            }
          />
          <Route
            path="calendar-and-room/price-room"
            element={
              <HomeLayout>
                <PriceRoom />
              </HomeLayout>
            }
          />
          {/* Promotion  */}
          <Route
            path="promotion-list"
            element={
              <HomeLayout>
                <PromotionList />
              </HomeLayout>
            }
          />
          <Route
            path="revenue-report"
            element={
              <HomeLayout>
                <RevenueReport />
              </HomeLayout>
            }
          />
          <Route
            path="dashboard"
            element={
              <HomeLayout>
                <DashboardManager />
              </HomeLayout>
            }
          />

          <Route
            path="system-promotion"
            element={
              <HomeLayout>
                <SystemPromotion />
              </HomeLayout>
            }
          />
          <Route
            path="new-promotion"
            element={
              <HomeLayout>
                <NewPromotion />
              </HomeLayout>
            }
          />
          {/* Đánh giá của khách hàng */}
          <Route
            path="customer-rating"
            element={
              <HomeLayout>
                <CustomerRating />
              </HomeLayout>
            }
          />
          {/* Mail Box  */}
          <Route
            path="mail-box-room/booking-message"
            element={
              <HomeLayout>
                <BookingMessage />
              </HomeLayout>
            }
          />
          <Route
            path="mail-box-room/admin-message"
            element={
              <HomeLayout>
                <AdminMessage />
              </HomeLayout>
            }
          />
          <Route
            path="mail-box-room/customer-faqs-message"
            element={
              <HomeLayout>
                <CustomerFAQs />
              </HomeLayout>
            }
          />
          {/* Place to Stay  */}
          <Route
            path="place-to-stay-room/detail-room-u"
            element={
              <HomeLayout>
                <DetailRoomU />
              </HomeLayout>
            }
          />
          <Route
            path="place-to-stay-room/detail-room-u1/:idroom"
            element={
              <HomeLayout>
                <DetailRoomU_1 />
              </HomeLayout>
            }
          />
        </Route>

        <Route path="/admin">
          <Route index element={<LoginAdmin />} />
          <Route path="login" element={<LoginAdmin />} />
          <Route
            path="home/home-manager-user"
            element={
              <AdminLayout>
                <UserManager />
              </AdminLayout>
            }
          />
          <Route
            path="home/home-index"
            element={
              <AdminLayout>
                <HomeAdmin />
              </AdminLayout>
            }
          />
          <Route
            path="home/trangchu-index"
            element={
              <AdminLayout>
                <IndexAdmin />
              </AdminLayout>
            }
          />
          <Route
            path="home/booking-all"
            element={
              <AdminLayout>
                <BookingAll />
              </AdminLayout>
            }
          />
          <Route
            path="home/thanh-toan-admin-nguoidung"
            element={
              <AdminLayout>
                <Thanhtoan />
              </AdminLayout>
            }
          />
          <Route
            path="home/thongke-khach-san"
            element={
              <AdminLayout>
                <Khachsan />
              </AdminLayout>
            }
          />
          <Route
            path="home/thongke-loai-khach-san"
            element={
              <AdminLayout>
                <TypeHotelAd />
              </AdminLayout>
            }
          />
          <Route
            path="home/promotion"
            element={
              <AdminLayout>
                <Promotion />
              </AdminLayout>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
