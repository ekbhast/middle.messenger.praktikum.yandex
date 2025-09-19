import { validateField, validationRules, FieldName } from '../utils/validation';

export default function createFormEvents() {
    return {
        focusout: (e: Event) => {
            const input = e.target as HTMLInputElement;
            if (input && input.name in validationRules) {
                const isError = validateField(input.name as FieldName, input.value);
                if (isError) {
                    input.classList.add('errorBottom');
                } else {
                    input.classList.remove('errorBottom');
                }
            }
        },

        submit: (e: Event) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const inputs = form.querySelectorAll<HTMLInputElement>('input');
            const formData: Record<string, string> = {};

            inputs.forEach((input) => {
                const isError = validateField(input.name as FieldName, input.value);
                if (isError) {
                    input.classList.add('errorBottom');
                } else {
                    input.classList.remove('errorBottom');
                    formData[input.name] = input.value;
                }
            });

            console.log(formData);
        },
    };
}

