import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://fe-project-albaform.vercel.app/12-2/";

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer TOKEN`, // 로그인 전 임시
    "Content-Type": "application/json",
  },
});

// ✅ 요청 인터셉터 - accessToken 자동 헤더 설정
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // ❗ 오타 수정: Autorization → Authorization
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// ✅ 응답 인터셉터 - 401 에러 시 토큰 재발급 및 요청 재시도
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (!originalRequest || originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) throw new Error("Refresh token not found");

        const res = await axios.post(
          "/auth/refresh",
          {},
          {
            baseURL: BASE_URL,
            headers: {
              Authorization: `Bearer ${refreshToken}`,
              "Content-Type": "application/json", // ❗ application.json → application/json
            },
          }
        );

        const newAccessToken = res.data.accessToken;

        if (newAccessToken) {
          Cookies.set("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest); // ✅ 실패했던 요청 재시도
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
