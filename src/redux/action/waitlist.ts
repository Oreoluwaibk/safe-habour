import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_PROFILE_URL;

export interface IWaitlist {
    name: string;
    emailAddress: string;
    phoneNumber: string;
    userType: number;
    location: string;
    registeringFor?: number;
    experience?: number;
    firstName?: string;
    lastName?: string;
}

export const submitWailtlistInfo = async (data: IWaitlist) => {
    const response = await axios.post(`${baseUrl}join`, data);
    return Promise.resolve(response);
}
