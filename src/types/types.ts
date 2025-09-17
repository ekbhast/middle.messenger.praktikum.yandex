type DefaultClass = {
    class?: string;
}

export type LoginFieldsProps = DefaultClass;
export type AuthProps = DefaultClass;
export type AuthTemplateProps = DefaultClass;
export interface LabelProps extends DefaultClass {
    for?: string,
    label?: string,
}

export interface InputProps extends DefaultClass {
    placeholder?: string,
    id?: string,
    type?: string,
    name?: string,
}

export interface ButtonProps extends DefaultClass{
    id?: string,
    dataPage?: string,
    label?: string,
    type?: string,
}

export interface LinkProps extends DefaultClass{
    href: string,
    text: string,
}
