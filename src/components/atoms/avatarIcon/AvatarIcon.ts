import Block from '../../../framework/Block';
import { AvatarIconProps } from '../../../types/types';
export default class AvatarIcon extends Block {
    constructor(props: AvatarIconProps) {
        super(props);
    }

    protected render(): string {
        return `
        <div class="{{class}}">
            <img src="{{imgSrc}}" class="avatarIcon__img" />
        </div>
        `;
    }
}
