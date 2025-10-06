import { HTTPTransport } from '../request';
import { BaseAPI } from './baseApi';

const regAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');


export class RegAPI extends BaseAPI {
    registration(data: Record<string, string>) {
        return regAPIInstance.post('/auth/signup', { data } );
    }
}
