import H1 from '../../components/atoms/headers/h1/h1';
import H2 from '../../components/atoms/headers/h2/h2';
import Link from '../../components/atoms/link/link';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';

export default class Page404 extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            H1: new H1({
                class: 'page404__header',
                label: '404',
            }),
            H2: new H2({
                class: 'page404___header2',
                label: 'Не туда попали',
            }),
            Link: new Link({
                class: 'page404__link',
                href: '#',
                text: 'Назад к чатам',
            }),
        });
    }

    protected render(): string {
        return `
        <main class="page page404">
            {{{H1}}}
            {{{H2}}}
            {{{Link}}}
        </main>
        `;
    }
}
