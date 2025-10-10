import Block from '../../../framework/Block';
import { DefaultClassProps, BlockProps } from '../../../types/types';
import AvatarButton from '../../atoms/avatarButton/avatarButton';
import H1 from '../../atoms/headers/h1/h1';
import Link from '../../atoms/link/link';
import { ConnectedUserSettingsRows } from '../../molecules/userSettingsRows/UserSettingsRows';
import { authController } from '../../../controllers/AuthController';
import { Indexed } from '../../../types/types';
import { connect } from '../../../utils/connect';
import { router } from '../../../framework/Router';
import { baseUrlResourse } from '../../../api/baseUrls';
type UserSettings2Props = DefaultClassProps & BlockProps;

export default class UserSettingsFromBlock extends Block {
    constructor(props?: UserSettings2Props) {
        super({ ...props,
            LinkUserData: new Link({
                id: 'change_userData',
                class: 'userSettings__link',
                href: 'user-change-date',
                text: 'Изменить данные',
                events: {
                    click: (e:Event)=>{
                        e.preventDefault();
                        router.go('/user-change-date');
                    },
                },
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
            UserSettingsRows: new ConnectedUserSettingsRows(),
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

function mapUserToProps(state: unknown) {
    const s = state as Indexed;
    const user = s.user || {};

    return {
        class: 'userSettings__fromBlock',
        H1: new H1({
            class: 'userSettings__header',
            label: user.first_name || '',
        }),
        AvatarButton: new AvatarButton({
            class: 'avatarButton',
            imgSrcAvatarChange: '/src/assets/change_avatar.jpg',
            imgSrcAvatar: `${baseUrlResourse + (user.avatar || '')}`,
            buttonType: 'file',
            classImgAvatar: 'avatar-img',
            classImgAvatarChange: 'avatarButton__img avatarButton__img--change',
            alt: 'User avatar',
        }),
    };
}


// Подключаем компонент к стору через HOC
export const ConnectedUserSettingsFromBlock = connect(UserSettingsFromBlock, mapUserToProps);
