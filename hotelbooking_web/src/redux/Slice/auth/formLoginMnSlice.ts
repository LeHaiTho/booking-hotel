import { createSlice} from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho form
interface FormData {
  // Cho phép thêm thuộc tính mới
  [key: string]: any; 
}

const initialState: {form: FormData} = {
    form: {}
}
//Tạo slice auth
const formLoginMnSlice = createSlice({
    name: 'formLoginManager',
    initialState,
    reducers: {
      //truyền vào value {email: 'thien@gmail.com}
      updateForm(state, action) {
        const data = action.payload;
        // thêm trường mới vào giá trị hiện tại
        state.form = {...state.form, ...data}
      },
      resetForm(state){
        //reset form về trạng thái rỗng
        state.form = {};
      }
    },
})


 // Tự động tạo action creators
export const { updateForm, resetForm } = formLoginMnSlice.actions;

// Xuất reducer
export default formLoginMnSlice.reducer;