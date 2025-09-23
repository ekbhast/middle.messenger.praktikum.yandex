import UserChangeDataTemplate from '../../components/templates/UserChangeDataTemplate/userChangeDataTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';
import createFormEvents from '../../utils/fromEvents';

export default class UserChangeData extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            UserChangeDataTemplate: new UserChangeDataTemplate({
                class: 'userChangeData__template',
            }),
            events: createFormEvents(),
        });
    }

    protected render(): string {
        return `
            <main class="{{class}}">
                {{{UserChangeDataTemplate}}}
            </main>
        `;
    }
}
