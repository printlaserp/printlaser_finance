const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


const fees = [
    {
        id: '46e17039-fa32-4d18-a078-9e154e4231c1',
        payment_type: 'credit',
        card_banner: 'elo',
        recurrence: 1,
        fee: 4.91
    },
    {
        id: 'f3d0d79b-6ed2-4b3e-b57e-d2531bdf36db',
        payment_type: 'credit',
        card_banner: 'elo',
        recurrence: 2,
        fee: 6.47
    },
    {
        id: '8d68706d-f4dd-408b-b635-d436b7da8dbf',
        payment_type: 'credit',
        card_banner: 'elo',
        recurrence: 3,
        fee: 7.2
    },
    {
        id: '8549579b-d8fe-42d9-8288-0b0ae06ce896',
        payment_type: 'credit',
        card_banner: 'elo',
        recurrence: 4,
        fee: 7.92
    },
    {
        id: '3608b5a1-1ac0-4e5e-a379-5f0ccc010c8f',
        payment_type: 'credit',
        card_banner: 'elo',
        recurrence: 5,
        fee: 8.63
    },
    {
        id: 'f2e052f2-f8eb-4452-ada7-352858870e98',
        payment_type: 'credit',
        card_banner: 'elo',
        recurrence: 6,
        fee: 9.33
    },
    {
        id: 'b57df0a3-17b4-486c-afe4-5915a78ab648',
        payment_type: 'credit',
        card_banner: 'elo',
        recurrence: 7,
        fee: 10.03
    },
    {
        id: '1c6e92cd-c8e4-4e5d-a51d-de285ab1df6e',
        payment_type: 'credit',
        card_banner: 'elo',
        recurrence: 8,
        fee: 10.72
    },
    {
        id: '72263c26-975a-4284-a739-1e3003a9c53e',
        payment_type: 'credit',
        card_banner: 'elo',
        recurrence: 9,
        fee: 11.41
    },
    {
        id: '87350214-7118-4595-9f8a-98db7ea69493',
        payment_type: 'credit',
        card_banner: 'elo',
        recurrence: 10,
        fee: 12.08
    },
    {
        id: '12f8e02c-7f43-42c5-9322-cebb9bfaca77',
        payment_type: 'credit',
        card_banner: 'elo',
        recurrence: 11,
        fee: 12.75
    },
    {
        id: '448c74e6-c719-480c-a2f8-fab01d93eae1',
        payment_type: 'credit',
        card_banner: 'elo',
        recurrence: 12,
        fee: 13.4
    },
    {
        id: '2ab28c18-fe12-443e-ae7a-75ac44abaa92',
        payment_type: 'credit',
        card_banner: 'hiper',
        recurrence: 1,
        fee: 4.91
    },
    {
        id: '585f6012-c208-4c53-8fde-97d0e3abb102',
        payment_type: 'credit',
        card_banner: 'hiper',
        recurrence: 2,
        fee: 6.47
    },
    {
        id: '41d4558e-ac81-4527-8d4d-c31de65144b0',
        payment_type: 'credit',
        card_banner: 'hiper',
        recurrence: 3,
        fee: 7.2
    },
    {
        id: '44fef5f1-3452-4abb-9872-6ab05c3a558d',
        payment_type: 'credit',
        card_banner: 'hiper',
        recurrence: 4,
        fee: 7.92
    },
    {
        id: 'e6ee7138-542b-4577-8043-095b0a2a3d7c',
        payment_type: 'credit',
        card_banner: 'hiper',
        recurrence: 5,
        fee: 8.63
    },
    {
        id: '4020180c-2561-444f-82fc-a61b98cfc971',
        payment_type: 'credit',
        card_banner: 'hiper',
        recurrence: 6,
        fee: 9.33
    },
    {
        id: '88ab4409-9823-4508-b0dd-054e28b041da',
        payment_type: 'credit',
        card_banner: 'hiper',
        recurrence: 7,
        fee: 10.03
    },
    {
        id: 'f4a5b759-1a94-4965-8db1-ba3a51a37b20',
        payment_type: 'credit',
        card_banner: 'hiper',
        recurrence: 8,
        fee: 10.72
    },
    {
        id: '4ebe66f1-dfdd-4eba-aa1a-875b393b5883',
        payment_type: 'credit',
        card_banner: 'hiper',
        recurrence: 9,
        fee: 11.41
    },
    {
        id: '48f63224-fe44-4c57-a642-403f15a6ae97',
        payment_type: 'credit',
        card_banner: 'hiper',
        recurrence: 10,
        fee: 12.08
    },
    {
        id: 'f9ac22ef-2f47-45b4-a45f-13ebfd0805ae',
        payment_type: 'credit',
        card_banner: 'hiper',
        recurrence: 11,
        fee: 12.75
    },
    {
        id: '41ea50f8-ddec-44d1-827a-12b28bff8a4b',
        payment_type: 'credit',
        card_banner: 'hiper',
        recurrence: 12,
        fee: 13.4
    },
    {
        id: 'acd636a8-910e-4e1b-b380-91fdb383717d',
        payment_type: 'credit',
        card_banner: 'visa',
        recurrence: 1,
        fee: 3.16
    },
    {
        id: '4ba4f2af-4deb-4f21-bdc5-ae0b76eb4676',
        payment_type: 'credit',
        card_banner: 'visa',
        recurrence: 2,
        fee: 5.4
    },
    {
        id: 'd817a3e1-d397-4acb-8f22-17ad2395be55',
        payment_type: 'credit',
        card_banner: 'visa',
        recurrence: 3,
        fee: 6.13
    },
    {
        id: '2771236e-4716-494c-ace6-ec33c0d9efa9',
        payment_type: 'credit',
        card_banner: 'visa',
        recurrence: 4,
        fee: 6.86
    },
    {
        id: '0d0e7ff0-397d-4253-bb4d-42fb30d49b6f',
        payment_type: 'credit',
        card_banner: 'visa',
        recurrence: 5,
        fee: 7.58
    },
    {
        id: 'dcd98e2e-8695-4640-9968-a747ffcf5159',
        payment_type: 'credit',
        card_banner: 'visa',
        recurrence: 6,
        fee: 8.29
    },
    {
        id: '3702a9a0-be2c-44ad-a4f4-2d023c1585b0',
        payment_type: 'credit',
        card_banner: 'visa',
        recurrence: 7,
        fee: 9
    },
    {
        id: '4ebd2566-6c1e-4501-a8ec-f5d94c1ea0de',
        payment_type: 'credit',
        card_banner: 'visa',
        recurrence: 8,
        fee: 9.7
    },
    {
        id: '15c970db-4f18-4009-833f-e01a7c089be2',
        payment_type: 'credit',
        card_banner: 'visa',
        recurrence: 9,
        fee: 10.39
    },
    {
        id: 'de576b54-6d23-4975-94a3-e4a8dd747e90',
        payment_type: 'credit',
        card_banner: 'visa',
        recurrence: 10,
        fee: 11.07
    },
    {
        id: '07c5a5cb-846c-4031-899f-54183e0286f1',
        payment_type: 'credit',
        card_banner: 'visa',
        recurrence: 11,
        fee: 11.75
    },
    {
        id: 'da4a3205-d750-4907-823d-6a54b3d285e0',
        payment_type: 'credit',
        card_banner: 'visa',
        recurrence: 12,
        fee: 12.4
    },
    {
        id: '4b5023ad-4ba1-4cfc-aa66-5205b2884f29',
        payment_type: 'credit',
        card_banner: 'master',
        recurrence: 1,
        fee: 3.16
    },
    {
        id: '503e092c-1a68-4d14-b339-390c7613c5b0',
        payment_type: 'credit',
        card_banner: 'master',
        recurrence: 2,
        fee: 5.4
    },
    {
        id: '1af18c45-5c1c-4b73-ae53-f780c1592299',
        payment_type: 'credit',
        card_banner: 'master',
        recurrence: 3,
        fee: 6.13
    },
    {
        id: 'c5ccae65-2881-4b9c-a1de-c06bb69268bf',
        payment_type: 'credit',
        card_banner: 'master',
        recurrence: 4,
        fee: 6.86
    },
    {
        id: 'a18e935d-7546-43a3-91a6-13ceab6631b2',
        payment_type: 'credit',
        card_banner: 'master',
        recurrence: 5,
        fee: 7.58
    },
    {
        id: 'efa479f9-5eb2-4248-93a9-8dffcc0f61a3',
        payment_type: 'credit',
        card_banner: 'master',
        recurrence: 6,
        fee: 8.29
    },
    {
        id: '8abf7bd6-7b83-43a5-ad70-4e4e81bfeba8',
        payment_type: 'credit',
        card_banner: 'master',
        recurrence: 7,
        fee: 9
    },
    {
        id: '3b2b8090-06b1-495d-b32d-457a74ff8b31',
        payment_type: 'credit',
        card_banner: 'master',
        recurrence: 8,
        fee: 9.7
    },
    {
        id: '0d8a07c7-aa8d-4e97-92bc-4f43ecda73f6',
        payment_type: 'credit',
        card_banner: 'master',
        recurrence: 9,
        fee: 10.39
    },
    {
        id: 'd78a87fc-354a-422b-b7da-f97f11da85b5',
        payment_type: 'credit',
        card_banner: 'master',
        recurrence: 10,
        fee: 11.07
    },
    {
        id: '29230525-def4-4f8e-9f75-9fd1520be901',
        payment_type: 'credit',
        card_banner: 'master',
        recurrence: 11,
        fee: 11.75
    },
    {
        id: '3fc408ef-39e6-441e-87e0-341f3c0849bd',
        payment_type: 'credit',
        card_banner: 'master',
        recurrence: 12,
        fee: 12.4
    },
    {
        id: '2fbda2b9-e7b8-45e9-b6f1-27a99e0365ec',
        payment_type: 'debit',
        card_banner: 'visa',
        recurrence: 1,
        fee: 1.38
    },
    {
        id: 'c07c8d23-21e2-4f7a-9bb4-34c3ba888cae',
        payment_type: 'debit',
        card_banner: 'master',
        recurrence: 1,
        fee: 1.38
    },
    {
        id: '26a95b72-0424-4dd8-a24c-c819d4ed633a',
        payment_type: 'debit',
        card_banner: 'elo',
        recurrence: 1,
        fee: 2.58
    },
    {
        id: '3d782d57-0a70-49ec-997e-48680dcafb77',
        payment_type: 'debit',
        card_banner: 'hiper',
        recurrence: 1,
        fee: 2.58
    },
]

(async () => {
    try {
        for (const it of fees) {
            const existingFee = await prisma.fees.findFirst({
                where: {
                    payment_type: it.payment_type,
                    card_banner: it.card_banner,
                    recurrence: it.recurrence,
                    fee: it.fee
                }
            });

            if (!existingFee) {
                const createdFee = await prisma.fees.create({
                    data: {
                        payment_type: it.payment_type,
                        card_banner: it.card_banner,
                        recurrence: it.recurrence,
                        fee: it.fee
                    }
                });
                console.log(createdFee);
            } else {
                console.log(`Fee already exists: ${JSON.stringify(existingFee)}`);
            }
        }
    } catch (err) {
        console.error(err);
        throw new Error(err);
    } finally {
        await prisma.$disconnect();
    }
})();