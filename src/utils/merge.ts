import { Indexed } from '../types/types';

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
            continue;
        }

        try {
            if (typeof rhs[p] === 'object' && rhs[p] !== null && !Array.isArray(rhs[p])) {
                lhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export default merge;
