const accessRules = {
    'ADMIN': {
        accountLevel: [1, 2, 3, 4, 5],
        modules: ['INCOME', 'EXPENSES', 'TRANSACTIONS', 'DEBITORS', 'CLOSING', 'ACCOUNTS', 'CONFIG']
    },
    'ROOT': {
        accountLevel: [1, 2, 3, 4, 5],
        modules: ['INCOME', 'EXPENSES', 'TRANSACTIONS', 'DEBITORS', 'CLOSING', 'ACCOUNTS', 'CONFIG']
    },
    'CASHIER': {
        accountLevel: [1],
        modules: ['INCOME', 'EXPENSES', 'TRANSACTIONS', 'DEBITORS']
    }
}


export { accessRules }