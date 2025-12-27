import { RootState } from "./store"
//Lấy ra user
export const selectAuth = (state:RootState) => state.auth.user;
//Lấy form đăng ký Quản lý khách sạn
export const selectFormRegisterMn = (state:RootState) => state.formRegisterMn.form
//Lấy form login Quản lý khách sạn
export const selectFormLoginMn = (state: RootState) => state.formLoginMn.form

//Lấy form đăng ký khách sạn
export const selectFormRegisterHotelMn = (state: RootState) => state.formRegisterHotelMn.form

//Lấy form đăng ký phòng
export const selectFormRegisterRoomMn = (state: RootState) => state.formRegisterRoomMn.form

//Lấy ra khách chọn đã chọn
export const selectHotelMn = (state: RootState) => state.hotel.hotel