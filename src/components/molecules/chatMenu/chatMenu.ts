import Block from '../../../framework/Block';
import { ChatMenuProps } from '../../../types/types';
import Button from '../../atoms/button/button';
import { chatsController } from '../../../controllers/ChatsController';
import Input from '../../atoms/input/input';
import store from '../../../framework/Store';
import { closeModal } from '../../../utils/closeModalAll';

export default class ChatMenu extends Block {
    constructor(props?: ChatMenuProps) {
        super({
            ...props,
            buttonChangeAvatar: new Button({
                class: 'button__primary',
                label: 'Изменить аватар',
                id: 'uploadBtn',
                events: {
                    click: () => {
                        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
                        if (fileInput) {
                            fileInput.click();
                        }
                    },
                },
            }),
            buttonAddUser: new Button({
                class: 'button__primary',
                label: 'Добавить пользователя в чат',
                events: {
                    click: () => {
                        const searchDilog = document.querySelector('.searchUserId');
                        searchDilog?.classList.toggle('disable');
                    },
                },
            }),
            buttonDeleteUserChat: new Button({
                class: 'button__primary',
                label: 'Удалить пользователя из чата',
                events: {
                    click: async (e: Event) => {
                        e.stopPropagation();
                        try {
                            const activeChatId = store.getState().activeChatId;
                            if (!activeChatId) {
                                console.error('Активный чат не выбран');
                                return;
                            }

                            try {
                                const users = await chatsController.getUserChat(activeChatId);
                                store.set('activeChatUsers', users);
                                const searchUsersChats = document.querySelector('.searchUsersChats');
                                searchUsersChats?.classList.toggle('disable');
                                console.log('Пользователи чата:', users);
                            } catch (err) {
                                console.log('Пользователи чата не загрузились', err);
                            }


                            // При желании можно сохранить в store

                            console.log(store.getState());
                        } catch (err) {
                            console.error('Ошибка при получении пользователей чата', err);
                        }
                    },
                },
            }),
            buttonDeleteChat: new Button({
                class: 'button__primary',
                label: 'Удалить чат',
                events: {
                    click: async (e: Event)=>{
                        const activeChatId = store.getState().activeChatId;
                        try {
                            const deleteChat = await chatsController.deleteChat({ chatId: activeChatId });
                            console.log('Чат удален', deleteChat);
                            closeModal(e);
                        } catch (err) {
                            console.log('Не удалось удалить чат', err);
                        }
                    } },
            }),
            inputAvatar: new Input({
                class: 'disable',
                type: 'file',
                id: 'fileInput',
                events: {
                    change: async (e: Event) => {
                        const target = e.target as HTMLInputElement;
                        if (target.files && target.files[0]) {
                            const file = target.files[0];
                            const formData = new FormData();
                            formData.append('chatId', store.getState().activeChatId?.toString() || '');
                            formData.append('avatar', file);
                            console.log(formData);

                            try {
                                await chatsController.changeAvatar(formData);
                                console.log('Аватар обновлён');
                                closeModal(e);
                            } catch (err) {
                                console.error('Ошибка при обновлении аватара', err);
                            }
                        }
                    },
                },
            }),
        });
    }
    protected render(): string {
        return `
        <div>
            <div class="chatMenu__overlay disable"></div>
            <div class="{{class}}">
            <span>Меню чата</span>
            <div>
                {{{inputAvatar}}}
                {{{buttonChangeAvatar}}}
            </div>
            <div>
            {{{buttonAddUser}}}
            </div>
            <div>
            {{{buttonDeleteUserChat}}}
            </div>
            <div>
            {{{buttonDeleteChat}}}
            </div>
                
            </div>
        </div>
        
        `;
    }
}
