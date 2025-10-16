import Block from '../../framework/Block';
import AuthTemplate from '../../components/templates/authTemplate/AuthTemplate';
import { DefaultClassProps } from '../../types/types';
import { validateInput } from '../../utils/fromEvents';
import { validateForm } from '../../utils/validateForm';
import { authController } from '../../controllers/AuthController';


export default class Auth extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            AuthTemplate: new AuthTemplate({
                class: 'auth__template container--shadow',
            }),
            events: {
                focusout: (e:Event) => validateInput(e),
                submit: async (e:Event) => {
                    e.preventDefault();
                    const validationResult = ()=>validateForm(e);
                    if (!validationResult().error) {
                        const formData = validationResult().formData;
                        try {
                            await authController.signin(formData);
                        } catch (err: unknown) {
                            console.log(err);
                        }
                    }
                },
            },
        });
    }
    protected render(): string {
        return `
            <main class="page page__auth">
                {{{AuthTemplate}}}
            </main>
        `;
    }
}
