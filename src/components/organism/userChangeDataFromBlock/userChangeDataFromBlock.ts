import Block from '../../../framework/Block';
import { ConnectedUserChangeDataRows } from '../../molecules/userChangeDataRows/userChangeDataRows';
import { DefaultClassProps, BlockProps } from '../../../types/types';
import AvatarButton from '../../atoms/avatarButton/avatarButton';
import Button from '../../atoms/button/button';
import { connect } from '../../../utils/connect';
import { Indexed } from '../../../types/types';
import { baseUrlResourse } from '../../../api/baseUrls';
type UserChangeDataFromBlock2Props = DefaultClassProps & BlockProps;
export default class UserChangeDataFromBlock extends Block {
    constructor(props?: UserChangeDataFromBlock2Props) {
        super({ ...props,
            Button: new Button({
                class: 'button__primary userChangeData__button',
                label: 'Сохранить',
                type: 'submit',
            }),
            UserChangeDataRows: new ConnectedUserChangeDataRows(),
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

function mapUserToProps(state: Indexed) {
    const avatar = state.user.avatar;
    return {
        class: 'userChangeDataFromBlock',
        AvatarButton: new AvatarButton({
            class: 'avatarButton',
            imgSrcAvatarChange: '/src/assets/change_avatar.jpg',
            imgSrcAvatar: `${baseUrlResourse + avatar}`,
            buttonType: 'file',
            classImgAvatar: 'avatar-img',
            classImgAvatarChange: 'avatarButton__img avatarButton__img--change',
            alt: 'User avatar',
            events: {
                click: (e:Event)=>{
                    console.log('click');
                    const target = e.target as HTMLElement;
                    if (target.id === 'avatarPreview') {
                        const input = document.querySelector('#avatarInput') as HTMLInputElement;
                        input?.click();
                    }
                },
                change: (event: Event) => {
                    const input = event.target as HTMLInputElement;
                    const file = input.files?.[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const img = document.querySelector('#avatarPreview') as HTMLImageElement;
                            img.src = reader.result as string;
                        };
                        reader.readAsDataURL(file);
                    }
                },
            },
        }),
    };
}

export const ConnectedUserChangeDataFromBlock = connect(UserChangeDataFromBlock, mapUserToProps);
