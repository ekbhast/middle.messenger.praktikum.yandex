import Page500 from '../pages/500/page500';
import Page404 from '../pages/404/page404';
import Auth from '../pages/auth/auth';
import Registration from '../pages/registration/registration';

interface AppState {
  currentPage: string;
}

export default class App {
    private state: AppState;
    private appElement: HTMLElement;

    constructor() {
        this.state = { currentPage: 'page404' };
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
        }

        if (pageBlock) {
            this.appElement.innerHTML = '';
            console.log(pageBlock);
            this.appElement.appendChild(pageBlock.getContent());
        }
    }
}
