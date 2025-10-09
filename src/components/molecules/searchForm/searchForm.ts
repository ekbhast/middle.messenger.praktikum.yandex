import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import Input from '../../atoms/input/input';
export default class SearchFrom extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            SearchInput: new Input({
                class: 'chats__searchInput',
                placeholder: 'Поиск',
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
