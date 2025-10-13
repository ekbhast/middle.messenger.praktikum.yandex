import Block from '../../../framework/Block';
import { DefaultClassProps, BlockProps } from '../../../types/types';
import { ConnecteSearchUserH2 } from '../../atoms/headers/h2/h2';
import { ConnecteSearchUserAvatarIcon } from '../../atoms/avatarIcon/AvatarIcon';
import { connect } from '../../../utils/connect';
import { Indexed } from '../../../types/types';
import Button from '../../atoms/button/button';
import { chatsController } from '../../../controllers/ChatsController';
import store from '../../../framework/Store';
import { closeModal } from '../../../utils/closeModalAll';

type SearchDialog2Props = DefaultClassProps & BlockProps;


export default class SearchDialog extends Block {
    constructor(props?: SearchDialog2Props) {
        super({ ...props,
            AvatarIcon: new ConnecteSearchUserAvatarIcon(),
            H2: new ConnecteSearchUserH2(),
            buttonAddUser: new Button({
                class: 'searchDilog__buttonAddUser',
                label: 'Добавить',
                events: {
                    click: async (e: Event) => {
                        console.log('Добавить пользователя в чат');

                        const searchUserId = store.getState().searchUser?.id;
                        const activeChatId = store.getState().activeChatId;

                        if (!searchUserId || !activeChatId) {
                            console.error('Нет данных: searchUserId или activeChatId');
                            return;
                        }

                        try {
                            const response = await chatsController.addUserToChat(searchUserId, activeChatId);
                            console.log('Пользователь добавлен в чат', response);
                            closeModal(e);
                        } catch (err) {
                            console.error('Ошибка при добавлении пользователя в чат', err);
                        }
                    },
                },
            }),
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
                {{{buttonAddUser}}} 
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

