import axios, { AxiosResponse, AxiosError } from "axios";

export const getTestMessage = async () => {
  axios.get("/backend/test").then(
    (response: AxiosResponse) => {
      console.log(response)
      return response.data;
    },
    (error: AxiosError) => {
      return error.message;
    }
  );
};
