import Block from '../../../../framework/Block';
import { HeaderProps } from '../../../../types/types';

export default class H1 extends Block {
    constructor(props: HeaderProps) {
        super({ ...props });
    }

    protected render(): string {
        return `
             <h1 class="{{class}}">{{label}}</h1>
        `;
    }
}
