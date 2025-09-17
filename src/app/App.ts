import Auth from '../pages/auth/auth';
import Registration from '../pages/registration/registration';

interface AppState {
  currentPage: string;
}

export default class App {
    private state: AppState;
    private appElement: HTMLElement;

    constructor() {
        this.state = { currentPage: 'registration' };
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
        }

        if (pageBlock) {
            this.appElement.innerHTML = '';
            console.log(pageBlock);
            this.appElement.appendChild(pageBlock.getContent());
        }
    }
}
