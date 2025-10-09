import Block from '../framework/Block';
import store, { StoreEvents } from '../framework/Store';
import { Indexed } from '../types/types';


export function connect<P extends Indexed = Indexed>(
    Component: typeof Block,
    mapStateToProps: (state: Indexed) => P,
) {
    return class extends Component {
        constructor(props?: P) {
            super({ ...props, ...mapStateToProps(store.getState()) });

            store.on(StoreEvents.Updated, () => {
                const newProps = mapStateToProps(store.getState());
                Object.keys(newProps).forEach((key) => {
                    this.props[key] = newProps[key];
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
