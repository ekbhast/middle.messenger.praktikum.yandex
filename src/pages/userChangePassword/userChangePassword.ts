import UserChangePasswordTemplate from '../../components/templates/userChangePasswordTemplate/UserChangePasswordTemplate';
import Block from '../../framework/Block';
import { validateInput } from '../../utils/fromEvents';
import { validateForm } from '../../utils/validateForm';
import { userController } from '../../controllers/UserController';

import { DefaultClassProps } from '../../types/types';


export default class UserChangePassword extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            UserChangePasswordTemplate: new UserChangePasswordTemplate({
                class: 'userChangePasswordTemplate',
            }),
            events: {
                focusout: (e:Event) => validateInput(e),
                submit: async (e:Event) => {
                    e.preventDefault();
                    const validationResult = ()=>validateForm(e);
                    if (!validationResult().error) {
                        const formData = validationResult().formData;
                        try {
                            await userController.changePassword(formData);
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
        <main class="page page__userChangePassword">
            {{{UserChangePasswordTemplate}}}
        </main>

        `;
    }
}
