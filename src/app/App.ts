import Page500 from '../pages/500/page500';
import Page404 from '../pages/404/page404';
import Auth from '../pages/auth/auth';
import Registration from '../pages/registration/registration';
import UserChangeData from '../pages/userChangeData/userChangeData';
import UserChangePassword from '../pages/userChangePassword/userChangePassword';
import UserSettings from '../pages/userSettings/UserSettings';
import Chats from '../pages/chats/chats';
import { router } from './main';


export default class App {
    constructor() {
        router
            .use('/', Auth)
            .use('/messenger', Chats)
            .use('/page500', Page500)
            .use('/page404', Page404)
            .use('/user-change-date', UserChangeData)
            .use('/user-change-password', UserChangePassword)
            .use('/settings', UserSettings)
            .use('/sign-up', Registration);
        router.start();
    }
}
