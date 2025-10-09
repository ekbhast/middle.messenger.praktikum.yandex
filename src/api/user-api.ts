import { HTTPTransport } from '../utils/request';

const userAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');

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
