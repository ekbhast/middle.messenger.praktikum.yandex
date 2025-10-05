import { HTTPTransport } from '../request';
import { BaseAPI } from './baseApi';


const authAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');

export class AuthAPI extends BaseAPI {
    signin(data: { login: string; password: string }) {
        return authAPIInstance.post('/auth/signin', { data });
    }
}
