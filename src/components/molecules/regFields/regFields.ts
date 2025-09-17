import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import Input from '../../atoms/input/input';
import Label from '../../atoms/label/label';

export default class RegFields extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            LabelMail: new Label({
                class: 'label auth__label',
                label: 'Почта',
                for: 'reg__email',
            }),
            LabelLogin: new Label({
                class: 'label auth__label',
                label: 'Логин',
                for: 'reg__login',
            }),
            LabelName: new Label({
                class: 'label auth__label',
                label: 'Имя',
                for: 'reg__name',
            }),
            LabelSecondName: new Label({
                class: 'label auth__label',
                label: 'Фамилия',
                for: 'reg__second_name',
            }),
            LabelPhone: new Label({
                class: 'label auth__label',
                label: 'Телефон',
                for: 'reg__phone',
            }),
            LabelPassword: new Label({
                class: 'label auth__label',
                label: 'Пароль',
                for: 'reg__password',
            }),
            LabelPasswordConfirm: new Label({
                class: 'label auth__label',
                label: 'Пароль(еще раз)',
                for: 'reg__password-confirm',
            }),
            InputMail: new Input({
                class: 'input',
                placeholder: 'Почта',
                id: 'reg__email',
                name: 'email',
                type: 'text',
            }),
            InputLogin: new Input({
                class: 'input',
                placeholder: 'Логин',
                id: 'reg__login',
                name: 'login',
                type: 'text',
            }),
            InputName: new Input({
                class: 'input',
                placeholder: 'Имя',
                id: 'reg__name',
                name: 'first_name',
                type: 'text',
            }),
            InputSecondName: new Input({
                class: 'input',
                placeholder: 'Фамилия',
                id: 'reg__second_name',
                name: 'second_name',
                type: 'text',
            }),
            InputPhone: new Input({
                class: 'input',
                placeholder: 'Телефон',
                id: 'reg__phone',
                name: 'phone',
                type: 'text',
            }),
            InputPassword: new Input({
                class: 'input',
                placeholder: 'Пароль',
                id: 'reg__password',
                name: 'password',
                type: 'password',
            }),
            InputPasswordConfirm: new Input({
                class: 'input',
                placeholder: 'Пароль(еще раз)',
                id: 'reg__password-confirm',
                name: 'password_confirm',
                type: 'password',
            }),
        });
    }

    protected render(): string {
        return `
            <div class="{{class}}">
                <div class="form-inputGroup">
                    {{{LabelMail}}}
                    {{{InputMail}}}
                </div>
                <div class="form-inputGroup">
                    {{{LabelLogin}}}
                    {{{InputLogin}}}
                </div>
                <div class="form-inputGroup">
                    {{{LabelName}}}
                    {{{InputName}}}
                </div>
                <div class="form-inputGroup">
                    {{{LabelSecondName}}}
                    {{{InputSecondName}}}
                </div>
                <div class="form-inputGroup">
                    {{{LabelPhone}}}
                    {{{InputPhone}}}
                </div>
                <div class="form-inputGroup">
                    {{{LabelPassword}}}
                    {{{InputPassword}}}
                </div>
                <div class="form-inputGroup">
                    {{{LabelPasswordConfirm}}}
                    {{{InputPasswordConfirm}}}
                </div>
            </div>
        `;
    }
}
