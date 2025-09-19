export const validationRules = {
    first_name: { regex: /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/ },
    second_name: { regex: /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/ },
    login: { regex: /^(?!\d+$)[A-Za-z0-9_-]{3,20}$/ },
    email: { regex: /^[A-Za-z0-9._-]+@[A-Za-z]+\.[A-Za-z]+$/ },
    password: { regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/ },
    password_confirm: { regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/ },
    oldPassword: { regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/ },
    newPassword: { regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/ },
    phone: { regex: /^\+?\d{10,15}$/ },
    message: { regex: /.+/ },
    display_name: { regex: /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/ },
} as const;

export type FieldName = keyof typeof validationRules;

export function validateField(fieldName: FieldName, value: string): boolean | null {
    const rule = validationRules[fieldName];
    return rule.regex.test(value) ? null : true;
}
