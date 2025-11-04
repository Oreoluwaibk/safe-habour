import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { loginAction } from "../../action/auth";
import { signinReducer } from "../../../../utils/interface";

const isBrowser = typeof window !== "undefined";

const storedUser = isBrowser ? localStorage.getItem("safehabour_user") : null;
const storedToken = isBrowser ? localStorage.getItem("safehabour_token") : null;
const storedType = isBrowser ? localStorage.getItem("safehabour_login_type") : null;
const storedExpiry = isBrowser ? localStorage.getItem("safehabour_token_expiry") : null;

const initialState: signinReducer = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
  token: storedToken || null,
  tokenExpiry: storedExpiry ? Number(storedExpiry) : null,
  loading: false,
  success: false,
  error: null,
  loginType: storedType ? JSON.parse(storedType) : null,
  lastRoute: null
};

export const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    // ✅ update access token after refresh
    setToken: (state, action: PayloadAction<{ token: string; tokenExpiry: number }>) => {
      state.token = action.payload.token;
      state.tokenExpiry = action.payload.tokenExpiry;
      state.isAuthenticated = true;

      if (isBrowser) {
        localStorage.setItem("safehabour_token", action.payload.token);
        localStorage.setItem("safehabour_token_expiry", String(action.payload.tokenExpiry));
      }
    },
     setLastRoute: (state, action) => {
      state.lastRoute = action.payload;
    },

    // ✅ logout user
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.tokenExpiry = null;
      state.loading = false;
      state.success = false;
      state.error = null;
      state.loginType = null;

      if (isBrowser) {
        localStorage.removeItem("safehabour_user");
        localStorage.removeItem("safehabour_token");
        localStorage.removeItem("safehabour_token_expiry");
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

        const token = payload?.token;
        const tokenExpiry = payload?.tokenExpiry || Date.now() + 3600 * 1000; // fallback: 1 hour
        const user = payload?.user || null;
        const type = payload?.type || null;

        state.token = token;
        state.tokenExpiry = tokenExpiry;
        state.user = user;
        state.loginType = type;

        if (isBrowser) {
          localStorage.setItem("safehabour_user", JSON.stringify(user));
          localStorage.setItem("safehabour_token", token);
          localStorage.setItem("safehabour_token_expiry", String(tokenExpiry));
          localStorage.setItem("safehabour_login_type", JSON.stringify(type));
        }
      })
      .addCase(loginAction.rejected, (state, { error }) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.success = false;
        state.error = error;
        state.user = null;
        state.token = null;
        state.tokenExpiry = null;
        state.loginType = null;
      });
  },
});

export const { setToken, logoutUser, setLastRoute  } = signinSlice.actions;

export default signinSlice.reducer;

// ✅ Selectors
export const authState = (state: RootState) => state.auth;
export const selectedToken = (state: RootState) => state?.auth.token;
export const selectedUser = (state: RootState) => state.auth.user;
export const selectedTokenExpiry = (state: RootState) => state.auth.tokenExpiry;
export const selectedLastRoute = (state: RootState) => state.auth.lastRoute;
