import Block from '../../../framework/Block';
import { DefaultClassProps, BlockProps } from '../../../types/types';
import Input from '../../atoms/input/input';
import Span from '../../atoms/span/spat';
import { connect } from '../../../utils/connect';
import { Indexed } from '../../../types/types';
type UserChangeDataRows2Props = DefaultClassProps & BlockProps;
export default class UserChangeDataRows extends Block {
    constructor(props?: UserChangeDataRows2Props) {
        super({ ...props,

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
                <div class="input-error" data-error-for="email"></div>

                <div class="userSettings__row userSettings__row--bottom">
                    <div>{{{SpanLogin}}}</div>
                    {{{InputLogin}}}  
                </div>
                <div class="input-error" data-error-for="login"></div>

                <div class="userSettings__row userSettings__row--bottom">
                    <div>{{{SpanName}}}</div>
                    {{{InputName}}}  
                </div>
                <div class="input-error" data-error-for="first_name"></div>

                <div class="userSettings__row userSettings__row--bottom">
                    <div>{{{SpanSecondName}}}</div>
                    {{{InputSecondName}}}  
                </div>
                <div class="input-error" data-error-for="second_name"></div>

                <div class="userSettings__row userSettings__row--bottom">
                    <div>{{{SpanDisplayName}}}</div>
                    {{{InputDisplayName}}}  
                </div>
                <div class="input-error" data-error-for="display_name"></div>

                <div class="userSettings__row">
                    <div>{{{SpanPhone}}}</div>
                    {{{InputPhone}}}  
                </div>
                <div class="input-error" data-error-for="phone"></div>
            </div>

        `;
    }
}

function mapUserToProps(state: unknown) {
    const s = state as Indexed;
    const user = s.user || {};

    return {
        class: 'userChangeData__rows',
        InputMail: new Input({
            class: 'userChangeData__input',
            placeholder: 'pochta@yandex.ru',
            name: 'email',
            type: 'text',
            value: user.email || '',
        }),
        InputLogin: new Input({
            class: 'userChangeData__input',
            placeholder: 'ivanivanov',
            name: 'login',
            type: 'text',
            value: user.login || '',
        }),
        InputName: new Input({
            class: 'userChangeData__input',
            placeholder: 'Иван',
            name: 'first_name',
            type: 'text',
            value: user.first_name || '',
        }),
        InputSecondName: new Input({
            class: 'userChangeData__input',
            placeholder: 'Иванов',
            name: 'second_name',
            type: 'text',
            value: user.second_name || '',
        }),
        InputDisplayName: new Input({
            class: 'userChangeData__input',
            placeholder: 'Иван',
            name: 'display_name',
            type: 'text',
            value: user.display_name || '',
        }),
        InputPhone: new Input({
            class: 'userChangeData__input',
            placeholder: 'Телефон',
            name: 'phone',
            type: 'text',
            value: user.phone || '',
        }),
    };
}
export const ConnectedUserChangeDataRows = connect(UserChangeDataRows, mapUserToProps);
