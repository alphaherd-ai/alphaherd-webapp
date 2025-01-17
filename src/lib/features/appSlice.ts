// appSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  currentOrgId: number | null,
  currentBranchId: number | null,
  currentOrg: any,
  currentBranch: any,
  isCurrentOrgAdmin: Boolean,
  isCurrentBranchManager: Boolean
}

const initialState: AppState = {
  currentOrgId: null,
  currentBranchId: null,
  currentOrg: null,
  currentBranch: null,
  isCurrentOrgAdmin: false,
  isCurrentBranchManager: false
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateApp: (state, action: PayloadAction<AppState>) => {
      // console.log("Inside Update App");
      // console.log(action.payload);
      const newState = { ...state, ...action.payload };
      return newState;
    },
    updateCurrentBranch: (state, action: PayloadAction<any>) => {
      state.currentBranch = { ...state.currentBranch, ...action.payload };
    },
    updateCurrentOrg: (state, action:PayloadAction<any>) => {
      state.currentOrg = { ...state.currentOrg, ...action.payload };
    },
    deleteApp: (state, action: PayloadAction<AppState>) => {
      // console.log("Inside Delete App");
      return initialState;
    }
  },
});

export const { updateApp,updateCurrentBranch,updateCurrentOrg,deleteApp } = appSlice.actions; // Export the new action
export default appSlice.reducer;
