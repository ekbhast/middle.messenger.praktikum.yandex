import RegTemplate from '../../components/templates/regTemplate/regTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';

export default class Registration extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            RegTemplate: new RegTemplate({
                class: 'reg__template container--shadow',
            }),
        });
    }
    protected render(): string {
        return `
            <main class="{{class}}">
                {{{RegTemplate}}}
            </main>
        `;
    }
}
