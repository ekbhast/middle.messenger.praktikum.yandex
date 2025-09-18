import Page500 from '../pages/500/page500';
import Page404 from '../pages/404/page404';
import Auth from '../pages/auth/auth';
import Registration from '../pages/registration/registration';
import UserChangeData from '../pages/userChangeData/userChangeData';
import UserChangePassword from '../pages/userChangePassword/userChangePassword';
import UserSettings from '../pages/userSettings/UserSettings';
import Chats from '../pages/chats/chats';
import Navigate from '../components/organism/navigate/navigate';
import { validateField, validationRules, FieldName } from '../utils/validation';


interface AppState {
  currentPage: string;
}

export default class App {
    private state: AppState;
    private appElement: HTMLElement;
    private navigate: Navigate;

    constructor() {
        this.state = { currentPage: 'Auth' };
        const el = document.getElementById('app');
        if (!el) throw new Error('Контейнер #app не найден');
        this.appElement = el;
        this.navigate = new Navigate({ class: 'navigate' });
        this.navigate.getContent().addEventListener('click', (event) => {
            const target: HTMLElement = event.target as HTMLElement;
            const page: string = target.id;
            if (page) {
                this.state = { currentPage: page };
                this.render();
            }
        });
    }

    render(): void {
        let pageBlock;
        switch (this.state.currentPage) {
        case 'Auth':
            pageBlock = new Auth({ class: 'page page__auth' });
            break;
        case 'Registration':
            pageBlock = new Registration({ class: 'page page__reg' });
            break;
        case 'Page500':
            pageBlock = new Page500({ class: 'page page500' });
            break;
        case 'Page404':
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
            this.appElement.appendChild(pageBlock.getContent());
            this.appElement.appendChild(this.navigate.getContent());
            this.validationPage();
        }
    }
    private validationPage() {
        if(this.state.currentPage === 'Auth') return;
        const form: HTMLFormElement | null = this.appElement.querySelector('form');
        if (!form) return;

        const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');

        inputs.forEach((input) => {
            input.addEventListener('blur', () => {
                if (input.name in validationRules) {
                    const isError = validateField(input.name as FieldName, input.value);
                    if (isError) {
                        input.classList.add('errorBottom');
                        console.log(`Поле ${input.name} заполнено неверно`);
                    } else {
                        console.log(`Поле ${input.name} корректно`);
                        input.classList.remove('errorBottom');
                    }
                }
            });
        });
        // submit с проверкой всех полей
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData: Record<string, string> = {};
            inputs.forEach((input) => {
                const error = validateField(input.name, input.value);
                if (error) {
                    input.classList.add('errorBottom');
                    console.log('неверно!!!');
                } else {                    
                    inputs.forEach((input) => {
                        formData[input.name] = input.value;
                    });
                    console.log(formData);
                        input.classList.remove('errorBottom');
                }
            });
        });
    }
}
