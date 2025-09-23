import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import Button from '../../atoms/button/button';
import H1 from '../../atoms/headers/h1/h1';
import Link from '../../atoms/link/link';
import RegFields from '../../molecules/regFields/regFields';

export default class RegFromBlock extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            H1: new H1({
                class: 'form-header',
                label: 'Регистрация',
            }),
            Button: new Button({
                class: 'button__primary reg__button',
                id: 'enter',
                label: 'Войти',
                type: 'submit',
            }),
            Link: new Link({
                href: '#',
                class: 'reg__link',
                text: 'Зарегистрироваться',
            }),
            RegFields: new RegFields({
                class: 'form-inputs',
            }),
        });
    }
    protected render(): string {
        return `
            <form class="{{class}}">
                {{{H1}}}
                {{{RegFields}}}
                {{{Button}}}
                {{{Link}}}
            </form>
        `;
    }
}
