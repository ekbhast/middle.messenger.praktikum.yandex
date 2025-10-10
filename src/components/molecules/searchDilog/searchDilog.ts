import Block from '../../../framework/Block';
import { DefaultClassProps, BlockProps } from '../../../types/types';
import { ConnecteSearchUserH2 } from '../../atoms/headers/h2/h2';
import { ConnecteSearchUserAvatarIcon } from '../../atoms/avatarIcon/AvatarIcon';
import { connect } from '../../../utils/connect';
import { Indexed } from '../../../types/types';

type SearchDialog2Props = DefaultClassProps & BlockProps;

export default class SearchDialog extends Block {
    constructor(props?: SearchDialog2Props) {
        super({ ...props,
            AvatarIcon: new ConnecteSearchUserAvatarIcon(),
            H2: new ConnecteSearchUserH2(),
        });
    }
    protected render(): string {
        return `    
        <div class="{{class}}">
            <span>Найден пользователь:</span>
            <div class="dialog__block">
                <div class="dialog__block--avatar">
                    {{{AvatarIcon}}}
                </div>
                <div class="dialog__block--message">
                    <div class="dialog__block--header">
                        {{{H2}}}
                    </div>
                    <span>id: {{id}}</span>          
                </div>
            </div>    
        </div>
        `;
    }
}

function mapUserToProps(state: unknown) {
    const s = state as Indexed;
    return {
        class: 'dialog searchDilog disable',
        id: s.searchUser?.id || '',
    };
}

export const ConnectedSearchDialog = connect(SearchDialog, mapUserToProps);

