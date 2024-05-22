// components/Layout.js

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppData } from '@contexts/initialDataContext'
import Sidebar from '@components/Sidebar'
import UserProfile from '@components/UserProfile'

const Layout = ({ children }: any) => {
    const [isLoggedIn, setLoggedIn] = useState(false)
    const { user } = useAppData()
    const router = useRouter()

    useEffect(() => {

        const userIsLoggedIn = user ? true : false
        setLoggedIn(userIsLoggedIn)

    }, [router])

    return (
        <div className='layout-container min-h-screen w-full flex'>
            {isLoggedIn && (
                <div className="sidebar min-h-screen">
                    <div className='absolute right-4 top-4 z-50'>
                        <UserProfile user={user} />
                    </div>
                    <Sidebar />
                </div>
            )}
            <div className="main-content flex-grow">
                {children}
            </div>
        </div>
    )
}

export default Layout
