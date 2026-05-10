import axios from 'axios';
import { API_URL } from './utils';
import store from '~/redux/store';
import Types from '~/redux/types';

//thiết lập cấu hình mặc định cho các yêu cầu http request
const httpRequest = axios.create({
    baseURL: API_URL,
    headers: {
        'content-type': 'application/json',
    },
});

// Response interceptor: tự động logout khi token không hợp lệ (401)
httpRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            // Xóa thông tin đăng nhập khỏi localStorage
            localStorage.setItem('user', null);
            localStorage.setItem('token', '');
            // Dispatch logout action về Redux store
            store.dispatch({ type: Types.LOGOUT });
            // Redirect về trang đăng nhập
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default httpRequest;