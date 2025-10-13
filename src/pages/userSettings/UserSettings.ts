import UserSettingsTemplate from '../../components/templates/userSettingsTemplate/userStiingsTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';

export default class UserSettings extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            UserSettingsTemplate: new UserSettingsTemplate({
                class: 'userSettings__template',
            }),
        });
    }
    protected render(): string {
        return `
            <main class="page page__userSettings">
                {{{UserSettingsTemplate}}}
            </main>
        `;
    }
}
