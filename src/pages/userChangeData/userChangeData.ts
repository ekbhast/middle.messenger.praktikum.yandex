import UserChangeDataTemplate from '../../components/templates/UserChangeDataTemplate/userChangeDataTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';
import { validateInput } from '../../utils/fromEvents';
import { validateForm } from '../../utils/validateForm';

export default class UserChangeData extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            UserChangeDataTemplate: new UserChangeDataTemplate({
                class: 'userChangeData__template',
            }),
            events: {
                focusout: (e:Event) => validateInput(e),
                submit: async (e:Event) => {
                    const prev = () => validateForm(e);
                    console.log(prev().formData);
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
