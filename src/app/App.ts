import Page500 from '../pages/500/page500';
import Page404 from '../pages/404/page404';
import Auth from '../pages/auth/auth';
import Registration from '../pages/registration/registration';
import UserChangeData from '../pages/userChangeData/userChangeData';
import UserChangePassword from '../pages/userChangePassword/userChangePassword';
import UserSettings from '../pages/userSettings/UserSettings';
import Chats from '../pages/chats/chats';
import Router from '../framework/Router';


export default class App {
    constructor() {
        const appElement = document.getElementById('app');
        if (!appElement) throw new Error('Контейнер #app не найден');
        const router = new Router(appElement);
        router
            .use('/', Auth)
            .use('/chats', Chats)
            .use('/page500', Page500)
            .use('/page404', Page404)
            .use('/user-change-date', UserChangeData)
            .use('/user-change-password', UserChangePassword)
            .use('/user-settings', UserSettings)
            .use('/registration', Registration);
        router.start();
    }
}
