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
}
