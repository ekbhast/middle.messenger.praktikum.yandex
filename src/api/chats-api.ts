import { HTTPTransport } from '../utils/request';
import { BaseAPI } from './baseApi';

const chatsAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2');

export class ChatsAPI extends BaseAPI {
    getChats() {
        return chatsAPIInstance.get('/chats');
    }
    createChat(data: { title: string }) {
        return chatsAPIInstance.post('/chats', { data });
    }
    deleteChat(data: Record<string, number>) {
        return chatsAPIInstance.delete('/chats', { data });
    }
    getUserChat(id: number) {
        return chatsAPIInstance.get(`/chats/${id}/users`);
    }
    changeAvataer(formData: FormData) {
        return chatsAPIInstance.put(`/chats/avatar`, { data: formData });
    }
    addUserToChat(data: Record<string, number[] | number>) {
        return chatsAPIInstance.put('/chats/users', { data });
    }
    deleteUserFromChat(data: Record<string, number[] | number>) {
        return chatsAPIInstance.delete('/chats/users', { data });
    }
}
export const chatsApi = new ChatsAPI();
