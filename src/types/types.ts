export type DefaultClassProps = {
    class?: string;
}
export interface LabelProps extends DefaultClassProps {
    for?: string,
    label?: string,
}

export interface InputProps extends DefaultClassProps {
    placeholder?: string,
    id?: string,
    type?: string,
    name?: string,
}

export interface ButtonProps extends DefaultClassProps{
    id?: string,
    dataPage?: string,
    label?: string,
    type?: string,
}

export interface LinkProps extends DefaultClassProps{
    href: string,
    text: string,
    id?: string,
}

export interface HeaderProps{
    class?: string,
    label?: string
}
export interface AvatarIconProps extends DefaultClassProps {
  imgSrc?: string;
  classImg?: string;
}

export interface AvatarButtonProps extends DefaultClassProps {
  imgSrcAvatar?: string;
  imgSrcAvatarChange?: string;
  buttonType?: string;
  classImgAvatar?: string;
  classImgAvatarChange?: string;
  alt: string;
}

export interface SpanProps extends DefaultClassProps{
    text: string;
}

export interface IconButtonProps extends DefaultClassProps {
    imgSrc: string,
    alt?: string,
    imgClass: string,
}

export interface MessageProps extends DefaultClassProps{
    text: string,
    time: string,
    classText: string,
    classTime: string,
    classMessage: string,
}
