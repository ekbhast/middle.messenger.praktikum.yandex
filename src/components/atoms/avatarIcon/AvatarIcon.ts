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

function mapSearchUserToPropsAvatar(state: Indexed) {
    return {
        imgSrc: baseUrlResourse + state.searchUser?.avatar,
        class: 'avatarIcon',
        classImg: 'avatarIcon__img',
    };
}

export const ConnecteSearchUserAvatarIcon = connect(AvatarIcon, mapSearchUserToPropsAvatar);
