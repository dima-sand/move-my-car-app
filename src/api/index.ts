import axios, { AxiosError, AxiosResponse } from 'axios';

interface IFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  headers?: {
    [key: string]: string;
  };
  serverCall?: boolean;
}

export class RestService {
  static #getDefaultHeaders = () => ({
    'Content-Type': 'application/json',
  });
  public static async fetch<T = any>(
    url: string,
    options?: IFetchOptions,
  ) {
    const { method, data, headers, serverCall } = options || {};
    try {
      return await axios<IResponse<T>>({
        url: serverCall ? process.env.NEXT_PUBLIC_API_URL + url : '/api' + url,
        method: method || 'GET',
        data,
        withCredentials: true,
        headers: {
          ...this.#getDefaultHeaders(),
          ...headers,
        },
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      if (axiosError.response) {
        const response = axiosError.response;
        return {
          ...response,
          data: {
            data: null,
            success: false,
            message: response?.data ?? response?.data,
          },
        } as AxiosResponse<IResponse<T>>;
      } else {
        return {
          // ...axiosError,
          ...(axiosError.response ?? {}),
          data: {
            data: null,
            success: false,
            message: axiosError.message,
          },
        } as AxiosResponse<IResponse<T>>;
      }
    }
  }
}

export interface IResponse<T = any> {
  success: boolean;
  message?: string | null;
  data: T;
}
