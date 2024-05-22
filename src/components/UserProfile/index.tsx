import { ShortUserDTO } from '@dtos/UserDTO';
import { User } from "@phosphor-icons/react/dist/ssr/User"
import React from 'react';

interface UserProfileProps {
  user: ShortUserDTO | null
}

const UserProfile = ({ user }: UserProfileProps) => {
  const role = user?.role
  return (
    <div className="flex items-center w-full mr-3">
      {user?.avatar_src ? (
        // Se houver uma foto, exiba-a em um círculo
        <img
          src={user?.avatar_src}
          alt="Foto de perfil"
          className="rounded-full h-8 w-8 object-cover"
        />
      ) : (
        // Se não houver foto, exiba a inicial do nome em um círculo
        <div className='flex  justify-between items-center w-full gap-1'>
          <span className="hidden md:block text-center font-semibold text-white">{user?.first_name}{` `}{user?.last_name}</span>
          <div className="bg-gray-300 h-12 w-12 flex items-center justify-center rounded-full">
            {user && <span className="text-gray-600 text-lg font-semibold">{user.first_name.charAt(0).toUpperCase()}</span>}
            {!user && <span className="text-gray-600 text-xs font-semibold"><User size={32} /></span>}
          </div>
          {/* <span className="ml-2 text-center">{user?.first_name}{` `}{user?.last_name}<br />{`(${strRole})`}</span> */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
