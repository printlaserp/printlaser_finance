import Progress from '@components/Progress';
import { useAppData } from '@contexts/initialDataContext';
import CheckPermissions from '@middlewares/CheckPermissions';
import { ArrowsLeftRight } from '@phosphor-icons/react/dist/ssr/ArrowsLeftRight';
import { Bank } from '@phosphor-icons/react/dist/ssr/Bank';
import { Calculator } from '@phosphor-icons/react/dist/ssr/Calculator';
import { IdentificationCard } from '@phosphor-icons/react/dist/ssr/IdentificationCard';
import { ListBullets } from '@phosphor-icons/react/dist/ssr/ListBullets';
import { MinusCircle } from '@phosphor-icons/react/dist/ssr/MinusCircle';
import { PlusCircle } from '@phosphor-icons/react/dist/ssr/PlusCircle';
import { SignOut } from '@phosphor-icons/react/dist/ssr/SignOut';
import { UserCircleGear } from '@phosphor-icons/react/dist/ssr/UserCircleGear';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Sidebar = () => {
    const { user } = useAppData()
    const route = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const role = user?.role

    const handleSignOut = () => {
        localStorage.removeItem('nc_token');
        route.reload();
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const isSmallScreen = useMediaQuery('(max-width: 640px)');

    useEffect(() => {
        if (isSmallScreen) {
            setSidebarOpen(false); // Fecha a barra lateral em telas pequenas
        } else {
            setSidebarOpen(true); // Abre a barra lateral em telas maiores
        }
    }, [isSmallScreen]);

    return (
        <>
            <div className="absolute sm:hidden top-4 left-4 text-3xl">
                <button onClick={toggleSidebar} className="text-white p-2 focus:outline-none ">
                    ☰
                </button>
            </div>
            {isSidebarOpen && (
                <>
                    {isSmallScreen && <div
                        onClick={closeSidebar}
                        className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"
                    />}
                    <div className={`bg-gray-800 text-white h-full w-48 z-50 ${isSmallScreen ? 'absolute' : 'block'} top-0 left-0`}>
                        <div className='flex flex-col h-full justify-between py-4 px-2 w-full'>
                            <Link href={'/app'}>
                                <div className="flex justify-center">
                                    <div className="mt-4 w-[80%]">
                                        <img src="logo.png" alt="Logo" />
                                    </div>
                                </div>
                            </Link>
                            <div className="h-full w-full py-16 px-2">
                                {user ? <ul>
                                    <li className="income mb-6 cursor-pointer">
                                        <Link href="/app/income">
                                            <div className='flex items-center '>
                                                <PlusCircle size={22} />
                                                <button className="flex ml-3 text-gray-300 hover:text-white">Nova receita</button>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="mb-6 cursor-pointer">
                                        <Link href="/app/expense">
                                            <div className='flex items-center '>
                                                <MinusCircle size={22} />
                                                <button className="flex ml-3 text-gray-300 hover:text-white">Nova despesa</button>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="mb-6 cursor-pointer">
                                        <Link href="/app/transference">
                                            <div className='flex items-center '>
                                                <ArrowsLeftRight size={22} />
                                                <button className="flex ml-3 text-gray-300 hover:text-white">Transferência</button>
                                            </div>
                                        </Link>
                                    </li>
                                    <CheckPermissions allowedRoles={['ADMIN', 'ROOT']} deniedAccessMsg={false}>
                                        <li className="mb-6 cursor-pointer">
                                            <Link href="/app/transactions">
                                                <div className='flex items-center '>
                                                    <ListBullets size={22} />
                                                    <button className="flex ml-3 text-gray-300 hover:text-white">Transações</button>
                                                </div>
                                            </Link>
                                        </li>
                                    </CheckPermissions>
                                    {(role === 'ADMIN' || role === 'ROOT') && <li className="mb-6 cursor-pointer">
                                        <Link href="/app/accounts">
                                            <div className='flex items-center '>
                                                <Bank size={22} />
                                                <button className="flex ml-3 text-gray-300 hover:text-white">Contas</button>
                                            </div>
                                        </Link>
                                    </li>}
                                    {(role === 'ADMIN' || role === 'ROOT') && <li className="mb-6 cursor-pointer">
                                        <Link href="/app/closing">
                                            <div className='flex items-center '>
                                                <Calculator size={22} />
                                                <button className="flex ml-3 text-gray-300 hover:text-white">Fechamento</button>
                                            </div>
                                        </Link>
                                    </li>}
                                    {(role === 'ADMIN' || role === 'ROOT') && <li className="mb-6 cursor-pointer">
                                        <Link href="/app/admin">
                                            <div className='flex items-center '>
                                                <UserCircleGear size={22} />
                                                <button className="flex ml-3 text-gray-300 hover:text-white">Administração</button>
                                            </div>
                                        </Link>
                                    </li>}
                                    <li className="mb-6 cursor-pointer">
                                        <Link href="/app/credit">
                                            <div className='flex items-center '>
                                                <IdentificationCard size={22} />
                                                <button className="flex ml-3 text-gray-300 hover:text-white">Ficha</button>
                                            </div>
                                        </Link>
                                    </li>
                                </ul> : (
                                    <Progress variant='simple' />
                                )}
                            </div>
                            <button onClick={handleSignOut} className='cursor-pointer'>
                                <div className='flex items-center justify-center gap-4'>
                                    <span>Sair</span>
                                    <SignOut size={24} />
                                </div>
                            </button>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
};

// Função para verificar o tamanho da tela
const useMediaQuery = (query: any) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const updateMatches = () => setMatches(mediaQuery.matches);

        mediaQuery.addListener(updateMatches);
        updateMatches();

        return () => {
            mediaQuery.removeListener(updateMatches);
        };
    }, [query]);

    return matches;
};

export default Sidebar;
