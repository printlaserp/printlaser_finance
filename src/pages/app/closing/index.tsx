import React, { useEffect, useState } from 'react';
import Progress from '@/components/Progress';
import MiniCardValue from '@/components/MiniCardValue';
import { Accounts, DailySummaries } from '@prisma/client';
import AccountsBalances from '@components/AccountsBalances';
import CheckPermissions from '@middlewares/CheckPermissions';
import DailySummariesSection from '@components/DailySummary';
import { useSnackbar } from 'notistack';

interface YesterdayBalancesProps {
  account_id: string;
  balance: number;
}

interface ClosingProps {
  incomesSumToday: number
  expensesSumToday: number
  accountsBalanceSum: number
  incomesSumMonth: number
  expensesSumMonth: number
  yesterdayBalances: YesterdayBalancesProps[]
  accounts: Accounts[]
  geralBalance: number
  dailySummaries: DailySummaries[]
}

function Closing() {
  const [data, setData] = useState<ClosingProps | null>(null)
  const [isSubmitting, setSubmitting] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const fetchData = () => {
    fetch('/api/closing')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    fetchData()
  }, [])

  if (!data) {
    return (
      <Progress variant='screen' />
    )
  }

  const { geralBalance, expensesSumMonth, expensesSumToday, incomesSumMonth, incomesSumToday, dailySummaries, accounts } = data

  const saveSummary = async () => {
    setSubmitting(true)
    const accountsBalances = accounts.map((it) => {
      return {
        accountLabel: it.label,
        todayBalance: it.balance.toFixed(2)
      }
    })

    const summary = {
      geralBalance,
      incomesSumToday,
      expensesSumToday,
      accountsBalances,
    }

    const res = await fetch('/api/closing/save_summary', {
      method: "POST",
      body: JSON.stringify(summary),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.status === 200) {
      enqueueSnackbar("Resumo salvo com sucesso!", {
        variant: "success",
      })
    } else {
      enqueueSnackbar(
        `Error ao salvar o resumo! Mensagem de erro: ${res.statusText}`,
        {
          variant: "error",
        }
      )
    }

    setSubmitting(false)
  }

  return (
    <CheckPermissions allowedRoles={['ADMIN', 'ROOT']}>
      <div className='closing-container flex w-[100%] min-h-screen bg-slate-600 justify-center items-center'>
        <div className='flex-grow flex-col h-full w-full '>
          <div className='flex flex-col w-full p-[18px]'>
            <h1 className='mx-8 text-2xl text-white'>Resumo Geral</h1>
            <div className='flex flex-wrap'>
              <div className='m-8 flex w-fit h-full'>
                <div className='flex flex-col h-full w-fit gap-2'>
                  <label className='font-light text-white text-xs'>Hoje</label>
                  <MiniCardValue value={incomesSumToday} borderColor='border-green-600' />
                  <MiniCardValue value={expensesSumToday} borderColor='border-red-600' />
                </div>
              </div>
              <div className='flex flex-col justify-center m-8 w-fit h-full'>
                <div className='flex flex-col h-full w-fit gap-2'>
                  <label className='font-light text-white text-xs'>Tesouro</label>
                  <MiniCardValue value={geralBalance} borderColor='border-blue-600' />
                </div>
              </div>
              <div className='m-8 flex w-fit h-full'>
                <div className='flex flex-col h-full w-fit gap-2'>
                  <label className='font-light text-white text-xs'>Este mês</label>
                  <MiniCardValue value={incomesSumMonth} borderColor='border-green-600' />
                  <MiniCardValue value={expensesSumMonth} borderColor='border-red-600' />
                </div>
              </div>
            </div>
            <h1 className='mx-8 text-2xl text-white'>Contas</h1>
            <div className='accounts-balances-container flex flex-wrap gap-4 m-8'>
              <AccountsBalances accounts={accounts} />
            </div>
            <h1 className='mx-8 text-2xl text-white'>Resumo por dia</h1>
            <div className='accounts-balances-container flex flex-wrap gap-4 m-8'>
              {dailySummaries ? (
                <DailySummariesSection deilySummaries={dailySummaries} />
              ) : (
                <Progress variant='simple' />
              )}
              <button
                disabled={isSubmitting}
                onClick={saveSummary}
                className={`${isSubmitting ? 'bg-amber-500 opacity-50' : 'bg-amber-500 hover:bg-amber-400'
                  } text-sm text-white py-2 px-4 border border-amber-700 rounded w-40`}
              >
                Salvar Resumo
              </button>
            </div>
          </div>
        </div>
      </div>
    </CheckPermissions>
  )
}

export default Closing;