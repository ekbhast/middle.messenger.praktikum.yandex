import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import AvatarButton from '../../atoms/avatarButton/avatarButton';
import Button from '../../atoms/button/button';
import UserChangePasswordRows from '../../molecules/userChangePasswordRows/UserChangePasswordRows';

export default class UserChangePasswordFromBlock extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            AvatarButton: new AvatarButton({
                class: 'avatarButton',
                imgSrcAvatarChange: '/static/assets/change_avatar.jpg',
                imgSrcAvatar: '/static/assets/1648314277_5-kartinkof-club-p-yao-min-mem-5.jpg',
                buttonType: 'file',
                classImgAvatar: 'avatarButton__img',
                classImgAvatarChange: 'avatarButton__img avatarButton__img--change',
                alt: 'User avatar',
            }),
            Button: new Button({
                class: 'button__primary userChangeData__button',
                label: 'Сохранить',
                type: 'submit',
            }),
            UserChangePasswordRows: new UserChangePasswordRows({
                class: 'userChangeData__rows',
            }),
        });
    }
    protected render(): string {
        return `
        <form class="userChangePasswordFromBlock">
            {{{AvatarButton}}}
            {{{UserChangePasswordRows}}}
            {{{Button}}}
        </form>
        `;
    }
}
