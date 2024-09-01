import { ReactNode } from "react"

interface Iprops {
    children: ReactNode;
    className?: string
    onClick?: () => void;
}

const Button = ({ children, className, ...rest }: Iprops) => {
    return (
        <button className={`${className}  p-3 m-2 rounded-md text-white font-bold`} {...rest}>
            {children}
        </button>
    )
}

export default Button
