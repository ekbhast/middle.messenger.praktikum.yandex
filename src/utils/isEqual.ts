export type PlainObject<T = unknown> = {
    [k in string]: T;
};

export function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is unknown[] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject | unknown[], rhs: PlainObject | unknown[]): boolean {
    if (Array.isArray(lhs) && Array.isArray(rhs)) {
        if (lhs.length !== rhs.length) return false;
        for (let i = 0; i < lhs.length; i++) {
            const leftItem = lhs[i];
            const rightItem = rhs[i];

            if (isArrayOrObject(leftItem) && isArrayOrObject(rightItem)) {
                if (!isEqual(leftItem, rightItem)) return false;
            } else if (leftItem !== rightItem) {
                return false;
            }
        }
        return true;
    }

    if (isPlainObject(lhs) && isPlainObject(rhs)) {
        if (Object.keys(lhs).length !== Object.keys(rhs).length) return false;
        for (const [key, value] of Object.entries(lhs)) {
            const rightValue = rhs[key];

            if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
                if (!isEqual(value, rightValue)) return false;
            } else if (value !== rightValue) {
                return false;
            }
        }
        return true;
    }

    return false;
}

export default isEqual;
