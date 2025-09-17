import Block from '../../../framework/Block';
import { LabelProps } from '../../../types/types';

export default class Label extends Block {
    constructor (props: LabelProps){
        super({...props})        
    }

    protected render(): string{
        return`
            <label class="{{class}}" for="{{for}}">{{label}}</label>        
        `
    }
}
