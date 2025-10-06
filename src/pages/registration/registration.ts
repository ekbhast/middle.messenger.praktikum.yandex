import RegTemplate from '../../components/templates/regTemplate/regTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';
import { validateForm } from '../../utils/validateForm';
import { validateInput } from '../../utils/fromEvents';
import { authController } from '../../controllers/AuthController';
export default class Registration extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            RegTemplate: new RegTemplate({
                class: 'reg__template container--shadow',
            }),
            events: {
                focusout: (e:Event) => validateInput(e),
                submit: async (e:Event) => {
                    e.preventDefault();
                    const validationResult = ()=>validateForm(e);
                    if (!validationResult().error) {
                        const formData = validationResult().formData;
                        try {
                            await authController.signup(formData);
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
            <main class="page page__reg">
                {{{RegTemplate}}}
            </main>
        `;
    }
}
