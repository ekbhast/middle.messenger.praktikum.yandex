import { ChatsAPI } from '../api/chats-api';
import store from '../framework/Store';

const chatsApi = new ChatsAPI();
class ChatsController {
    public async createChat() {
        try {
            const chat = await chatsApi.createChat({ title: 'Клевый чатик' });
            store.set('currentChat', chat);
            console.log('Чат создан', chat);
            console.log(store.getState());
        } catch (err) {
            console.error('Ошибка при создании чата', err);
            throw err;
        }
    }
    public async getChats() {
        try {
            const chats = await chatsApi.getChats();
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
}
export const chatsController = new ChatsController();
