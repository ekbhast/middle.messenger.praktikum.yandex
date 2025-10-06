import App from './App';
import '../../style.scss';
import { AuthAPI } from '../api/auth-api';
import { router } from '../framework/Router';

document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname ==='/registration') {
        new App();
        return;
    }
    const authUser = new AuthAPI();
    try {
        const user = await authUser.getUser();
        if (window.location.pathname ==='/') {
            router.go('/chats');
        }
        console.log('Авторизован', user);
    } catch (err) {
        console.log('Не авторизован', err);
        router.go('/');
    }
    new App();
});
