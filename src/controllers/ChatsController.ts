import { ChatsAPI } from '../api/chats-api';
import store from '../framework/Store';
import { ChatProps } from '../types/types';

const chatsApi = new ChatsAPI();
class ChatsController {
    public async createChat(name: string) {
        try {
            const chat = await chatsApi.createChat({ title: name });
            store.set('currentChat', chat);
            console.log('Чат создан', chat);
            console.log(store.getState());
        } catch (err) {
            console.error('Ошибка при создании чата', err);
            throw err;
        }
    }
    public async getChats(): Promise<ChatProps[]> {
        try {
            const chats = await chatsApi.getChats() as ChatProps[];
            console.log('Чаты получены', chats);
            store.set('chats', chats);
            console.log(store.getState());
            return chats;
        } catch (err) {
            console.error('Ошибка при получении чатов', err);
            throw err;
        }
    }
    public async changeAvatar(formData: FormData) {
        try {
            const response = await chatsApi.changeAvatar(formData);
            console.log('Аватар изменен', response);
            return response;
        } catch (err) {
            console.error('Ошибка при изменении аватара', err);
            throw err;
        }
    }
    public async addUserToChat(userId: number, chatId: number) {
        try {
            const response = await chatsApi.addUserToChat({
                users: [userId],
                chatId,
            });
            console.log('Пользователь добавлен в чат', response);
            return response;
        } catch (err) {
            console.error('Ошибка при добавлении пользователя в чат', err);
            throw err;
        }
    }
    public async getUserChat(chatId: number) {
        try {
            const response = await chatsApi.getUserChat(chatId);
            console.log('Пользователи чата получены:', response);
            return response;
        } catch (err) {
            console.error('Ошибка при получении пользователей чата', err);
            throw err;
        }
    }
    public async deleteUserFromChat(data: { users: number[]; chatId: number }) {
        try {
            const response = await chatsApi.deleteUserFromChat(data);
            console.log('Пользователь(и) удалены из чата:', response);
            return response;
        } catch (err) {
            console.error('Ошибка при удалении пользователя из чата', err);
            throw err;
        }
    }
    public async deleteChat(data: { chatId: number }) {
        try {
            const response = await chatsApi.deleteChat(data);
            console.log('Чат удалён:', response);
            return response;
        } catch (err) {
            console.error('Ошибка при удалении чата', err);
            throw err;
        }
    }
}
export const chatsController = new ChatsController();
