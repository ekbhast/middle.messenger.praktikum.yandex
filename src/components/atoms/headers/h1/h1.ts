import Block from '../../../../framework/Block';

interface H1Props{
    class?: string,
    label?: string
}

export default class H1 extends Block {
    constructor(props: H1Props) {
        super({ ...props });
    }

    protected render(): string {
        return `
             <h1 class="{{class}}">{{label}}</h1>
        `;
    }
}
