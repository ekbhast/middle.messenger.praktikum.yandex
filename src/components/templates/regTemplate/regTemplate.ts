import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';

export default class RegTemplate extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props });
    }
    protected render(): string {
        return `
            <div class="{{class}}">
                {{{RegFromBlock}}}
            </div>
        `;
    }
}
