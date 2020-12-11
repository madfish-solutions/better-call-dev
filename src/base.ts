import axios, { AxiosRequestConfig } from "axios";

export const BASE_URL = "https://api.better-call.dev/v1";

export const api = axios.create({ baseURL: BASE_URL });

export type BcdRequestParams<T> = T &
  Omit<AxiosRequestConfig, "method" | "url" | "params">;

export function buildQuery<P extends Record<string, unknown>, R = any>(
  method: "GET" | "POST",
  path: ((params: BcdRequestParams<P>) => string) | string,
  toQueryParams?:
    | ((params: BcdRequestParams<P>) => Record<string, unknown>)
    | Array<keyof P>
) {
  return (params: BcdRequestParams<P>) => {
    const url = typeof path === "function" ? path(params) : path;
    const queryParams =
      typeof toQueryParams === "function"
        ? toQueryParams(params)
        : toQueryParams
        ? Object.fromEntries(
            Object.entries(params).filter(([key]) =>
              toQueryParams.includes(key)
            )
          )
        : undefined;

    return axios.request<R>({
      method,
      url,
      params: queryParams,
      ...params,
    });
  };
}

/**
 * Types
 */

export type BcdNetwork = "mainnet" | "carthagenet" | "delphinet";
