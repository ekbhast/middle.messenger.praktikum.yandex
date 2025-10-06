import { HTTPTransport } from '../utils/request';
import { BaseAPI } from './baseApi';

const authAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');

export class AuthAPI extends BaseAPI {
    getUser() {
        return authAPIInstance.get('/auth/user');
    }
    signin(data: Record<string, string>) {
        return authAPIInstance.post('/auth/signin', { data });
    }
    logout() {
        return authAPIInstance.post('/auth/logout');
    }
    signup(data: Record<string, string>) {
        return authAPIInstance.post('/auth/signup', { data } );
    }
}
