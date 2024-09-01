import { InputHTMLAttributes } from "react"

interface Iprops extends InputHTMLAttributes<HTMLInputElement> { }

const Input = ({ ...rest }: Iprops) => {
    return (
        <div className="flex flex-col">
        <input
            type="text"
            name=""
            id=""
            className="px-4 py-2 mb-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...rest}
        />
    </div>
    
    )
}

export default Input
