
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const data = [
//     {
//       value: 50,
//       description: 'Retirada para abastecer a moto',
//       create_at: "2023-12-28T12:08:01.730Z"
//     },
//     {
//       value: 4,
//       description: 'Coentro',
//       create_at: "2023-12-11T10:41:50.055Z"
//     },

//     {
//       value: 579.9400000000001,
//       description: 'Retirada - Contas de agua e luz pessoal',
//       create_at: "2023-11-24T23:06:26.581Z"
//     },
//     {
//       value: 35.8,
//       description: 'Pedaleira',
//       create_at: "2023-11-27T13:23:13.146Z"
//     },
//     {
//       value: 1.7,
//       description: 'Algodão',
//       create_at: "2023-12-23T15:44:43.109Z"
//     },
//     {
//       value: 65.69,
//       description: 'Internet',
//       create_at: "2023-12-20T17:55:31.831Z"
//     },
//     {
//       value: 5,
//       description: 'Jayne',
//       create_at: "2023-12-14T13:42:45.402Z"
//     },
//     {
//       value: 10,
//       description: 'Outros',
//       create_at: "2023-11-29T14:00:28.181Z"
//     },
//     {
//       value: 11.35,
//       description: 'Alimentação',
//       create_at: "2023-12-31T00:08:19.099Z"
//     },
//     {
//       value: 4,
//       description: 'remedio',
//       create_at: "2023-11-27T14:25:20.902Z"
//     },
//     {
//       value: 5,
//       description: 'Alimentação',
//       create_at: "2023-12-29T15:16:47.045Z"
//     },
//     {
//       value: 41,
//       description: 'Retiradas para alimentação',
//       create_at: "2023-12-28T12:20:52.629Z"
//     },
//     {
//       value: 5,
//       description: 'Alimentação',
//       create_at: "2023-12-15T13:30:20.190Z"
//     },
//     {
//       value: 18,
//       description: 'Pastel e pomada de Jayne',
//       create_at: "2023-11-13T11:29:18.561Z"
//     },
//     {
//       value: 15,
//       description: 'Proprietários',
//       create_at: "2023-12-26T13:23:12.000Z"
//     },
//     {
//       value: 10,
//       description: 'Alimentação Jayne',
//       create_at: "2023-11-29T19:20:21.673Z"
//     },
//     {
//       value: 3,
//       description: 'wendel',
//       create_at: "2024-01-02T11:51:05.038Z"
//     },
//     {
//       value: 50,
//       description: 'Bolsas Jayne',
//       create_at: "2023-12-22T19:08:11.548Z"
//     },

//     {
//       value: 5,
//       description: 'alimentação ',
//       create_at: "2024-01-02T14:38:24.100Z"
//     },
//     {
//       value: 1200,
//       description: 'Wendel',
//       create_at: "2023-11-10T20:40:50.498Z"
//     },
//     {
//       value: 75,
//       description: 'Ref. cartoes falecimento de Socorro',
//       create_at: "2023-11-14T19:32:27.000Z"
//     },
//     {
//       value: 30,
//       description: 'Crédito Wendel',
//       create_at: "2023-12-08T20:14:09.573Z"
//     },
//     {
//       value: 160,
//       description: 'Retirada',
//       create_at: "2023-11-24T21:40:04.937Z"
//     },
//     {
//       value: 1838.98,
//       description: 'Parte salário para pagamento dos cartões',
//       create_at: "2023-11-17T01:43:22.000Z"
//     },
//     {
//       value: 5,
//       description: 'Alimentação Jayne',
//       create_at: "2023-11-14T11:34:04.420Z"
//     },
//     {
//       value: 20,
//       description: 'Credito Mae de Jayne',
//       create_at: "2024-01-03T19:15:56.046Z"
//     },
//     {
//       value: 2.1,
//       description: 'Lanche',
//       create_at: "2023-11-27T13:40:43.118Z"
//     },
//     {
//       value: 4,
//       description: 'jayne',
//       create_at: "2023-11-20T11:39:12.884Z"
//     },
//     {
//       value: 9.75,
//       description: 'Alimentação',
//       create_at: "2023-11-18T17:08:30.783Z"
//     },
//     {
//       value: 100,
//       description: 'Parte salário de Rayslla',
//       create_at: "2024-01-11T23:06:16.291Z"
//     },
//     {
//       value: 690,
//       description: 'Pagamento casa ',
//       create_at: "2023-12-10T16:23:04.163Z"
//     },
//     {
//       value: 5,
//       description: 'Alimentação Jayne',
//       create_at: "2023-11-20T20:12:54.233Z"
//     },
//     {
//       value: 10,
//       description: 'Alimentação',
//       create_at: "2023-11-28T11:30:16.519Z"
//     },
//     {
//       value: 5,
//       description: 'Alimentação',
//       create_at: "2023-11-30T21:09:34.430Z"
//     },
//     {
//       value: 2,
//       description: 'Trufa',
//       create_at: "2023-12-29T19:10:23.083Z"
//     },
//     {
//       value: 10,
//       description: 'Alimentação',
//       create_at: "2023-12-18T13:10:20.780Z"
//     },
//     {
//       value: 200,
//       description: 'Jayne',
//       create_at: "2023-12-09T15:17:24.354Z"
//     },
//     {
//       value: 142.77,
//       description: 'Retirada extra para jayne',
//       create_at: "2023-11-23T20:47:08.518Z"
//     },
//     {
//       value: 100,
//       description: 'Retirada para limpeza do carro',
//       create_at: "2023-11-25T21:07:22.475Z"
//     },
//     {
//       value: 500,
//       description: 'Retirada para pintura da casa',
//       create_at: "2023-12-26T15:54:54.875Z"
//     },
//     {
//       value: 137,
//       description: 'Retirada para combustível e alimentação',
//       create_at: "2023-12-26T14:45:01.524Z"
//     },
//     {
//       value: 1.5,
//       description: 'Wendel- Coentro',
//       create_at: "2024-01-15T13:01:30.456Z"
//     },
//     {
//       value: 50,
//       description: 'Retirada para pagar marizete',
//       create_at: "2024-01-02T21:22:45.350Z"
//     },
//     {
//       value: 4,
//       description: 'Lanche',
//       create_at: "2023-11-25T20:49:54.271Z"
//     },
//     {
//       value: 5.1,
//       description: 'Lanche de Jayne',
//       create_at: "2023-11-25T21:15:54.686Z"
//     },
//     {
//       value: 36.88,
//       description: 'Presente para melissa',
//       create_at: "2023-12-29T20:45:10.180Z"
//     },
//     {
//       value: 6,
//       description: 'Alimentação Jayne',
//       create_at: "2023-11-20T11:00:44.090Z"
//     },
//     {
//       value: 321.16,
//       description: 'Retirada para compra do vestido para Jayne',
//       create_at: "2024-01-06T00:49:00.911Z"
//     },
//     {
//       value: 2103.87,
//       description: 'Retirada para cartões',
//       create_at: "2023-12-20T17:28:29.039Z"
//     },
//     {
//       value: 65,
//       description: 'Retirada - Internet',
//       create_at: "2023-11-24T23:21:04.255Z"
//     },
//     {
//       value: 5,
//       description: 'Alimentação Jayne',
//       create_at: "2023-11-16T12:33:09.960Z"
//     },
//     {
//       value: 5,
//       description: 'Alimentação',
//       create_at: "2023-12-28T20:55:30.134Z"
//     },
//     {
//       value: 60,
//       description: 'Tapetes em Salgueiro por Wendel',
//       create_at: "2023-12-09T12:39:46.883Z"
//     },
//     {
//       value: 50,
//       description: 'Proprietários',
//       create_at: "2023-11-28T20:46:34.738Z"
//     },
//   ]


// async function temp() {
//     // const expenses = await prisma.expenses.findMany({
//     //     where: {
//     //         category_id: "7d6c9011-50cc-4b03-9b57-c5a405712ef7"
//     //     },
//     //     select: {
//     //         value: true,
//     //         description: true,
//     //         create_at: true
//     //     }
//     // });

//     let expenses

//     for()

//     console.log(expenses)
// }



// temp();


const transactions = [

    {
        value: 50,
        description: 'Retirada para abastecer a moto',
        create_at: "2023-12-28T12:08:01.730Z"
    },
    {
        value: 4,
        description: 'Coentro',
        create_at: "2023-12-11T10:41:50.055Z"
    },

    {
        value: 579.9400000000001,
        description: 'Retirada - Contas de agua e luz pessoal',
        create_at: "2023-11-24T23:06:26.581Z"
    },
    {
        value: 35.8,
        description: 'Pedaleira',
        create_at: "2023-11-27T13:23:13.146Z"
    },
    {
        value: 1.7,
        description: 'Algodão',
        create_at: "2023-12-23T15:44:43.109Z"
    },
    {
        value: 65.69,
        description: 'Internet',
        create_at: "2023-12-20T17:55:31.831Z"
    },
    {
        value: 5,
        description: 'Jayne',
        create_at: "2023-12-14T13:42:45.402Z"
    },
    {
        value: 10,
        description: 'Outros',
        create_at: "2023-11-29T14:00:28.181Z"
    },
    {
        value: 11.35,
        description: 'Alimentação',
        create_at: "2023-12-31T00:08:19.099Z"
    },
    {
        value: 4,
        description: 'remedio',
        create_at: "2023-11-27T14:25:20.902Z"
    },
    {
        value: 5,
        description: 'Alimentação',
        create_at: "2023-12-29T15:16:47.045Z"
    },
    {
        value: 41,
        description: 'Retiradas para alimentação',
        create_at: "2023-12-28T12:20:52.629Z"
    },
    {
        value: 5,
        description: 'Alimentação',
        create_at: "2023-12-15T13:30:20.190Z"
    },
    {
        value: 18,
        description: 'Pastel e pomada de Jayne',
        create_at: "2023-11-13T11:29:18.561Z"
    },
    {
        value: 15,
        description: 'Proprietários',
        create_at: "2023-12-26T13:23:12.000Z"
    },
    {
        value: 10,
        description: 'Alimentação Jayne',
        create_at: "2023-11-29T19:20:21.673Z"
    },
    {
        value: 3,
        description: 'wendel',
        create_at: "2024-01-02T11:51:05.038Z"
    },
    {
        value: 50,
        description: 'Bolsas Jayne',
        create_at: "2023-12-22T19:08:11.548Z"
    },

    {
        value: 5,
        description: 'alimentação ',
        create_at: "2024-01-02T14:38:24.100Z"
    },
    {
        value: 1200,
        description: 'Wendel',
        create_at: "2023-11-10T20:40:50.498Z"
    },
    {
        value: 75,
        description: 'Ref. cartoes falecimento de Socorro',
        create_at: "2023-11-14T19:32:27.000Z"
    },
    {
        value: 30,
        description: 'Crédito Wendel',
        create_at: "2023-12-08T20:14:09.573Z"
    },
    {
        value: 160,
        description: 'Retirada',
        create_at: "2023-11-24T21:40:04.937Z"
    },
    {
        value: 1838.98,
        description: 'Parte salário para pagamento dos cartões',
        create_at: "2023-11-17T01:43:22.000Z"
    },
    {
        value: 5,
        description: 'Alimentação Jayne',
        create_at: "2023-11-14T11:34:04.420Z"
    },
    {
        value: 20,
        description: 'Credito Mae de Jayne',
        create_at: "2024-01-03T19:15:56.046Z"
    },
    {
        value: 2.1,
        description: 'Lanche',
        create_at: "2023-11-27T13:40:43.118Z"
    },
    {
        value: 4,
        description: 'jayne',
        create_at: "2023-11-20T11:39:12.884Z"
    },
    {
        value: 9.75,
        description: 'Alimentação',
        create_at: "2023-11-18T17:08:30.783Z"
    },
    {
        value: 100,
        description: 'Parte salário de Rayslla',
        create_at: "2024-01-11T23:06:16.291Z"
    },
    {
        value: 690,
        description: 'Pagamento casa ',
        create_at: "2023-12-10T16:23:04.163Z"
    },
    {
        value: 5,
        description: 'Alimentação Jayne',
        create_at: "2023-11-20T20:12:54.233Z"
    },
    {
        value: 10,
        description: 'Alimentação',
        create_at: "2023-11-28T11:30:16.519Z"
    },
    {
        value: 5,
        description: 'Alimentação',
        create_at: "2023-11-30T21:09:34.430Z"
    },
    {
        value: 2,
        description: 'Trufa',
        create_at: "2023-12-29T19:10:23.083Z"
    },
    {
        value: 10,
        description: 'Alimentação',
        create_at: "2023-12-18T13:10:20.780Z"
    },
    {
        value: 200,
        description: 'Jayne',
        create_at: "2023-12-09T15:17:24.354Z"
    },
    {
        value: 142.77,
        description: 'Retirada extra para jayne',
        create_at: "2023-11-23T20:47:08.518Z"
    },
    {
        value: 100,
        description: 'Retirada para limpeza do carro',
        create_at: "2023-11-25T21:07:22.475Z"
    },
    {
        value: 500,
        description: 'Retirada para pintura da casa',
        create_at: "2023-12-26T15:54:54.875Z"
    },
    {
        value: 137,
        description: 'Retirada para combustível e alimentação',
        create_at: "2023-12-26T14:45:01.524Z"
    },
    {
        value: 1.5,
        description: 'Wendel- Coentro',
        create_at: "2024-01-15T13:01:30.456Z"
    },
    {
        value: 50,
        description: 'Retirada para pagar marizete',
        create_at: "2024-01-02T21:22:45.350Z"
    },
    {
        value: 4,
        description: 'Lanche',
        create_at: "2023-11-25T20:49:54.271Z"
    },
    {
        value: 5.1,
        description: 'Lanche de Jayne',
        create_at: "2023-11-25T21:15:54.686Z"
    },
    {
        value: 36.88,
        description: 'Presente para melissa',
        create_at: "2023-12-29T20:45:10.180Z"
    },
    {
        value: 6,
        description: 'Alimentação Jayne',
        create_at: "2023-11-20T11:00:44.090Z"
    },
    {
        value: 321.16,
        description: 'Retirada para compra do vestido para Jayne',
        create_at: "2024-01-06T00:49:00.911Z"
    },
    {
        value: 2103.87,
        description: 'Retirada para cartões',
        create_at: "2023-12-20T17:28:29.039Z"
    },
    {
        value: 65,
        description: 'Retirada - Internet',
        create_at: "2023-11-24T23:21:04.255Z"
    },
    {
        value: 5,
        description: 'Alimentação Jayne',
        create_at: "2023-11-16T12:33:09.960Z"
    },
    {
        value: 5,
        description: 'Alimentação',
        create_at: "2023-12-28T20:55:30.134Z"
    },
    {
        value: 60,
        description: 'Tapetes em Salgueiro por Wendel',
        create_at: "2023-12-09T12:39:46.883Z"
    },
    {
        value: 50,
        description: 'Proprietários',
        create_at: "2023-11-28T20:46:34.738Z"
    },

];

function sumValuesByMonth(month, year) {
    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.create_at);
        return transactionDate.getMonth() + 1 === month && transactionDate.getFullYear() === year;
    });

    const sum = filteredTransactions.reduce((accumulator, transaction) => accumulator + transaction.value, 0);

    return sum;
}

// Soma para o mês 11 (novembro)
const sumNovember = sumValuesByMonth(11, 2023);
console.log(`Soma para novembro: ${sumNovember}`);

// Soma para o mês 12 (dezembro)
const sumDecember = sumValuesByMonth(12, 2023);
console.log(`Soma para dezembro: ${sumDecember}`);

// Soma para o mês 01 (janeiro)
const sumJanuary = sumValuesByMonth(1, 2024);
console.log(`Soma para janeiro: ${sumJanuary}`);
