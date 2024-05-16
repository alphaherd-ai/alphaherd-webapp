import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

    // adminOrganizations Organization[]
    // orgBranchId        Int?
    // lastUsedBranch     OrgBranch?          @relation(fields: [orgBranchId], references: [id])
    // userRoles          OrgBranchUserRole[]

export interface UserState {
  id:           String,
  name:          String,
  email:        String,
  phoneNo:       String,
  altPhoneNo:     String | null,
  hashedPassword: String,
  adminOrganizations: [],
  orgBranchId: number | null,
  lastUsedBranch: {},
  userRoles: []
}

const initialState: UserState = {
  id:           "",
  name:          "",
  email:        "",
  phoneNo:       "",
  altPhoneNo:     null,
  hashedPassword: "",
  adminOrganizations: [],
  orgBranchId: null,
  lastUsedBranch: {},
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