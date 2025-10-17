import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginData, notificationSettings, registerPayload, User } from "../../../utils/interface";
import axiosInstance from "../../../utils/axiosConfig";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = async (data:loginData) => {
    const response = await axios.post(`${baseUrl}/Authentication/login`, data);
    return Promise.resolve(response);
}

export const logout = async () => {
    const response = await axiosInstance.post(`${baseUrl}/Authentication/logout`, {});
    return Promise.resolve(response);
}

export const loginAction = createAsyncThunk(
  "auth/login",
  async (data: { token: string, user: User, roles: string[], tokenExpiry: string }) => {
    const { token, user, roles, tokenExpiry } = data;

    // ✅ Persist data
    localStorage.setItem("safehabour_user", JSON.stringify(user));
    localStorage.setItem("safehabour_login_type", JSON.stringify(roles?.[0]));
    localStorage.setItem(
      "safehabour_token",
      JSON.stringify(token)
    );
    if (tokenExpiry)
      localStorage.setItem("safehabour_token_expire", JSON.stringify(tokenExpiry));

    // ✅ Return payload for Redux
    return {
      token: token,
      user,
      type: roles?.[0],
    };
  }
);

export const registerClient = async (data: registerPayload) => {
    const response = await axios.post(`${baseUrl}/Authentication/register/client`, data);
    return Promise.resolve(response);
}

export const registerWorker = async (data: registerPayload) => {
    const response = await axios.post(`${baseUrl}/Authentication/register/service-worker`, data);
    return Promise.resolve(response);
}

export const verifyOtp = async (data: {userId: string; token: string; }) => {
    const response = await axios.post(`${baseUrl}/Authentication/confirm-email`, data);
    return Promise.resolve(response);
}

export const resendOtp = async (data: { email: string; }) => {
    const response = await axios.post(`${baseUrl}/Authentication/resend-email-confirmation`, data);
    return Promise.resolve(response);
}

export const forgotPassword = async(data:{ email: string }) => {
    const response = await axios.post(`${baseUrl}/Authentication/forgot-password`, data);
    return Promise.resolve(response);
}

export const resetPassword = async(data: {newPassword: string, token: string, email: string }) => {
    const response = await axios.post(`${baseUrl}/Authentication/reset-password`, data);
    return Promise.resolve(response);
}

export const verifyMe = async() => {
    const response = await axios.get(`${baseUrl}/Authentication/me`);
    return Promise.resolve(response);
}

export const getNotificationSetting = async () => {
    const url = `/Authentication/notification-settings`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const updateNotificationSetting = async (data: notificationSettings) => {
    const url = `/Authentication/notification-settings`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

export const updateTwoFASetting = async (data: { email: string; code: string }) => {
    const url = `/Authentication/two-factor-settings`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

export const verifyTwoFASetting = async (data: { enableTwoFactor: boolean; userId: string }) => {
    const url = `/Authentication/verify-two-factor`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}

export const twoFASetting = async (data: { email: string; code: string }) => {
    const url = `/TwoFactor/verify`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

export const twoFASettingVerify = async (data: { enableTwoFactor: boolean; userId: string }) => {
    const url = `/TwoFactor/settings`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}
