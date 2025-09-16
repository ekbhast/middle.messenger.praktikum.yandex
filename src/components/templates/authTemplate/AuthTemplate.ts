import Block from '../../../framework/Block';
import LoginFromBlock from '../../organism/loginFromBlock/LoginFromBlock';

interface AuthTemplateProps {
    class?: string;
}

export default class AuthTemplate extends Block {
    constructor(props: AuthTemplateProps) {
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
