import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import Input from '../../atoms/input/input';
import Span from '../../atoms/span/spat';

export default class UserChangePasswordRows extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            InputOldPassword: new Input({
                class: 'userChangeData__input',
                placeholder: 'pochta@yandex.ru',
                name: 'oldPassword',
                type: 'password',
            }),
            InputNewPassword: new Input({
                class: 'userChangeData__input',
                placeholder: 'ivanivanov',
                name: 'newPassword',
                type: 'password',
            }),
            InputNewPasswordConfirm: new Input({
                class: 'userChangeData__input',
                placeholder: 'Иван',
                name: 'first_name',
                type: 'newPassword-confirm',
            }),

            SpanOldPassword: new Span({
                class: 'userSettings__label',
                text: 'Старый пароль',
            }),
            SpanNewPassword: new Span({
                class: 'userSettings__label',
                text: 'Новый пароль',
            }),
            SpanNewPasswordConfirm: new Span({
                class: 'userSettings__label',
                text: 'Повторите новый пароль',
            }),
        });
    }

    protected render(): string {
        return `
            <div class="{{class}}">
                <div class="userSettings__row userSettings__row--bottom">
                    <div>{{{SpanOldPassword}}}</div>
                    {{{InputOldPassword}}}  
                </div>
                <div class="userSettings__row userSettings__row--bottom">
                    <div>{{{SpanNewPassword}}}</div>
                    {{{InputNewPassword}}}  
                </div>
                <div class="userSettings__row userSettings__row--bottom">
                    <div>{{{SpanNewPasswordConfirm}}}</div>
                    {{{InputNewPasswordConfirm}}}  
                </div>
            </div>

        `;
    }
}
