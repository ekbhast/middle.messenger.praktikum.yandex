import Block from '../../../framework/Block';
import H1 from '../../atoms/headers/h1/h1';

interface LoginFromBlockProps{
    class? : string
}

export default class LoginFromBlock extends Block {
  constructor(props: LoginFromBlockProps) {
    super({ ...props,
      H1: new H1({
            class: 'form-header',
            label: 'Вход',
        })
     });
  }

  protected render(): string {
    return `
        <form class="{{class}}">
            {{{ H1 }}}
            {{LoginFields}}
            {{Button class='button_primary auth__button'id='enter' label='Войти' type='submit'}}
            {{Link href='#' class='auth__link' text='Зарегистрироваться'}}
        </form>
        `;
  }
}
