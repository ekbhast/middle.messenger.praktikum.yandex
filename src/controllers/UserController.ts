import { UserAPI } from '../api/user-api';
// import { router } from '../framework/Router';
// import store from '../framework/Store';

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
    public async changeAvatar(data: FormData) {
        try {
            const avatar = await userApi.changeAvatar(data);
            console.log('Аватар успешно обновлён', avatar);
            return avatar;
        } catch (err) {
            console.error('Ошибка при обновлении аватара', err);
            throw err;
        }
    }
}

export const userController = new UserController();
