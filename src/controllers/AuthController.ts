import { AuthAPI } from '../api/auth-api';
import { router } from '../framework/Router';
import store from '../framework/Store';

const authApi = new AuthAPI();

class AuthController {
    public async getUser() {
        try {
            const user = await authApi.getUser();
            console.log('Авторизован', user);
            store.set('user', user);
            console.log('📦 Store после getUser:', store.getState());
            return user;
        } catch (err) {
            console.error('Не авторизован', err);
            throw err;
        }
    }
    public async signin(data: Record<string, string>) {
        try {
            await authApi.signin(data);
            const user = await this.getUser();
            console.log('Авторизован', user);
            router.go('/chats');
            return user;
        } catch (err) {
            console.error('Не авторизован', err);
            throw err;
        }
    }
    public async logout() {
        try {
            const user = await authApi.logout();
            console.log('Выход из системы', user);
            router.go('/');
            return user;
        } catch (err) {
            console.error('Ошибка выхода из системы', err);
            throw err;
        }
    }
    public async signup(data: Record<string, string>) {
        try {
            const user = await authApi.signup(data);
            console.log('Зарегистрирован', user);
            router.go('/chats');
            return user;
        } catch (err) {
            console.error('Ошибка регистрации', err);
            throw err;
        }
    }
}

export const authController = new AuthController();
