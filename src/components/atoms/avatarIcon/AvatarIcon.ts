import Block from '../../../framework/Block';

interface AvatarIconProps {
  class?: string;
  imgSrc?: string;
  attr?: Record<string, string>;
}

export default class AvatarIcon extends Block {
  constructor(props: AvatarIconProps) {
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
