import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { loginAction } from "../../action/auth";
import { signinReducer } from "../../../../utils/interface";

// ✅ Safe localStorage access
const isBrowser = typeof window !== "undefined";

const storedUser = isBrowser ? localStorage.getItem("safehabour_user") : null;
const storedToken = isBrowser ? localStorage.getItem("safehabour_token") : null;
const storedType = isBrowser ? localStorage.getItem("safehabour_login_type") : null;

const initialState: signinReducer = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
  token: storedToken || null,
  loading: false,
  success: false,
  error: null,
  loginType: storedType ? JSON.parse(storedType) : null,
};

export const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.loading = false;
      state.success = false;
      state.error = null;
      state.loginType = null;

      // ✅ Clear only auth-related items
      if (isBrowser) {
        localStorage.removeItem("safehabour_user");
        localStorage.removeItem("safehabour_token");
        localStorage.removeItem("safehabour_login_type");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.success = true;
        state.error = null;

        // ✅ Normalize token
        const token =
          payload?.token?.token || payload?.token || null;

        state.token = token;
        state.user = payload?.user || null;
        state.loginType = payload?.type || null;

        // ✅ Save to localStorage
        if (isBrowser) {
          localStorage.setItem("safehabour_user", JSON.stringify(state.user));
          localStorage.setItem("safehabour_token", token);
          localStorage.setItem(
            "safehabour_login_type",
            JSON.stringify(state.loginType)
          );
        }
      })
      .addCase(loginAction.rejected, (state, { error }) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.success = false;
        state.error = error;
        state.user = null;
        state.token = null;
        state.loginType = null;
      });
  },
});

export const { signOut } = signinSlice.actions;
export default signinSlice.reducer;

// ✅ Selectors
export const authState = (state: RootState) => state.auth;
export const selectedToken = (state: RootState) => state?.auth.token;
export const selectedUser = (state: RootState) => state.auth.user;
