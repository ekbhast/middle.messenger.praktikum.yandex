import H1 from '../../components/atoms/headers/h1/h1';
import H2 from '../../components/atoms/headers/h2/h2';
import Link from '../../components/atoms/link/link';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';

export default class Page500 extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            H1: new H1({
                class: 'page500__header',
                label: '500',
            }),
            H2: new H2({
                class: 'page500___header2',
                label: 'Мы уже фиксим',
            }),
            Link: new Link({
                class: 'page500__link',
                href: '#',
                text: 'Назад к чатам',
            }),
        });
    }

    protected render(): string {
        return `
        <main class="{{class}}">
            {{{H1}}}
            {{{H2}}}
            {{{Link}}}
        </main>
        `;
    }
}
