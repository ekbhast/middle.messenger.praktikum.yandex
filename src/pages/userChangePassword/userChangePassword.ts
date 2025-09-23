import UserChangePasswordTemplate from '../../components/templates/userChangePasswordTemplate/UserChangePasswordTemplate';
import Block from '../../framework/Block';

import { DefaultClassProps } from '../../types/types';
import createFormEvents from '../../utils/fromEvents';


export default class UserChangePassword extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            UserChangePasswordTemplate: new UserChangePasswordTemplate({
                class: 'userChangePasswordTemplate',
            }),
            events: createFormEvents(),
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
