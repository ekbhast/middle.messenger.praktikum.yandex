import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import Span from '../../atoms/span/spat';

export default class UserSettingsRows extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            // labels
            SpanLabelMail: new Span({
                class: 'userSettings__label',
                text: 'Почта',
            }),
            SpanLabelLogin: new Span({
                class: 'userSettings__label',
                text: 'Логин',
            }),
            SpanLabelName: new Span({
                class: 'userSettings__label',
                text: 'Имя',
            }),
            SpanLabelSecondName: new Span({
                class: 'userSettings__label',
                text: 'Фамилия',
            }),
            SpanLabelDisplayName: new Span({
                class: 'userSettings__label',
                text: 'Имя в чате',
            }),
            SpanLabelPhone: new Span({
                class: 'userSettings__label',
                text: 'Телефон',
            }),
            // data
            SpanDataMail: new Span({
                class: 'userSettings__data',
                text: 'pochta@yandex.ru',
            }),
            SpanDataLogin: new Span({
                class: 'userSettings__data',
                text: 'ivanivanov',
            }),
            SpanDataName: new Span({
                class: 'userSettings__data',
                text: 'Иван',
            }),
            SpanDataSecondName: new Span({
                class: 'userSettings__data',
                text: 'Иванов',
            }),
            SpanDataDisplayName: new Span({
                class: 'userSettings__data',
                text: 'Иван',
            }),
            SpanDataPhone: new Span({
                class: 'userSettings__data',
                text: '+7 (909) 967 30 30',
            }),
        });
    }

    protected render(): string {
        return `
        <div class="userSettings__rows">
            <div class="userSettings__row userSettings__row--bottom">
                <div>{{{SpanLabelMail}}}</div>
                <div>{{{SpanDataMail}}}</div>    
            </div>
            <div class="userSettings__row userSettings__row--bottom">
                <div>{{{SpanLabelLogin}}}</div>
                <div>{{{SpanDataLogin}}}</div>    
            </div>
            <div class="userSettings__row userSettings__row--bottom">
                <div>{{{SpanLabelName}}}</div>
                <div>{{{SpanDataName}}}</div>    
            </div>
            <div class="userSettings__row userSettings__row--bottom">
                <div>{{{SpanLabelSecondName}}}</div>
                <div>{{{SpanDataSecondName}}}</div>    
            </div>
            <div class="userSettings__row userSettings__row--bottom">
                <div>{{{SpanLabelDisplayName}}}</div>
                <div>{{{SpanDataDisplayName}}}</div>    
            </div>
            <div class="userSettings__row">
                <div>{{{SpanLabelPhone}}}</div>
                <div>{{{SpanDataPhone}}}</div>    
            </div>
        </div>
        `;
    }
}
