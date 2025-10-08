import UserChangeDataTemplate from '../../components/templates/UserChangeDataTemplate/userChangeDataTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';
import { validateInput } from '../../utils/fromEvents';
import { validateForm } from '../../utils/validateForm';
import { userController } from '../../controllers/UserController';
export default class UserChangeData extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            UserChangeDataTemplate: new UserChangeDataTemplate({
                class: 'userChangeData__template',
            }),
            events: {
                focusout: (e:Event) => validateInput(e),
                submit: async (e:Event) => {
                    e.preventDefault();
                    const validationResult = ()=>validateForm(e);
                    if (!validationResult().error) {
                        const formData = validationResult().formData;
                        try {
                            await userController.profile(formData);
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
            <main class="page page__userChangeData">
                {{{UserChangeDataTemplate}}}
            </main>
        `;
    }
}
