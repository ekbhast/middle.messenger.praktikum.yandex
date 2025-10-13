import Block from '../../../framework/Block';
import { AvatarButtonProps } from '../../../types/types';
export default class AvatarButton extends Block {
    constructor(props: AvatarButtonProps) {
        super({ ...props });
    }

    protected render(): string {
        return `
        <div class="avatar-wrapper">
            <input 
                class="avatar-input" 
                type="file" 
                id="avatarInput" 
                name="avatar" 
                accept="image/*"
                style="display: none;"
            >

            <img 
                src="{{imgSrcAvatar}}" 
                alt="{{alt}}" 
                class="{{classImgAvatar}}" 
                id="avatarPreview"
            >
        </div>
        `;
    }
}
