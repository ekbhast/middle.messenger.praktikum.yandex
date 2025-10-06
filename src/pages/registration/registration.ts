import RegTemplate from '../../components/templates/regTemplate/regTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';
import { validateForm } from '../../utils/validateForm';
import { validateInput } from '../../utils/fromEvents';
import { RegAPI } from '../../utils/api/reg-api';

export default class Registration extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            RegTemplate: new RegTemplate({
                class: 'reg__template container--shadow',
            }),
            events: {
                focusout: (e:Event) => validateInput(e),
                submit: async (e:Event) => {
                    const prev = ()=>validateForm(e);
                    if (!prev().error) {
                        console.log(prev().formData);
                        const regApi = new RegAPI();
                        try {
                            const user = await regApi.registration(prev().formData);
                            console.log('зарегистрирован', user);
                        } catch (err: string | unknown) {
                            console.log('ошибка', err);
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
