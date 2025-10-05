import RegTemplate from '../../components/templates/regTemplate/regTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';
import { validateForm } from '../../utils/validateForm';
import { validateInput } from '../../utils/fromEvents';

export default class Registration extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            RegTemplate: new RegTemplate({
                class: 'reg__template container--shadow',
            }),
            events: {
                focusout: (e:Event) => validateInput(e),
                submit: (e:Event)=> validateForm(e),
            },
        });
    }
    protected render(): string {
        return `
            <main class="page page__reg">
                {{{RegTemplate}}}
            </main>
        `;
    }
}
