import { createSlice } from "@reduxjs/toolkit";


export interface User {
  id: number,
  firstname?: string,
  lastname?: string,
  phonenumber?: string,
  email?: string,
  password?: string,
  provider?: string,//Kiểu đăng nhập google, fabook
  provider_id?: string, //id
  image_url?: string,
  country_code?: string,
  //bảng role
  role_name?: string;

}

//Khởi tạo state
const initialState: {user: User | null} = {
    user: null,
}

//Tạo slice auth
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action)=>{
            state.user = action.payload;
        },
        logout:(state)=>{
            state.user = null;
        }
    }
})

// Tự động tạo action creators
export const {login, logout} = authSlice.actions;

export default authSlice.reducer;