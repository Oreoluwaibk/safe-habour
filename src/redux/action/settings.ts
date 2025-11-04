import axiosInstance from "../../../utils/axiosConfig";

interface payload {
  languages: [
    {
      name: string,
      code: string,
      proficiencyLevel: string,
      isNative: boolean
    }
  ],
  timeZone: 0,
  currency: string
}
export const updateGeneralSettings = async (data: payload) => {
  const url = `/ServiceWorker/general-settings`;
  const response = await axiosInstance.put(url, data);

  return Promise.resolve(response);
}