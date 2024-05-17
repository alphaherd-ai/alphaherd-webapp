import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

    // adminOrganizations Organization[]
    // orgBranchId        Int?
    // userRoles          OrgBranchUserRole[]

export interface AppState {
  currentOrgId:  number | null,
  currentBranchId: number | null,
  currentOrg: any,
  currentBranch : any,
  isCurrentOrgAdmin: Boolean,
  isCurrentBranchManager: Boolean
}

const initialState : AppState = {
    currentOrgId : null,
    currentBranchId : null,
    currentOrg : null,
    currentBranch : null,
    isCurrentOrgAdmin: false,
    isCurrentBranchManager: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      updateApp: (state, action: PayloadAction<AppState>) => {
        console.log("Inside Update App");
        console.log(action.payload);
        const newState = { ...state, ...action.payload };
        return newState;
      },
      deleteApp: (state, action: PayloadAction<AppState>) => {
        console.log("Inside Delete User");
        return initialState;
      }
    },
  });

  export const { updateApp } = appSlice.actions;
  export default appSlice.reducer;

