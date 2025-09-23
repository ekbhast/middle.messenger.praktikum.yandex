import Block from '../../../framework/Block';

import { SpanProps } from '../../../types/types';

export default class Span extends Block {
    constructor(props: SpanProps) {
        super({ ...props });
    }
    protected render(): string {
        return `
            <span class="{{class}}">{{text}}</span>
        `;
    }
}
