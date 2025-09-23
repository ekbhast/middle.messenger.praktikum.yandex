import Block from '../../../framework/Block';
import Input from '../../atoms/input/input';
import Label from '../../atoms/label/label';
import { DefaultClassProps } from '../../../types/types';

export default class LoginFields extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            LabelLogin: new Label({
                class: 'label',
                for: 'login__login',
                label: 'Логин',
            }),
            LabelPassword: new Label({
                class: 'label',
                for: 'login__password',
                label: 'Пароль',
            }),
            InputLogin: new Input({
                class: 'input',
                placeholder: 'Логин',
                id: 'login__login',
                name: 'login',
                type: 'text',
            }),
            InputPassword: new Input({
                class: 'input',
                placeholder: 'Пароль',
                id: 'login__password',
                name: 'password',
                type: 'password',
            }),
        });
    }

    protected render() {
        return `
            <div class="{{class}}">
                <div class="form-inputGroup">
                    {{{LabelLogin}}}
                    {{{InputLogin}}}
                </div>
                <div class="form-inputGroup">
                    {{{LabelPassword}}}
                    {{{InputPassword}}}
                </div>
            </div>
        `;
    }
}
