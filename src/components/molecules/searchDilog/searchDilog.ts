import Block from '../../../framework/Block';
import { DefaultClassProps, BlockProps } from '../../../types/types';
import { ConnecteSearchUserH2 } from '../../atoms/headers/h2/h2';
import { ConnecteSearchUserAvatarIcon } from '../../atoms/avatarIcon/AvatarIcon';
import { connect } from '../../../utils/connect';

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
            <div class="dialog__block">
                <div class="dialog__block--avatar">
                    {{{AvatarIcon}}}
                    {{Error}}
                </div>
                <div class="dialog__block--message">
                    <div class="dialog__block--header">
                        {{{H2}}}
                    </div>          
                </div>
            </div>    
        </div>
        `;
    }
}

function mapUserToProps() {
    return {
        class: 'dialog',
    };
}

export const ConnectedSearchDialog = connect(SearchDialog, mapUserToProps);

