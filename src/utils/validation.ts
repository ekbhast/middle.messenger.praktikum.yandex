export const validationRules = {
    first_name: {
        regex: /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/,
        errorMessage: 'С заглавной буквы, только буквы и дефис',
    },
    second_name: {
        regex: /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/,
        errorMessage: 'С заглавной буквы, только буквы и дефис',
    },
    login: {
        regex: /^(?!\d+$)[A-Za-z0-9_-]{3,20}$/,
        errorMessage: 'От 3 до 20 символов, буквы, цифры, дефис или подчёркивание',
    },
    email: {
        regex: /^[A-Za-z0-9._-]+@[A-Za-z]+\.[A-Za-z]+$/,
        errorMessage: 'email должен быть формата email@eamil.com',
    },
    password: {
        regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
        errorMessage: 'От 8 до 40 символов, заглавная буква и цифра',
    },
    password_confirm: {
        regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
        errorMessage: 'От 8 до 40 символов, заглавная буква и цифра',
    },
    oldPassword: {
        regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
        errorMessage: 'От 8 до 40 символов, заглавная буква и цифра',
    },
    newPassword: {
        regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
        errorMessage: 'От 8 до 40 символов, заглавная буква и цифра',
    },
    phone: {
        regex: /^\+?\d{10,15}$/,
        errorMessage: 'От 10 до 15 цифр, может начинаться с +',
    },
    message: {
        regex: /.+/,
        errorMessage: 'Сообщение не может быть пустым',
    },
    display_name: {
        regex: /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/,
        errorMessage: 'С заглавной буквы, только буквы и дефис',
    },
    avatar: {
        regex: /.+/,
        errorMessage: '',
    },
} as const;

export type FieldName = keyof typeof validationRules;

export function validateField(
    fieldName: FieldName,
    value: string,
): { isError: boolean; errorMessage?: string } {
    if (fieldName === 'avatar') {
        return { isError: false };
    }

    const rule = validationRules[fieldName];
    const isValid = rule.regex.test(value);

    return {
        isError: !isValid,
        errorMessage: isValid ? undefined : rule.errorMessage,
    };
}
