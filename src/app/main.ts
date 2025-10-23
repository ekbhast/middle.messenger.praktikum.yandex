import App from './App';
import '../../style.scss';
import { AuthAPI } from '../api/auth-api';
import Router from '../framework/Router'; // импорт класса, не singleton
import store from '../framework/Store';

const root = document.getElementById('app')!;
export const router = new Router(root); // создаём singleton для приложения

document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname === '/registration') {
        new App();
        return;
    }

    const authUser = new AuthAPI();
    try {
        const user = await authUser.getUser();
        store.set('user', user);

        if (window.location.pathname === '/') {
            router.go('/messenger');
        }

        console.log('Авторизован', store);
    } catch (err) {
        console.log('Не авторизован', err);
        router.go('/');
    }

    new App();
});
