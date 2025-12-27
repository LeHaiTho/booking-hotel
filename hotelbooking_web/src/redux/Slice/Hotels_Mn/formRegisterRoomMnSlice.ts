import { createSlice} from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho form
interface FormData {
  // Cho phép thêm thuộc tính mới
  [key: string]: any; 
}
//lấy dữ liệu từ state lên (đã lưu vào session Storage)
const savedForm = sessionStorage.getItem("formRegisterRoomMn_Session");

//nếu bị load lại thì lấy lại trong Session Storage
const initialState: {form: FormData} = {
    form: savedForm ? JSON.parse(savedForm) : {}
}

 //Tạo slice auth
 const formRegisterRoomMnSlice = createSlice({
    name: 'formRegisterRoomManager',
    initialState,
    reducers: {
      updateForm(state, action) {
        const data = action.payload;
        // thêm trường mới vào giá trị hiện tại
        state.form = {...state.form, ...data}
        // lưu vào Session Storage 
        sessionStorage.setItem("formRegisterRoomMn_Session", JSON.stringify({...state.form, ...data}))
      },
      resetForm(state){
        //reset form về trạng thái rỗng
        state.form = {};
        // xóa form từ Session Storage
        sessionStorage.removeItem("formRegisterRoomMn_Session")
      }
    },
})


 // Tự động tạo action creators
export const { updateForm, resetForm } = formRegisterRoomMnSlice.actions;

// Xuất reducer
export default formRegisterRoomMnSlice.reducer;