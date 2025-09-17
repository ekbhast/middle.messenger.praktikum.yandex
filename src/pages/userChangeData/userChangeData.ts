import UserChangeDataTemplate from '../../components/templates/UserChangeDataTemplate/userChangeDataTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';

export default class UserChangeData extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            UserChangeDataTemplate: new UserChangeDataTemplate({
                class: 'userChangeData__template',
            }),
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
