import Block from '../../../framework/Block';
import { ButtonProps } from '../../../types/types';

export default class Button extends Block {
    constructor(props: ButtonProps) {
        super({ ...props });
    }

    protected render(): string {
        return `
            <button class="{{class}}"id="{{id}}" 
            data-page="{{dataPage}}" type="{{type}}">{{label}}</button>

        `;
    }
}
