type DefaultClass = {
    class?: string;
}

export interface LoginFieldsProps extends DefaultClass{}
export interface AuthProps extends DefaultClass{}
export interface AuthTemplateProps extends DefaultClass{
}

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
