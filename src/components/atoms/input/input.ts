import Block from '../../../framework/Block';
import { InputProps } from '../../../types/types';

export default class Input extends Block {
    constructor(props: InputProps) {
        super(({ ...props }));
    }

    protected render(): string {
        return `
            <input class="{{class}}"placeholder="{{placeholder}} " id="{{id}}" type="{{type}}" name="{{name}}" >
        `;
    }
}
