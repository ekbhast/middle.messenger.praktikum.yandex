import store from '../framework/Store';
import { ChatProps } from '../types/types';

export default function handleChatSelect(chatId: number) {
    store.set('activeChatId', chatId);
    const activChatInfo = { ...store.getState().chats?.find((chat: ChatProps) => chat.id === chatId) };
    store.set('activeChatInfo', activChatInfo);
    const messageBlock = document.querySelector('.chats__messages') as HTMLInputElement;
    if (messageBlock) {
        messageBlock.classList.remove('disable');
    }

    console.log('Чат выбран:', chatId);
    console.log(store.getState());
}
