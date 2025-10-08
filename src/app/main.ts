import App from './App';
import '../../style.scss';
import { AuthAPI } from '../api/auth-api';
import { router } from '../framework/Router';
import store from '../framework/Store';

document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname ==='/registration') {
        new App();
        return;
    }
    const authUser = new AuthAPI();
    try {
        const user = await authUser.getUser();
        store.set('user', user);
        if (window.location.pathname ==='/') {
            router.go('/chats');
        }
        console.log('Авторизован', store);
    } catch (err) {
        console.log('Не авторизован', err);
        router.go('/');
    }
    new App();
});
