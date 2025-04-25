import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://fe-project-albaform.vercel.app/12-2/";

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer TOKEN`, //로그인 구현 전까지 하드코딩용
    "Content-Type": "application/json",
  },
});
