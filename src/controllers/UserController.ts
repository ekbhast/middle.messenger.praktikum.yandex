import { UserAPI } from '../api/user-api';
import store from '../framework/Store';

const userApi = new UserAPI();

class UserController {
    public async profile(data: Record<string, string>) {
        try {
            const user = await userApi.profile(data);
            console.log('Изменен', user);
            return user;
        } catch (err) {
            console.error('Изенения не удались', err);
            throw err;
        }
    }
    public async changePassword(data: Record<string, string>) {
        try {
            const password = await userApi.changePassword(data);
            console.log('Парель изменен', password);
            return password;
        } catch (err) {
            console.error('Пароль не изменен', err);
            throw err;
        }
    }
    public async changeAvatar(file: File) {
        const formData = new FormData();
        formData.append('avatar', file);
        console.log(formData); // обязательно имя 'avatar'

        try {
            const avatar = await userApi.changeAvatar(formData);
            console.log('Аватар успешно обновлён', avatar);
            return avatar;
        } catch (err) {
            console.error('Ошибка при обновлении аватара', err);
            throw err;
        }
    }
    public async searchUserByLogin(login: string) {
        try {
            const response = await userApi.searchUser(login);
            store.set('searchUser', response);
            console.log(store);
            return response;
        } catch (err) {
            console.error('Ошибка поиска пользователя', err);
            throw err;
        }
    }
    public async getUserById(id: number) {
        try {
            const user = await userApi.getUserById(id);
            console.log('Пользователь найден по ID:', user);
            store.set('searchUser', user);
            console.log(store);
            return user;
        } catch (err) {
            console.error('Ошибка при получении пользователя по ID:', err);
            throw err;
        }
    }
}

export const userController = new UserController();
