import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import { ConnectedUserSettingsFromBlock } from '../../organism/userSettingsFromBlock/userSettingsFromBlock';

export default class UserSettingsTemplate extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            UserSettingsFromBlock: new ConnectedUserSettingsFromBlock(),
        });
    }
    protected render(): string {
        return `
        <div class="{{class}}">
            {{{UserSettingsFromBlock}}}
        </div>
        `;
    }
}
