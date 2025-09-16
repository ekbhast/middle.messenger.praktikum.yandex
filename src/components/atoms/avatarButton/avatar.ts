import Block from '../../../framework/Block';

interface AvatarProps {
    classButton: string,
    type: string,
    srcImg: string,
    altImg: string,
    classImg: string,
}

export default class Avatar extends Block {
    constructor(props: AvatarProps) {
        super(props);
    }

    protected render(): string {
        return `
        <button class="avatarButton" type="file">
            <img src="/src/assets/change_avatar.jpg" alt="User avatar" class="avatarButton__img avatarButton__img--change"/>
            <img src="/src/assets/1648314277_5-kartinkof-club-p-yao-min-mem-5.jpg" alt="User avatar" class="avatarButton__img"/>
        </button>
        `;
    }
}
