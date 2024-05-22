import Modal from '@components/Modal';
import { RoundedLabel } from '@components/RoundedLabel';
import { useAppData } from '@contexts/initialDataContext';
import { TransactionsFiltersType } from '@dtos/FiltersDTO';
import findLabel from '@helpers/GetLabel';
import { Broom } from '@phosphor-icons/react/dist/ssr/Broom';
import { FunnelSimple } from '@phosphor-icons/react/dist/ssr/FunnelSimple';
import React, { useState, useRef, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';

type FiltersOverflowMenuProps = {
  handleFilters: (filters: TransactionsFiltersType) => void
}

function FiltersOverflowMenu({ handleFilters }: FiltersOverflowMenuProps) {
  const { categories, subcategories, accounts } = useAppData()
  const [menuVisible, setMenuVisible] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false)
  const [accountModal, setAccountModal] = useState(false)
  const [filters, setFilters] = useState<TransactionsFiltersType>({
    category: undefined,
    subcategory: undefined,
    type: 'TRANSACTIONS',
    account: undefined,
    gte: undefined,
    lt: undefined
  })

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const openCategoryModal = () => {
    setCategoryModal(true)
  };
  const closeCategoryModal = () => {
    setCategoryModal(false)
  };

  const openAccountModal = () => {
    setAccountModal(true)
  };
  const closeAccountModal = () => {
    setAccountModal(false)
  };

  const handleAccount = () => {
    setAccountModal(true)
  };

  const handleIncome = () => {
    setFilters({ ...filters, type: 'INCOME' })
  };

  const handleExpense = () => {
    setFilters({ ...filters, type: 'EXPENSE' })
  };

  const handleTransference = () => {
    setFilters({ ...filters, type: 'TRANSFERENCE' })
  };

  const handleTransactions = () => {
    setFilters({ ...filters, type: 'TRANSACTIONS' })
  };


  const handleInitialDate = (date: Date) => {
    const initialDate = new Date(date)
    initialDate.setHours(0, 0, 0, 0)
    setFilters({ ...filters, gte: initialDate.toISOString() })
  };

  const handleFinalDate = (date: Date) => {
    const finalDate = new Date(date)
    finalDate.setHours(23, 59, 59, 999)
    setFilters({ ...filters, lt: finalDate.toISOString() })
  };

  const handleClear = () => {
    setFilters({
      category: undefined,
      subcategory: undefined,
      type: 'TRANSACTIONS',
      account: undefined,
      gte: undefined,
      lt: undefined
    })
  }

  const handleSubmit = () => {
    handleFilters(filters)
    toggleMenu()
  }

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
      <button className="p-2 rounded-lg hover:bg-gray-200" onClick={toggleMenu}>
        <FunnelSimple size={28} className="text-gray-700" />
      </button>

      {menuVisible && (
        <div className="absolute right-0 mt-2 py-2 w-60 bg-white border rounded-lg shadow-lg z-10">
          <div className='flex justify-between flex-col px-4'>
            <button onClick={openCategoryModal} className="block py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
              Filtrar por categoria
            </button>
            <div className='flex gap-1 w-full pl-4'>
              {filters.category && <RoundedLabel label={findLabel(categories, filters.category)} />}
              {filters.subcategory && <RoundedLabel label={findLabel(subcategories, filters.subcategory)} subcategory />}
            </div>
            <hr className='border-b-1 border-gray-300' />
            <button onClick={handleAccount} className="block py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
              Filtrar por conta
            </button>
            <div className='flex gap-1 w-full pl-4'>
              {filters.account && <RoundedLabel label={findLabel(accounts, filters.account)} />}
            </div>
            <hr className='border-b-1 border-gray-300' />

            <div onClick={handleTransactions} className='flex items-center justify-between hover:bg-gray-200 cursor-pointer'>
              <span 
                className="block py-2 text-gray-800  text-left">
                Todos
              </span>
              {filters.type === 'TRANSACTIONS' && <span className="bg-[#008282] w-12 px-2 h-4 rounded-full" />}
            </div>

            <div onClick={handleIncome} className='flex items-center justify-between hover:bg-gray-200 cursor-pointer'>
              <span 
                className="block py-2 text-gray-800  text-left">
                Entradas
              </span>
              {filters.type === 'INCOME' && <span className="bg-[#008282] w-12 px-2 h-4 rounded-full" />}
            </div>

            <div onClick={handleExpense} className='flex items-center justify-between hover:bg-gray-200 cursor-pointer'>
              <span 
                className="block py-2 text-gray-800  text-left">
                Saídas
              </span>
              {filters.type === 'EXPENSE' && <span className="bg-[#008282] w-12 px-2 h-4 rounded-full" />}
            </div>

            <div onClick={handleTransference} className='flex items-center justify-between hover:bg-gray-200 cursor-pointer'>
              <span 
                className="block py-2 text-gray-800  text-left">
                Transferências
              </span>
              {filters.type === 'TRANSFERENCE' && <span className="bg-[#008282] w-12 px-2 h-4 rounded-full" />}
            </div>

            <hr className='border-b-1 border-gray-300' />

            <div className='flex items-center justify-between'>
              <label className="block py-2 text-gray-800 hover:bg-gray-200 text-left">De:</label>
              <ReactDatePicker
                name="date"
                id="date"
                selected={new Date(filters.gte || new Date()) || new Date()}
                onChange={(date) => handleInitialDate(date || new Date())}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()} // Define a data máxima como a data atual
                className="w-40 text-center rounded-lg h-8"
              />
            </div>
            <div className='flex items-center justify-between'>
              <label className="block py-2 text-gray-800 hover:bg-gray-200 text-left">Até:</label>
              <ReactDatePicker
                name="date"
                id="date"
                selected={new Date(filters.lt || new Date()) || new Date()}
                onChange={(date) => handleFinalDate(date || new Date())}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()} // Define a data máxima como a data atual
                className="w-40 text-center rounded-lg h-8"
              />
            </div>
          </div>

          <div className='buttons mt-4 flex justify-between gap-1 px-4'>
            <button onClick={handleSubmit} className="bg-[#008282] w-3/4 hover:opacity-70 text-sm text-white py-2 px-4 border border-[#008282] rounded">
              Filtrar
            </button>
            <div className="w-1/4 bg-red-400 justify-center items-center hover:opacity-70 text-sm text-white py-2 px-4 border rounded" onClick={handleClear}>
              <Broom size={24} className='text-white w-full' />
            </div>
          </div>
        </div>
      )}
      {/* Modal de filtro por categoria */}
      {categoryModal && (
        <Modal isOpen={categoryModal} onClose={closeCategoryModal}>
          <div className='flex flex-col gap-4'>
            <h1 className='font-bold text-lg text-gray-700 mb-4'>Filtrar por categoria</h1>
            {/* <Divider /> */}
            <div className='flex flex-col'>
              <label htmlFor="category">Categoria</label>
              <select id="category" onChange={(e) => {
                const { value } = e.target
                setFilters({ ...filters, category: value })
              }} defaultValue={"sel"}>
                <option disabled value='sel'>Selecione</option>
                {categories.map(it => (
                  <option key={it.id} value={it.id}>{it.label}</option>
                ))}
              </select>
            </div>

            <div className='flex flex-col'>
              <label htmlFor="subcategory">Subcategoria</label>
              <select id="subcategory" onChange={(e) => {
                const { value } = e.target
                setFilters({ ...filters, subcategory: value })
              }} defaultValue={"sel"}>
                <option disabled value='sel'>Selecione</option>
                {subcategories.filter(
                  (it) => it.category_id === filters.category
                ).map(it => (
                  <option key={it.id} value={it.id}>{it.label}</option>
                ))}
              </select>
            </div>

            <button onClick={closeCategoryModal} className="bg-[#008282] hover:opacity-70 text-sm text-white py-2 px-4 border border-[#008282] rounded">
              Ok
            </button>
          </div>
        </Modal>
      )
      }
      {/* Modal de filtro por conta */}
      {accountModal && (
        <Modal isOpen={accountModal} onClose={closeAccountModal}>
          <div className='flex flex-col gap-4'>
            <h1 className='font-bold text-lg text-gray-700 mb-4'>Filtrar por conta</h1>
            <div className='flex flex-col'>
              <label htmlFor="account">Conta</label>
              <select id="account" onChange={(e) => {
                const { value } = e.target
                setFilters({ ...filters, account: value })
              }} defaultValue={"sel"}>
                <option disabled value='sel'>Selecione</option>
                {accounts.map(it => (
                  <option key={it.id} value={it.id}>{it.label}</option>
                ))}
              </select>
            </div>
            <button type='button' onClick={closeAccountModal} className="bg-[#008282] hover:opacity-70 text-sm text-white py-2 px-4 border border-[#008282] rounded">
              Ok
            </button>
          </div>
        </Modal>
      )
      }


    </div >
  );
}

export default FiltersOverflowMenu;
