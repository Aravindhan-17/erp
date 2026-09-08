import axios, { isAxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";

const baseUrl = env.API_URL;

export const axiosPublic = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axiosPublic;

export const setupInterceptors = (
  getToken: () => string | null,
  onSessionTimeout: () => void,
  refresh: () => Promise<{ accessToken: string } | null>,
) => {
  const requestIntercept = axiosPrivate.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token && !config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  const responseIntercept = axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;

      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;

        try {
          const result = await refresh();
          if (result?.accessToken) {
            prevRequest.headers["Authorization"] =
              `Bearer ${result.accessToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(error);
        } catch (refreshError) {
          if (isAxiosError(refreshError)) {
            const status = refreshError.response?.status;
            if (status === 401 || status === 403) {
              onSessionTimeout();
            }
          }
          return Promise.reject(refreshError);
        }
      }

      if (error?.response?.status === 401 && prevRequest?.sent) {
        onSessionTimeout();
      }

      if (error?.response?.status === 403) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).forbidden = true;
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );

  return () => {
    axiosPrivate.interceptors.request.eject(requestIntercept);
    axiosPrivate.interceptors.response.eject(responseIntercept);
  };
};
