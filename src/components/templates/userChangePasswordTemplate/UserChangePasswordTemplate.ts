import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import UserChangePasswordFromBlock from '../../organism/userChangePasswordFromBlock/UserChangePasswordFromBlock';

export default class UserChangePasswordTemplate extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            UserChangePasswordFromBlock: new UserChangePasswordFromBlock({
                class: 'UserChangePasswordFromBlock',
            }),
        });
    }

    protected render(): string {
        return `
            <div class="userChangePasswordTemplate">
                {{{UserChangePasswordFromBlock}}}
            </div>
        `;
    }
}
