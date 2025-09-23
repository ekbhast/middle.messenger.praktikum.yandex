import Block from '../../../framework/Block';
import LoginFromBlock from '../../organism/loginFromBlock/LoginFromBlock';
import { DefaultClassProps } from '../../../types/types';


export default class AuthTemplate extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            LoginFromBlock: new LoginFromBlock({
                class: 'auth__fromBlock',
            }),
        });
    }

    protected render(): string {
        return `
    <div class="{{class}}">
        {{{ LoginFromBlock }}}
    </div>
    
    `;
    }
}
