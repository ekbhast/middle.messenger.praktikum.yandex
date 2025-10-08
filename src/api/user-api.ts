import { HTTPTransport } from '../utils/request';
import { BaseAPI } from './baseApi';

const userAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');

export class UserAPI extends BaseAPI {
    profile(data: Record<string, string>) {
        return userAPIInstance.put('/user/profile', { data });
    }
    changePassword(data: Record<string, string>) {
        return userAPIInstance.put('/user/password', { data });
    }
    changeAvatar(data: FormData) {
        return userAPIInstance.put('/user/profile/avatar', {
            data,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }
}
