import Page500 from '../pages/500/page500';
import Page404 from '../pages/404/page404';
import Auth from '../pages/auth/auth';
import Registration from '../pages/registration/registration';
import UserChangeData from '../pages/userChangeData/userChangeData';
import UserChangePassword from '../pages/userChangePassword/userChangePassword';
import UserSettings from '../pages/userSettings/UserSettings';
import Chats from '../pages/chats/chats';

interface AppState {
  currentPage: string;
}

export default class App {
    private state: AppState;
    private appElement: HTMLElement;

    constructor() {
        this.state = { currentPage: 'Chats' };
        const el = document.getElementById('app');
        if (!el) throw new Error('Контейнер #app не найден');
        this.appElement = el;
    }

    render(): void {
        let pageBlock;
        switch (this.state.currentPage) {
        case 'auth':
            pageBlock = new Auth({ class: 'page page__auth' });
            break;
        case 'registration':
            pageBlock = new Registration({ class: 'page page__reg' });
            break;
        case 'page500':
            pageBlock = new Page500({ class: 'page page500' });
            break;
        case 'page404':
            pageBlock = new Page404({ class: 'page page404' });
            break;
        case 'UserChangeData':
            pageBlock = new UserChangeData({ class: 'page page__userChangeData' });
            break;
        case 'UserChangePassword':
            pageBlock = new UserChangePassword({ class: 'page page__userChangePassword' });
            break;
        case 'UserSettings':
            pageBlock = new UserSettings({ class: 'page page__userSettings' });
            break;
        case 'Chats':
            pageBlock = new Chats({ class: 'page page__chats' });
            break;
        }
        if (pageBlock) {
            this.appElement.innerHTML = '';
            console.log(pageBlock);
            this.appElement.appendChild(pageBlock.getContent());
        }
    }
}

