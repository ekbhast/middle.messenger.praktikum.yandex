import { HTTPTransport } from '../utils/request';
import { baseUrl } from './baseUrls';

const userAPIInstance = new HTTPTransport(baseUrl);

export class UserAPI {
    profile(data: Record<string, string>) {
        return userAPIInstance.put('/user/profile', { data });
    }

    changePassword(data: Record<string, string>) {
        return userAPIInstance.put('/user/password', { data });
    }

    changeAvatar(formData: FormData) {
        return userAPIInstance.put('/user/profile/avatar', { data: formData });
    }

    searchUser(login: string) {
        return userAPIInstance.post('/user/search', {
            data: { login },
        });
    }
    getUserById(id: number) {
        return userAPIInstance.get(`/user/${id}`);
    }
}

export const userApi = new UserAPI();
