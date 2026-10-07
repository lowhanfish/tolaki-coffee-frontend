import { ReactNode } from 'react'

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

interface childrenProps {
    children: ReactNode
}

const layout = ({ children }: childrenProps) => {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div>
                {children}
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default layout
