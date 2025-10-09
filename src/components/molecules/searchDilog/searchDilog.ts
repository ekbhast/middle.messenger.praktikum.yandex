import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import AvatarIcon from '../../atoms/avatarIcon/AvatarIcon';
import H2 from '../../atoms/headers/h2/h2';
import { Indexed } from '../../../types/types';
import { connect } from '../../../utils/connect';
import { baseUrlResourse } from '../../../api/baseUrls';
import store from '../../../framework/Store';


export default class SearchDialog extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            AvatarIcon: new AvatarIcon({
                class: 'avatarIcon',
                imgSrc: '/src/assets/1648314277_5-kartinkof-club-p-yao-min-mem-5.jpg',
                classImg: 'avatarIcon__img',
            }),
            H2: new H2({
                class: 'dialog__dialogName',
                label: 'Валентин',
            }),
        });
    }
    protected render(): string {
        return `
        <div class="{{class}}">
            <div class="dialog__block">
                <div class="dialog__block--avatar">
                    {{{AvatarIcon}}}
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


function mapUserToProps(state: Indexed) {
    const displayName = store.getState().searchUser?.display_name;
    console.log(displayName);

    return {
        userSearchName: state.searchUser?.display_name,
        avatar: `${baseUrlResourse+state.searchUser?.avatar}`,
    };
}

export const ConnectedSearchDialog = connect(SearchDialog, mapUserToProps);

