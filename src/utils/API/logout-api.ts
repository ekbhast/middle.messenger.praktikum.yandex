import { HTTPTransport } from '../request';
import { BaseAPI } from './baseApi';


const authAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');

export class LogoutAPI extends BaseAPI {
    logout() {
        return authAPIInstance.post('/auth/logout');
    }
}
