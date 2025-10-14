import Block from '../../../framework/Block';
import { AvatarIconProps, BlockProps } from '../../../types/types';
import { connect } from '../../../utils/connect';
import { Indexed } from '../../../types/types';
import { baseUrlResourse } from '../../../api/baseUrls';

type Avatar2Props = AvatarIconProps & BlockProps;
export default class AvatarIcon extends Block<AvatarIconProps> {
    constructor(props?: Avatar2Props) {
        super(props);
    }

    protected render(): string {
        return `
        <div class="{{class}}">
            <img src="{{imgSrc}}" class="avatarIcon__img" />
        </div>
        `;
    }
}

function mapSearchUserToPropsAvatar(state: unknown): {
    imgSrc: string;
    class: string;
    classImg: string;
} {
    const s = state as Indexed;

    return {
        imgSrc: s.activeChatInfo?.avatar ? baseUrlResourse + s.activeChatInfo?.avatar : 'assets/default-avatar.jpg',
        class: 'avatarIcon',
        classImg: 'avatarIcon__img',
    };
}

function mapActiveChatToPropsAvatar(state: unknown): {
    imgSrc: string;
    class: string;
    classImg: string;
} {
    const s = state as Indexed;

    return {
        imgSrc: s.activeChatInfo?.avatar ? baseUrlResourse + s.activeChatInfo?.avatar : 'assets/default-avatar.jpg',
        class: 'chats__messages--avatarIcon',
        classImg: 'avatarIcon__img',
    };
}
function mapUserChatsToProps(state: unknown): {
    imgSrc: string;
    class: string;
    classImg: string;
} {
    const s = state as Indexed;

    return {
        imgSrc: s.activeChatInfo?.avatar ? baseUrlResourse + s.activeChatInfo?.avatar : 'assets/default-avatar.jpg',
        class: 'chats__messages--avatarIcon',
        classImg: 'avatarIcon__img',
    };
}

export const ConnecteSearchUserAvatarIcon = connect(AvatarIcon, mapSearchUserToPropsAvatar);
export const ConnecteActiveChatAvatarIcon = connect(AvatarIcon, mapActiveChatToPropsAvatar);
export const ConnecteUserChatsToProps = connect(AvatarIcon, mapUserChatsToProps);
