import { ReactNode } from 'react'

interface ButtonProps {
    color?: string,
    size?: string,
    children: ReactNode,
    type?: string,
    htmlType?: "button" | "submit" | "reset",
    disabled?: boolean,
    onClick?: () => void
}

const colorMap: Record<string, string> = {
    primary: 'bg-linear-to-l from-amber-300 to-amber-500',
    warning: 'bg-linear-to-l from-orange-300 to-orange-800',
    danger: 'bg-linear-to-l from-red-300 to-red-800',
    success: 'bg-linear-to-l from-lime-300 to-lime-500',
}

const modelMap: Record<string, string> = {
    rounded: "rounded-full",
    box: "rounded-sm ",
}

const Button = ({ color = "primary", size = 'h-9', children, type = "box", htmlType = "button", disabled = false, onClick }: ButtonProps) => {
    return (
        <button
            type={htmlType}
            disabled={disabled}
            className={`
                cursor-pointer disabled:cursor-not-allowed disabled:opacity-60
                border-2 border-white shadow-sm
                ${color && colorMap[color]} ${size && size} ${type && modelMap[type]}
                flex gap-2 justify-center items-center px-3 w-full
            `}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
