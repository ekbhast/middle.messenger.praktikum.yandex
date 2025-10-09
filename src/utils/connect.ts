import Block from '../framework/Block';
import store, { StoreEvents } from '../framework/Store';
import { Indexed } from '../types/types';
import isEqual from './isEqual';


export function connect<P extends Indexed = Indexed>(
    Component: typeof Block,
    mapStateToProps: (state: Indexed) => P,
) {
    return class extends Component {
        constructor(props?: P) {
            super({ ...props, ...mapStateToProps(store.getState()) });
            let state = mapStateToProps(store.getState());
            store.on(StoreEvents.Updated, () => {
                // при обновлении получаем новое состояние
                const newState = mapStateToProps(store.getState());
                if (!isEqual(state, newState)) {
                    this.setProps({ ...newState });
                }

                // не забываем сохранить новое состояние
                state = newState;
            });
        }
    };
}
