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
}

export const chatsController = new ChatsController();
