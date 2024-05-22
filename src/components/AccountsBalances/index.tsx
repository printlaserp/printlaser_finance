import React from 'react';
import MiniCardAccountValue from '@components/MiniCardAccountValue';
import { Accounts } from '@prisma/client';
import Progress from '@components/Progress';

interface AccountsBalances {
  accounts: Accounts[]
}

function AccountsBalances({
  accounts
}: AccountsBalances) {
  if(!accounts) return <Progress variant='simple' />
  return (<>
    {
      accounts.map((it) => {
        const { label, balance, color, id } = it
        return < MiniCardAccountValue key={id} accountName={label} value={Number(balance)} borderColor={color} id={id} />
      })
    }
  </>
  );
}

export default AccountsBalances;
