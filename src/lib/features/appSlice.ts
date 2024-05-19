// appSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  currentOrgId: number | null,
  currentBranchId: number | null,
  currentOrg: any,
  currentBranch: any,
  isCurrentOrgAdmin: Boolean,
  isCurrentBranchManager: Boolean,
  currentUrl: string | null // Add this line
}

const initialState: AppState = {
  currentOrgId: null,
  currentBranchId: null,
  currentOrg: null,
  currentBranch: null,
  isCurrentOrgAdmin: false,
  isCurrentBranchManager: false,
  currentUrl: null // Add this line
};

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
    updateCurrentUrl: (state, action: PayloadAction<string>) => { // Add this action
      state.currentUrl = action.payload;
    },
    deleteApp: (state, action: PayloadAction<AppState>) => {
      console.log("Inside Delete App");
      return initialState;
    }
  },
});

export const { updateApp, updateCurrentUrl } = appSlice.actions; // Export the new action
export default appSlice.reducer;
