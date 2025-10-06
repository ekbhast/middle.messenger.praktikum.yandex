import App from './App';
import '../../style.scss';
import { AuthAPI } from '../utils/API/auth-api';
import { router } from '../framework/Router';

document.addEventListener('DOMContentLoaded', async () => {
    const authUser = new AuthAPI();
    try {
        const user = await authUser.getUser();
        console.log('Авторизован', user);
    } catch (err) {
        console.log('Не авторизован', err);
        router.go('/');
    }
    new App();
});
