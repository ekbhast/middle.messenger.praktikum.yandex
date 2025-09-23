import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import Button from '../../atoms/button/button';

export default class Navigate extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            ButtonAuth: new Button({
                class: 'button__primary',
                id: 'Auth',
                dataPage: 'Navigate',
                label: 'Авторизация',
            }),
            ButtonRegistration: new Button({
                class: 'button__primary',
                id: 'Registration',
                dataPage: 'Navigate',
                label: 'Регистрация',
            }),
            ButtonUserSettings: new Button({
                class: 'button__primary',
                id: 'UserSettings',
                dataPage: 'Navigate',
                label: 'Настройки пользоватлея',
            }),
            ButtonUserChangeData: new Button({
                class: 'button__primary',
                id: 'UserChangeData',
                dataPage: 'Navigate',
                label: 'Изменить данные пользователя',
            }),
            ButtonUserChangePassword: new Button({
                class: 'button__primary',
                id: 'UserChangePassword',
                dataPage: 'Navigate',
                label: 'Изменить пароль пользователя',
            }),
            ButtonChats: new Button({
                class: 'button__primary',
                id: 'Chats',
                dataPage: 'Navigate',
                label: 'Чаты',
            }),
            ButtonPage404: new Button({
                class: 'button__primary',
                id: 'Page404',
                dataPage: 'Navigate',
                label: 'Страница 404',
            }),
            ButtonPage500: new Button({
                class: 'button__primary',
                id: 'Page500',
                dataPage: 'Navigate',
                label: 'Страница 500',
            }),
        });
    }
    protected render(): string {
        return `
        <div class="navigate">
            <nav class="navigateNav">
                <ul>
                    <li>
                        {{{ButtonAuth}}}
                    </li>
                    <li>
                        {{{ButtonRegistration}}}
                    </li>
                    <li>
                        {{{ButtonUserSettings}}}
                    </li>
                    <li>
                        {{{ButtonUserChangeData}}}
                    </li>
                    <li>
                        {{{ButtonUserChangePassword}}}
                    </li>
                    <li>
                        {{{ButtonChats}}}
                    </li>
                    <li>
                        {{{ButtonPage404}}}
                    </li>
                    <li>
                        {{{ButtonPage500}}}
                    </li>
                </ul>
            </nav>
        </div>

        `;
    }
}
