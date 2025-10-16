import { validateField, validationRules, FieldName } from '../utils/validation';

export function validateInput(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input || !(input.name in validationRules)) return;

    const { isError, errorMessage } = validateField(input.name as FieldName, input.value);

    if (isError) {
        input.classList.add('errorBottom');
    } else {
        input.classList.remove('errorBottom');
    }

    const errorElem = document.querySelector(`.input-error[data-error-for="${input.name}"]`) as HTMLElement | null;
    if (errorElem) {
        errorElem.textContent = isError ? (errorMessage ?? '') : '';
        errorElem.style.display = isError ? 'block' : 'none';
    }
}
