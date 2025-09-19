import { validateField, validationRules, FieldName } from '../utils/validation';

export default function createFormEvents() {
    return {
        focusout: (e: Event) => {
            const input = e.target as HTMLInputElement;
            if (input && input.name in validationRules) {
                const { isError, errorMessage } = validateField(input.name as FieldName, input.value);

                if (isError) {
                    input.classList.add('errorBottom');
                } else {
                    input.classList.remove('errorBottom');
                }

                const errorElem = document.querySelector(`.input-error[data-error-for="${input.name}"]`) as HTMLElement;
                if (errorElem) {
                    if (isError) {
                        errorElem.textContent = errorMessage;
                        errorElem.style.display = 'block';
                    } else {
                        errorElem.textContent = '';
                        errorElem.style.display = 'none';
                    }
                }
            }
        },

        submit: (e: Event) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const inputs = form.querySelectorAll<HTMLInputElement>('input');
            const formData: Record<string, string> = {};

            inputs.forEach((input) => {
                const { isError, errorMessage } = validateField(input.name as FieldName, input.value);

                if (isError) {
                    input.classList.add('errorBottom');
                } else {
                    input.classList.remove('errorBottom');
                    formData[input.name] = input.value;
                }

                const errorElem = document.querySelector(`.input-error[data-error-for="${input.name}"]`) as HTMLElement;
                if (errorElem) {
                    if (isError) {
                        errorElem.textContent = errorMessage;
                        errorElem.style.display = 'block';
                    } else {
                        errorElem.textContent = '';
                        errorElem.style.display = 'none';
                    }
                }
            });

            console.log(formData);
        },
    };
}
