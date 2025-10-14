import { HTTPTransport } from '../utils/request';
import { BaseAPI } from './baseApi';
import { baseUrl } from './baseUrls';

const authAPIInstance = new HTTPTransport(baseUrl);

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
