import Block from '../../framework/Block';
import AuthTemplate from '../../components/templates/authTemplate/AuthTemplate';

interface AuthProps{
    class?: string;
}

export default class Auth extends Block {
    constructor(props: AuthProps) {
        super({ ...props,
            AuthTemplate: new AuthTemplate({
                class: 'auth__template container--shadow',
            }),
        });
    }
    protected render(): string {
        return `
            <main class="{{class}}">
                {{{AuthTemplate}}}
            </main>
        `;
    }
}
