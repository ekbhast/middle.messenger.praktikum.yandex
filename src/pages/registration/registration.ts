import RegTemplate from '../../components/templates/regTemplate/regTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';
import createFormEvents from '../../utils/fromEvents';


export default class Registration extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            RegTemplate: new RegTemplate({
                class: 'reg__template container--shadow',
            }),
            events: createFormEvents(),
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
