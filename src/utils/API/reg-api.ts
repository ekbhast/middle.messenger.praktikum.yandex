import { HTTPTransport } from '../request';
import { BaseAPI } from './baseApi';

const authAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');


export class RegAPI extends BaseAPI {
    registration(data: {
        first_name: string,
        second_name: string,
        login: string,
        email: string,
        password: string,
        phone: string
}) {
        return authAPIInstance.post('/auth/signup', { data });
    }
}
