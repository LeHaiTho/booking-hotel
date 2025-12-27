import { createSlice} from "@reduxjs/toolkit";

export interface Hotel {
   id: number,
   id_user?: number;
   name?: string;
   description?: string;
   address?: string;
   policies?: string;//chính sách
   arrAmenities?: string;
   type?: string;
   apartment?: string;
   city?: string;
   zipcode?: string;
   country?: string;
   rate?: number;
   checkinfrom?: string;
   checkinto?: string;
   checkoutfrom?: string;
   checkoutto?: string;
   ischildren?: boolean;
   isAnimal?: boolean;
   isRegister?: boolean;
   images?: string;
   latitude?: string;
   longitude?: string;
}

//Khởi tạo state
const initialState: {hotel: Hotel | null} = {
    hotel: null,
}

//Tạo slice auth
const authSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        update: (state, action)=>{
            state.hotel = action.payload;
        },
        reset:(state)=>{
            state.hotel = null;
        }
    }
})

// Tự động tạo action creators
export const {update, reset} = authSlice.actions;

export default authSlice.reducer;
