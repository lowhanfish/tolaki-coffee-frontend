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
    primary: 'bg-amber-500 text-neutral-950 hover:bg-amber-400',
    warning: 'bg-orange-500 text-white hover:bg-orange-400',
    danger: 'bg-rose-600 text-white hover:bg-rose-500',
    success: 'bg-emerald-600 text-white hover:bg-emerald-500',
}

const modelMap: Record<string, string> = {
    rounded: "rounded-full",
    box: "rounded-lg",
}

const Button = ({ color = "primary", size = 'h-9', children, type = "box", htmlType = "button", disabled = false, onClick }: ButtonProps) => {
    return (
        <button
            type={htmlType}
            disabled={disabled}
            className={`
                cursor-pointer disabled:cursor-not-allowed disabled:opacity-60
                border border-transparent shadow-sm transition
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500
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
