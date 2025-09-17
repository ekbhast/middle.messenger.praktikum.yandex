import Block from '../../../framework/Block';
import { LinkProps } from '../../../types/types';

export default class Link extends Block {
    constructor(props: LinkProps) {
        super({ ...props });
    }
    protected render(): string {
        return `
            <a id="{{id}}"href="{{href}}" class="{{class}}">{{text}}</a>
        `;
    }
}
