import Block from '../../../framework/Block';
import { ConnectedUserChangeDataRows } from '../../molecules/userChangeDataRows/userChangeDataRows';
import { DefaultClassProps } from '../../../types/types';
import AvatarButton from '../../atoms/avatarButton/avatarButton';
import Button from '../../atoms/button/button';

export default class UerChangeDataFromBlock extends Block {
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
            Button: new Button({
                class: 'button__primary userChangeData__button',
                label: 'Сохранить',
                type: 'submit',
            }),
            UserChangeDataRows: new ConnectedUserChangeDataRows({
                class: 'userChangeData__rows',
            }),
        });
    }

    protected render(): string {
        return `
            <form class="{{class}}">
                {{{AvatarButton}}}
                {{{UserChangeDataRows}}}
                {{{Button}}}
            </form>

        `;
    }
}
