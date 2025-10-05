import Block from '../../../framework/Block';
import Button from '../../atoms/button/button';
import H1 from '../../atoms/headers/h1/h1';
import Link from '../../atoms/link/link';
import LoginFields from '../../molecules/loginFields/loginFields';
import { AuthAPI } from '../../../utils/API/auth-api';
import { router } from '../../../framework/Router';
interface LoginFromBlockProps{
    class? : string
}

export default class LoginFromBlock extends Block {
    constructor(props: LoginFromBlockProps) {
        super({ ...props,
            H1: new H1({
                class: 'form-header',
                label: 'Вход',
            }),
            LoginFields: new LoginFields({
                class: 'form-inputs',
            }),
            Button: new Button({
                class: 'button__primary auth__button',
                id: 'enter',
                label: 'Войти',
                type: 'submit',
                events: {
                    click: async (e: Event) => {
                        e.preventDefault(); // чтобы форма не отправлялась по умолчанию

                        // получаем значения из полей формы
                        const loginInput = document.querySelector<HTMLInputElement>('#login__login');
                        const passwordInput = document.querySelector<HTMLInputElement>('#login__password');

                        if (!loginInput || !passwordInput) return;

                        const login = loginInput.value;
                        const password = passwordInput.value;

                        const authAPI = new AuthAPI();

                        try {
                            const user = await authAPI.signin({ login, password });
                            router.go('/chats');
                            console.log('Пользователь авторизован:', user);
                        } catch (err: string | unknown) {
                            console.error('Ошибка авторизации:');

                            if (err.response && typeof err.response === 'object' && 'reason' in err.response) {
                                console.log('Причина:', err.response.reason);
                            } else {
                                console.error(err);
                            }
                        }
                    },
                },
            }),
            Link: new Link({
                href: 'registration',
                class: 'auth__link',
                text: 'Зарегистрироваться',
            }),
        });
    }

    protected render(): string {
        return `
        <form class="{{class}}">
            {{{H1}}}
            {{{LoginFields}}}
            {{{Button}}}
            {{{Link}}}
        </form>
        `;
    }
}
