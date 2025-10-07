import Block from '../framework/Block';
import store, { StoreEvents } from '../framework/Store';
import { Indexed } from '../types/types';


export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
    // используем class expression
    return class extends Component {
        constructor(props) {
            super({ ...props, ...mapStateToProps(store.getState()) });

            store.on(StoreEvents.Updated, () => {
                const newProps = mapStateToProps(store.getState());
                Object.keys(newProps).forEach((key) => {
                    this.props[key] = newProps[key]; // Proxy обработает обновление
                });
            });
        }
    };
}

export function mapUserToProps(state) {
    const user = state.user || {};
    return {
        name: user.name,
        avatar: user.avatar,
    };
}
