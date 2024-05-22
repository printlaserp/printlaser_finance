import { List } from '@phosphor-icons/react/dist/ssr/List';
import { ArrowUp } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { ArrowDown } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { useRouter } from 'next/router';
import React from 'react';

interface AccountCardProps {
  id: string,
  label: string,
  balance: number,
  color: string | null,
  is_card_account: boolean,
  previousBalance: number,
}

function AccountCard({
  id,
  label,
  balance,
  color,
  previousBalance,
}: AccountCardProps) {
  const router = useRouter()
  const balanceOfDay = balance - previousBalance;

  const handleAccountTransactions = () => {
    router.push(`/app/transactions?account=${id}`)
  }

  return (
    <div className={`flex relative flex-col rounded-lg text-lg bg-white border-spacing-1 border-${color} border-4 w-[14rem] h-[9rem] p-1`}>
      <div onClick={handleAccountTransactions} className='absolute right-4 top-4 cursor-pointer'>
        <List size={18} />
      </div>
      <div className="font-bold text-lg font-sans text-gray-700 mb-4">{label}</div>
      <div className="flex justify-between mb-1">
        <span className="font-bold text-gray-500 text-base">Saldo anterior</span>
        <div>
          <span className="text-xs text-gray-800 font-bold mr-[2px]">R$</span>
          <span className="font-bold text-base text-gray-800">
            {previousBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-500 text-xs font-bold">Balanço do dia</span>
        <div className={`${balanceOfDay < 0 ? 'text-red-500' : 'text-green-500'} flex items-center`}>
          {balanceOfDay < 0 ? <ArrowDown size={12} className="mr-[2px]" /> : <ArrowUp size={12} className="mr-[2px]" />}
          <span className="text-xs font-bold mr-[2px]">R$</span>
          <span className="font-bold text-[14px]">
            {balanceOfDay.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      <div className="flex justify-between font-bold text-gray-500 text-lg">
        <span>Saldo</span>
        <div>
          <span className="font-bold text-base mr-1 text-gray-800">R$</span>
          <span className="font-bold text-lg text-gray-800">
            {Number(balance).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AccountCard;
