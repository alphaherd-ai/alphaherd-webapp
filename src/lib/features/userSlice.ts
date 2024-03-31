import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id:           String,
  name:          String,
  email:        String,
  phoneNo:       String,
  altPhoneNo:     String | null,
  hashedPassword: String,
  organizationIds:   String[]
}

const initialState: UserState = {
  id:           "",
  name:          "",
  email:        "",
  phoneNo:       "",
  altPhoneNo:     null,
  hashedPassword: "",
  organizationIds:   []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      console.log("Inside Update User");
      console.log(action.payload);
      const newState = { ...state, ...action.payload };
      return newState;
    },
    deleteUser: (state, action: PayloadAction<UserState>) => {
      console.log("Inside Delete User");
      return initialState;
    }
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;