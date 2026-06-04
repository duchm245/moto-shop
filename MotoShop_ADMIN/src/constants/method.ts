/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_URL } from './utils';
import { useSelector } from 'react-redux';

interface IProps {
  url: string;
  method: string;
  data?: any;
  token?: any;
}

const REQUEST_API = async ({ method, url, data, token }: IProps) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const config = { method, url, data, headers };
  try {
    const res = await axios(config);
    if (res.status === 200) {
      return res.data;
    }
    // Trả về null nếu status khác 200 nhưng không có error
    return null;
  } catch (e: any) {
    if (String(e).indexOf("Network Error") !== -1) {
      throw new Error("Không có internet");
    }
    // Trả về response body từ BE (chứa message lỗi) thay vì throw
    if (e?.response?.data) {
      return e.response.data;
    }
    // Fallback: trả về object báo lỗi chung
    return { status: false, data: `Lỗi! ${e?.response?.status ?? 'Không xác định'}` };
  }
};
export {REQUEST_API};