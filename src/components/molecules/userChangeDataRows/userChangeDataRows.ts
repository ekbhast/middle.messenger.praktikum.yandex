import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import Input from '../../atoms/input/input';
import Span from '../../atoms/span/spat';

export default class UserChangeDataRows extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            InputMail: new Input({
                class: 'userChangeData__input',
                placeholder: 'pochta@yandex.ru',
                name: 'email',
                type: 'text',
            }),
            InputLogin: new Input({
                class: 'userChangeData__input',
                placeholder: 'ivanivanov',
                name: 'login',
                type: 'text',
            }),
            InputName: new Input({
                class: 'userChangeData__input',
                placeholder: 'Иван',
                name: 'first_name',
                type: 'text',
            }),
            InputSecondName: new Input({
                class: 'userChangeData__input',
                placeholder: 'Иванов',
                name: 'second_name',
                type: 'text',
            }),
            InputDisplayName: new Input({
                class: 'userChangeData__input',
                placeholder: 'Иван',
                name: 'display_name',
                type: 'text',
            }),
            InputPhone: new Input({
                class: 'userChangeData__input',
                placeholder: 'Телефон',
                name: 'phone',
                type: 'text',
            }),
            SpanMail: new Span({
                class: 'userSettings__label',
                text: 'Почта',
            }),
            SpanLogin: new Span({
                class: 'userSettings__label',
                text: 'Логин',
            }),
            SpanName: new Span({
                class: 'userSettings__label',
                text: 'Имя',
            }),
            SpanSecondName: new Span({
                class: 'userSettings__label',
                text: 'Фамилия',
            }),
            SpanDisplayName: new Span({
                class: 'userSettings__label',
                text: 'Имя в чате',
            }),
            SpanPhone: new Span({
                class: 'userSettings__label',
                text: 'Телефон',
            }),
        });
    }

    protected render(): string {
        return `
            <div class="{{class}}">
                <div class="userSettings__row userSettings__row--bottom">
                    <div>{{{SpanMail}}}</div>
                    {{{InputMail}}}  
                </div>
                <div class="userSettings__row userSettings__row--bottom">
                    <div>{{{SpanLogin}}}</div>
                    {{{InputLogin}}}  
                </div>
                <div class="userSettings__row userSettings__row--bottom">
                    <div>{{{SpanName}}}</div>
                    {{{InputName}}}  
                </div>
                <div class="userSettings__row userSettings__row--bottom">
                    <div>{{{SpanSecondName}}}</div>
                    {{{InputSecondName}}}  
                </div>
                <div class="userSettings__row userSettings__row--bottom">
                    <div>{{{SpanDisplayName}}}</div>
                    {{{InputDisplayName}}}  
                </div>
                <div class="userSettings__row">
                    <div>{{{SpanPhone}}}</div>
                    {{{InputPhone}}}  
                </div>
            </div>

        `;
    }
}
