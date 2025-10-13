import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import SearchFrom from '../searchForm/searchForm';
import { userController } from '../../../controllers/UserController';
import store from '../../../framework/Store';
import { ConnectedSearchDialog } from '../searchDilog/searchDilog';
import { closeModal } from '../../../utils/closeModalAll';


export default class SearchUserId extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            SearchFrom: new SearchFrom({
                class: 'chats__search',
                events: {
                    submit: async (e: Event) => {
                        e.preventDefault();
                        const inputEl = document.getElementById('search-input') as HTMLInputElement;
                        const login = inputEl?.value.trim();
                        if (!login) return;

                        try {
                            const user = await userController.getUserById(Number(login));
                            console.log('Пользователь найден:', user);
                            store.set('searchIdValue', '');
                            document.querySelector('.searchDilog')?.classList.remove('disable');
                        } catch (err) {
                            console.error('Ошибка поиска пользователя', err);
                        }
                    },
                },
            }),
            SearchDilog: new ConnectedSearchDialog({ class: 'searchDilog disable' }),
        });
    }
    protected render(): string {
        return `
                <div class="{{class}}">
                    {{{SearchFrom}}} 
                    {{{SearchDilog}}}   
                </div>                        
        `;
    }
}
