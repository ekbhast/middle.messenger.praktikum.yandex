// Определяем объект с индексной сигнатурой
export type PlainObject<T = unknown> = {
    [k in string]: T;
};

// Проверяем, что значение — чистый объект
export function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]';
}

// Проверяем, что значение — массив
export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

// Проверяем, что значение — массив или объект
export function isArrayOrObject(value: unknown): value is unknown[] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

// Рекурсивное сравнение объектов и массивов
export function isEqual(lhs: PlainObject | unknown[], rhs: PlainObject | unknown[]): boolean {
    // Сравнение массивов
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

    // Сравнение объектов
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

    // lhs и rhs разных типов (объект vs массив)
    return false;
}

export default isEqual;
