import Block from '../../../framework/Block';
import { SearchFormProps } from '../../../types/types';
import { ConnectedSearchIdValue } from '../../atoms/input/input';
export default class SearchFrom extends Block {
    constructor(props: SearchFormProps) {
        super({ ...props,
            SearchInput: new ConnectedSearchIdValue({
                class: 'chats__searchInput',
                placeholder: 'Поиск пользователя по ID',
                id: 'search-input',
                type: 'text',
                name: 'search-input',
            }),
        });
    }

    protected render(): string {
        return `
       <form class="{{class}}">
            <img src="/src/assets/search_icon.svg" alt="icon" class="chats__search--icon" />
            {{{SearchInput}}}
        </form>
        `;
    }
}
