import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import AvatarButton from '../../atoms/avatarButton/avatarButton';
import H1 from '../../atoms/headers/h1/h1';
import Link from '../../atoms/link/link';
import { ConnectedUserSettingsRows } from '../../molecules/userSettingsRows/UserSettingsRows';
import { authController } from '../../../controllers/AuthController';
export default class UserSettingsFromBlock extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            AvatarButton: new AvatarButton({
                class: 'avatarButton',
                imgSrcAvatarChange: '/src/assets/change_avatar.jpg',
                imgSrcAvatar: '/src/assets/1648314277_5-kartinkof-club-p-yao-min-mem-5.jpg',
                buttonType: 'file',
                classImgAvatar: 'avatarButton__img',
                classImgAvatarChange: 'avatarButton__img avatarButton__img--change',
                alt: 'User avatar',
            }),
            H1: new H1({
                class: 'userSettings__header',
                label: 'Иван',
            }),
            LinkUserData: new Link({
                id: 'change_userData',
                class: 'userSettings__link',
                href: 'user-change-date',
                text: 'Изменить данные',
            }),
            LinkUserPassword: new Link({
                id: 'change_userPassword',
                class: 'userSettings__link',
                href: 'user-change-password',
                text: 'Изменить пароль',
            }),
            LinkUserActionLinks: new Link({
                id: 'quit',
                class: 'userSettings__link--red',
                href: '/',
                text: 'Выйти',
                events: {
                    click: async (e:Event)=> {
                        e.preventDefault();
                        try {
                            await authController.logout();
                        } catch {
                            console.log('не вышло');
                        }
                    },
                },
            }),
            UserSettingsRows: new ConnectedUserSettingsRows({
                class: 'userSettings__rows',
            }),
        });
    }
    protected render(): string {
        return `
        <div class="{{class}}">
            {{{AvatarButton}}}
            {{{H1}}}
            {{{UserSettingsRows}}}
            <div class="userSettings__actionLinks">
                <div class="userSettings__actionLinks--bottom">
                    {{{LinkUserData}}}
                </div>
                <div class="userSettings__actionLinks--bottom">
                    {{{LinkUserPassword}}}
                </div>
                <div class="userSettings__actionLinks">
                    {{{LinkUserActionLinks}}}
                </div>
            </div>
        </div>

        `;
    }
}
