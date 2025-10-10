import Block from '../../../framework/Block';
import { DefaultClassProps, BlockProps } from '../../../types/types';
import Span from '../../atoms/span/spat';
import { connect } from '../../../utils/connect';
import { Indexed } from '../../../types/types';
type UserSettingsRows2Props = DefaultClassProps & BlockProps;

class UserSettingsRows extends Block {
    constructor(props?: UserSettingsRows2Props) {
        super({
            ...props,
            SpanLabelMail: new Span({ class: 'userSettings__label', text: 'Почта' }),
            SpanLabelLogin: new Span({ class: 'userSettings__label', text: 'Логин' }),
            SpanLabelName: new Span({ class: 'userSettings__label', text: 'Имя' }),
            SpanLabelSecondName: new Span({ class: 'userSettings__label', text: 'Фамилия' }),
            SpanLabelDisplayName: new Span({ class: 'userSettings__label', text: 'Имя в чате' }),
            SpanLabelPhone: new Span({ class: 'userSettings__label', text: 'Телефон' }),
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

// Функция для получения данных пользователя из стора
function mapUserToProps(state: unknown) {
    const s = state as Indexed;
    const user = s.user || {};

    return {
        class: 'userSettings__rows',
        SpanDataMail: new Span({ class: 'userSettings__data', text: user.email || '' }),
        SpanDataLogin: new Span({ class: 'userSettings__data', text: user.login || '' }),
        SpanDataName: new Span({ class: 'userSettings__data', text: user.first_name || '' }),
        SpanDataSecondName: new Span({ class: 'userSettings__data', text: user.second_name || '' }),
        SpanDataDisplayName: new Span({ class: 'userSettings__data', text: user.display_name || '' }),
        SpanDataPhone: new Span({ class: 'userSettings__data', text: user.phone || '' }),
    };
}


// Подключаем компонент к стору через HOC
export const ConnectedUserSettingsRows = connect(UserSettingsRows, mapUserToProps);
