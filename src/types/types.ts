import Block from '../framework/Block';

export interface BlockProps {
  events?: Record<string, (event: Event) => void>;
  attr?: Record<string, string>;
  [key: string]: unknown;
}

export type DefaultClassProps = {
    class?: string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
     [key: string]: any | undefined;
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
    suggested?: string,
    value?: string,
}

export interface ButtonProps extends DefaultClassProps{
    id?: string,
    dataPage?: string,
    label?: string,
    type?: string,
    events?: {
        [key: string]: (e: Event) => void;
    },
}

export interface LinkProps extends DefaultClassProps{
    href: string,
    text: string,
    id?: string,
    events?: {
        [key: string]: (e: Event) => void;
    };
}

export interface HeaderProps{
    class?: string,
    label?: string
}
export interface AvatarIconProps extends DefaultClassProps, BlockProps{
  imgSrc?: string;
  classImg?: string;
}
export interface SearchFormProps extends DefaultClassProps{
    events?: {
    [key: string]: (e: Event) => void;
    };
}

export interface AvatarButtonProps extends DefaultClassProps {
  imgSrcAvatar?: string;
  imgSrcAvatarChange?: string;
  buttonType?: string;
  classImgAvatar?: string;
  classImgAvatarChange?: string;
  alt: string;
  events?: {
        [key: string]: (e: Event) => void;
    };
}

export interface SpanProps extends DefaultClassProps{
    text?: string;
}

export interface IconButtonProps extends DefaultClassProps {
    imgSrc: string,
    alt?: string,
    imgClass: string,
    events?: {
        [key: string]: (e: Event) => void;
    };
}

export interface MessageProps extends DefaultClassProps{
    text: string,
    time: string,
    classText: string,
    classTime: string,
    classMessage: string,
}

export type BlockConstructor = new (props: { rootQuery: HTMLElement; class: string }) => Block;
// как сделать по другому я не понял
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Indexed<T = any> = {
  [key in string]: T;
};

export type ChatProps = {
  id: number;
  title: string;
  avatar?: string;
  last_message?: string;
  unread_count?: number;
};

export type DialogProps = DefaultClassProps & {
    chatData: {
        avatar?: string;
        title?: string;
        lastMessage?: string;
        unreadCount?: number;
        id?: number;
    };
};
export type ChatMenuProps = DefaultClassProps;
export interface ChatUsersListProps extends DefaultClassProps{
     events?: {
        [key: string]: (e: Event) => void;
    };
}
