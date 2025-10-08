import { validateField, FieldName } from '../utils/validation';

export function validateForm(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const inputs = form.querySelectorAll<HTMLInputElement>('input');
    const formData: Record<string, string> = {};
    let error: boolean = false;

    inputs.forEach((input) => {
        const { isError, errorMessage } = validateField(input.name as FieldName, input.value);

        if (isError) {
            input.classList.add('errorBottom');
            error = isError;
            return ({ error, formData });
        } else {
            input.classList.remove('errorBottom');
            if (input.name !== 'password_confirm') {
                formData[input.name] = input.value;
            }
        }

        const errorElem = document.querySelector(`.input-error[data-error-for="${input.name}"]`) as HTMLElement | null;
        if (errorElem) {
            errorElem.textContent = isError ? (errorMessage ?? '') : '';
            errorElem.style.display = isError ? 'block' : 'none';
        }
    });
    if (error) {
        console.log('ошибка валидации формы');
    }
    return ({ error, formData });
}
