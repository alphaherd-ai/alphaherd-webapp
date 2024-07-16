import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

    // adminOrganizations Organization[]
    // orgBranchId        Int?
    // userRoles          OrgBranchUserRole[]

export interface UserState {
  id:           String,
  name:          String,
  email:        String,
  imageUrl:     String,
  phoneNo:       String,
  altPhoneNo:     String | null,
  hashedPassword: String,
  address: String,
  adminOrganizations: [],
  orgBranchId: number | null,
  userRoles: []
}

const initialState: UserState = {
  id:           "",
  name:          "",
  email:        "",
  imageUrl:     "",
  phoneNo:       "",
  altPhoneNo:     null,
  hashedPassword: "",
  address:"",
  adminOrganizations: [],
  orgBranchId: null,
  userRoles: []

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