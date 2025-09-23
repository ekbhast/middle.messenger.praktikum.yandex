import Block from '../../../framework/Block';
import { AvatarButtonProps } from '../../../types/types';
export default class AvatarButton extends Block {
    constructor(props: AvatarButtonProps) {
        super({ ...props });
    }

    protected render(): string {
        return `
        <button class="{{class}}" type="{{buttonType}}">
            <img src="{{imgSrcAvatarChange}}" alt="{{alt}}" class="{{classImgAvatarChange}}"/>
            <img src="{{imgSrcAvatar}}" alt="{{alt}}" class="{{classImgAvatar}}"/>
        </button>
        `;
    }
}
