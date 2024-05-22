// middlewares/checkPermissions.tsx
import React from 'react';
import { useAppData } from '@contexts/initialDataContext';
import { LockKey } from '@phosphor-icons/react/dist/ssr/LockKey';

interface CheckPermissionsProps {
    allowedRoles: string[];
    children: any
    deniedAccessMsg?: boolean
}

const CheckPermissions: React.FC<CheckPermissionsProps> = ({ allowedRoles, children, deniedAccessMsg = true }) => {
    const { user } = useAppData();
    if (!user) return <></>

    if (!allowedRoles.includes(user.role)) {
        return deniedAccessMsg ? (<div className='h-full w-full flex flex-col justify-center items-center text-white text-xl'>
            <LockKey size={32} />
            <p>Acesso negado</p>
        </div>) : <></>
    }
    return <>{children}</>;
};

export default CheckPermissions;
