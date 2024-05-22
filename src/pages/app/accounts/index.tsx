import React, { useEffect, useState } from 'react';
import Progress from '@/components/Progress';
import { Accounts } from '@prisma/client';
import AccountsBalances from '@components/AccountsBalances';
import CheckPermissions from '@middlewares/CheckPermissions';
import { useSnackbar } from 'notistack';

interface AccountsProps {
  accounts: Accounts[]
}

function Accounts() {
  const [data, setData] = useState<AccountsProps | null>(null)
  const { enqueueSnackbar } = useSnackbar()

  const fetchData = () => {
    fetch('/api/accounts')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      }).catch(err => {
        enqueueSnackbar(
          `Error ao buscar as contas: ${JSON.stringify(err)}`,
          {
            variant: "error",
          }
        )
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

  const { accounts } = data

  return (
    <CheckPermissions allowedRoles={['ADMIN', 'ROOT']} >
      <div className='closing-container flex w-[100%] min-h-screen bg-slate-600 justify-center items-center'>
        <div className='flex-grow flex-col h-full w-full '>
          <div className='flex flex-col w-full p-[18px]'>
            <h1 className='mx-8 text-2xl text-white'>Contas</h1>
            <div className='accounts-balances-container flex flex-wrap gap-4 m-8'>
              <AccountsBalances accounts={accounts} />
            </div>
          </div>
        </div>
      </div>
    </CheckPermissions>
  )
}

export default Accounts;