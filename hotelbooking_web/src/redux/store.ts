import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { formLoginMnSlice, formRegisterMnSlice, authSlice } from "./Slice/auth";
import {formRegisterHotelMnSlice, formRegisterRoomMnSlice, hotelMnSlice} from "./Slice/Hotels_Mn/index"

// Kết hợp các reducer thành rootReducer
const rootReducer = combineReducers({
    auth: authSlice,
    formRegisterMn: formRegisterMnSlice,
    formLoginMn: formLoginMnSlice,
    formRegisterHotelMn: formRegisterHotelMnSlice,
    formRegisterRoomMn: formRegisterRoomMnSlice,
    hotel: hotelMnSlice
});

//Tạo store
const store = configureStore({
    reducer: rootReducer
})

export default store;

//lấy ra các trạng thái của store
export type RootState = ReturnType<typeof store.getState>; 