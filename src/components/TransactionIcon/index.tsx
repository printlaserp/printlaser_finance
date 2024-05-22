import { useAppData } from '@contexts/initialDataContext';
import { ArrowDown } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { ArrowUp } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import React from 'react';

interface TransactionIconProps {
  type: string
}

const TransactionIcon = ({ type }: TransactionIconProps) => {
  // Função para obter a inicial do nome

  const icon = undefined

  const getBg = () => {
    const initial = type.charAt(0).toUpperCase()
    if (initial === 'I') return 'bg-green-200'
    if (initial === 'E') return 'bg-red-200'
    if (initial === 'T') return 'bg-blue-200'
    return 'text-gray-300'
  }

  const getIcon = () => {
    const initial = type.charAt(0).toUpperCase()
    if (initial === 'I') return <ArrowUp size={20}/>
    if (initial === 'E') return <ArrowDown size={20}/>
    if (initial === 'T') return <ArrowRight size={20}/>
    return 'text-gray-300'
  }

  return (
    <div className="items-center hidden sm:block mr-4">
      {icon ? (
        // Se houver uma foto, exiba-a em um círculo
        <img
          src={icon}
          alt="Foto de perfil"
          className="rounded-full h-8 w-8 object-cover"
        />
      ) : (
        // Se não houver foto, exiba a inicial do nome em um círculo
        <div className={`${getBg()} h-12 w-12 flex items-center justify-center rounded-full`}>
          <span className="text-gray-500">{getIcon()}</span>
        </div>
      )}
      {/* <span className="ml-2">{name}</span> */}
    </div>
  );
};

export default TransactionIcon;
