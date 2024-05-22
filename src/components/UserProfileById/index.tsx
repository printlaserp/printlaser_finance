import { useAppData } from '@contexts/initialDataContext';
import React from 'react';

interface UserProfileProps {
  userId: string
}

const UserProfileById = ({ userId }: UserProfileProps) => {
  // Função para obter a inicial do nome

  const { users } = useAppData()
  const user = users?.find(it => it.id === userId)
  const photoUrl = user?.avatar_src
  const name = user?.first_name || '?'

  const getInitials = (name: string) => name.charAt(0).toUpperCase()

  return (
    <div className="flex items-center mr-2">
      {photoUrl ? (
        // Se houver uma foto, exiba-a em um círculo
        <img
          src={photoUrl}
          alt="Foto de perfil"
          className="rounded-full h-8 w-8 object-cover"
        />
      ) : (
        // Se não houver foto, exiba a inicial do nome em um círculo
        <div className="bg-gray-300 h-6 w-6 flex items-center justify-center rounded-full">
          <span className="text-gray-600 text-xs font-semibold">{getInitials(name)}</span>
        </div>
      )}
      {/* <span className="ml-2">{name}</span> */}
    </div>
  );
};

export default UserProfileById;
