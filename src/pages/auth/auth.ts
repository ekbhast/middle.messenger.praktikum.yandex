import Block from "../../framework/Block";

interface AuthProps{
    class?: string;
}

export default class Auth extends Block {
    constructor(props: AuthProps){
        super(props);
    }
    protected render(): string{
        return `
            <main class="{{class}}">
                <h1>Все получилось</h1> 
            </main>
        `
    }    
}