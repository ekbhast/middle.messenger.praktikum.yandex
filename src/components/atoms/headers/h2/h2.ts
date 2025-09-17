import Block from '../../../../framework/Block';
import { HeaderProps } from '../../../../types/types';

export default class H2 extends Block {
    constructor(props: HeaderProps) {
        super({ ...props });
    }
    protected render(): string {
        return `
        <h2 class="{{class}}">{{label}}</h2>
        `;
    }
}
