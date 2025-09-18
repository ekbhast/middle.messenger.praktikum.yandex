import Block from '../../../framework/Block';
import Button from '../../atoms/button/button';
import H1 from '../../atoms/headers/h1/h1';
import Link from '../../atoms/link/link';
import LoginFields from '../../molecules/loginFields/loginFields';

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
            }),
            Link: new Link({
                href: '#',
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
