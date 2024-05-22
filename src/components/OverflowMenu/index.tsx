import { DotsThreeVertical } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import { PencilSimple } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Trash } from '@phosphor-icons/react/dist/ssr/Trash';
import React, { useState, useRef, useEffect } from 'react';

type OverflowMenuProps = {
  id: string,
  handleDelete: (id: string, type: 'INCOME' | 'EXPENSE' | 'TRANSFERENCE') => void
  type: 'INCOME' | 'EXPENSE' | 'TRANSFERENCE'
  // handleEdit: (id: string) => void
}


function OverflowMenu({ id, type, handleDelete }: OverflowMenuProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


  const handleEdit = () => {
    toggleMenu()
  };
  const _handleDelete = () => {
    toggleMenu()
    handleDelete(id, type)
  };

  // Adiciona um event listener para fechar o menu quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: any) {
      //@ts-ignore
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    }

    if (menuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuVisible]);

  return (
    <div className="relative" ref={menuRef}>
      <button className="p-2 rounded-full hover:bg-gray-300" onClick={toggleMenu}>
        <DotsThreeVertical size={20} />
      </button>

      {menuVisible && (
        <div className="absolute right-0 mt-2 py-2 w-32 bg-white border rounded-lg shadow-lg z-10">
          <div className='flex justify-between items-center px-2'>
            <label htmlFor="edit"></label>
            <label htmlFor="edit"><PencilSimple size={20} className="text-gray-600 opacity-50" /></label>
            <button onClick={handleEdit} disabled id="edit" className="block px-4 py-2 text-gray-800 opacity-50 hover:bg-gray-200 w-full text-left">
              Editar
            </button>
          </div>
          <div className='flex justify-between items-center px-2'>
            <label htmlFor="delete"><Trash size={20} className="text-red-500 " /></label>
            <button onClick={_handleDelete} id="delete" className=" block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
              Deletar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OverflowMenu;
