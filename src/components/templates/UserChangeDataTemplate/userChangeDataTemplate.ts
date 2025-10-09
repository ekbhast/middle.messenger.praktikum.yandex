import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import { ConnectedUserChangeDataFromBlock } from '../../organism/userChangeDataFromBlock/userChangeDataFromBlock';
export default class UserChangeDataTemplate extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            UserChangeDataFromBlock: new ConnectedUserChangeDataFromBlock({
                class: 'userChangeDataFromBlock',
            }),
        });
    }

    protected render(): string {
        return `
            <div class="{{class}}">
                {{{UserChangeDataFromBlock}}}
            </div>
        `;
    }
}
