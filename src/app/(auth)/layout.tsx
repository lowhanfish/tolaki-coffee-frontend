import { ReactNode } from 'react'
import { Providers } from '@/providers/GoogleLoginPage';

interface LayOutProps {
    children: ReactNode
}

const layout = ({ children }: LayOutProps) => {
    return (
        <Providers>
            <div>
                {children}
            </div>
        </Providers>
    )
}

export default layout
