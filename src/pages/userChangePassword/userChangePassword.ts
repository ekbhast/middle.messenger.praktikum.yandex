import UserChangePasswordTemplate from '../../components/templates/userChangePasswordTemplate/UserChangePasswordTemplate';
import Block from '../../framework/Block';

import { DefaultClassProps } from '../../types/types';

export default class UserChangePassword extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            UserChangePasswordTemplate: new UserChangePasswordTemplate({
                class: 'userChangePasswordTemplate',
            }),
        });
    }

    protected render(): string {
        return `
        <main class="{{class}}">
            {{{UserChangePasswordTemplate}}}
        </main>

        `;
    }
}
