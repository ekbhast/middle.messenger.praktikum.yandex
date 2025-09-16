import Auth from '../pages/auth/auth';

interface AppState {
  currentPage: string;
}

export default class App {
    private state: AppState;
    private appElement: HTMLElement;

    constructor() {
        this.state = { currentPage: 'auth' };
        const el = document.getElementById('app');
        if (!el) throw new Error('Контейнер #app не найден');
        this.appElement = el;
    }

    render(): void {
        let pageBlock;
        if (this.state.currentPage === 'auth') {
            pageBlock = new Auth({ class: 'page page__auth' });
        }

        if (pageBlock) {
            this.appElement.innerHTML = '';
            console.log(pageBlock);
            this.appElement.appendChild(pageBlock.getContent());
        }
    }
}
