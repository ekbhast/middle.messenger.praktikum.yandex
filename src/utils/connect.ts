import Block from '../framework/Block';
import store, { StoreEvents } from '../framework/Store';
import { BlockProps } from '../types/types';
import isEqual from './isEqual';

type BlockClass<P extends BlockProps = BlockProps> = new (props?: P) => Block<P>;

export function connect<P extends BlockProps = BlockProps>(
    Component: BlockClass<P>,
    mapStateToProps: (state: unknown) => P,
) {
    return class extends Component {
        constructor(props?: P) {
            super({ ...props, ...mapStateToProps(store.getState()) });
            let state = mapStateToProps(store.getState());
            store.on(StoreEvents.Updated, () => {
                const newState = mapStateToProps(store.getState());
                if (!isEqual(state, newState)) {
                    this.setProps({ ...newState });
                }
                state = newState;
            });
        }
    };
}
