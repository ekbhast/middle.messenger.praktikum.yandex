import Block from '../../../framework/Block';

interface LoginFieldsProps {
    class?: string<
}

export default class LoginFields extends Block{
    constructor(props: LoginFieldsProps){
        super({...props})
    }

    protected render(){
        return `
            <div class="form-inputs">
                <div class="form-inputGroup">
                    {{> Label class='label' label='Логин' for='login__login'}}
                    {{> Input class='input' placeholder='Логин' id='login__login'type='text' name='login'}}
                </div>
                <div class="form-inputGroup">
                    {{> Label class='label' label='Пароль'  for='login__password'}}
                    {{> Input class='input' placeholder='Пароль' id='login__password' type='password' name='password'}}
                </div>
            </div>
        `
    }
}