import Block from '../../../framework/Block';
import { IconButtonProps } from '../../../types/types';

export default class IconButton extends Block {
    constructor(props: IconButtonProps) {
        super({ ...props });
    }
    protected render(): string {
        return `
        <button class="{{class}}">
            <img src="{{imgSrc}}" alt="" class="{{imgClass}}">
        </button>
        `;
    }
}
