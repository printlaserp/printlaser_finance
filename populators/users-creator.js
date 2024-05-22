const { hash } = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users = [
    // {
    //     first_name: "João",
    //     last_name: "Marcos",
    //     username: "pepa",
    //     password: "15062000",
    //     role: 'CASHIER'
    // },
    // {
    //     first_name: "Rayslla",
    //     last_name: "Vitoria",
    //     username: "rayslla",
    //     password: "12062005",
    //     role: 'CASHIER'
    // },
    // {
    //     first_name: "Administrador",
    //     last_name: "Root",
    //     username: "adm",
    //     password: "thmpv",
    // },
    // {
    //     first_name: "Wendel",
    //     last_name: "S. Pereira",
    //     username: "wendelspereira",
    //     password: "thmpv",
    //     role: 'ADMIN'
    // },
    // {
    //     first_name: "Jayne",
    //     last_name: "Mayslla",
    //     username: "jayne",
    //     password: "peixe",
    //     role: 'ADMIN'
    // },
    // {
    //     first_name: "Sandy",
    //     last_name: "Maria",
    //     username: "sandy",
    //     password: "riachoverde",
    //     role: 'CASHIER'
    // },
    // {
    //     first_name: "Emanoel",
    //     last_name: "Vital",
    //     username: "manu",
    //     password: "Besourudo0",
    //     role: 'CASHIER'
    // }
];

async function createUser(user) {
    const existingUser = await prisma.users.findUnique({
        where: {
            username: user.username,
        },
    });

    if (!existingUser) {
        const hashedPassword = await hash(user.password, 10);
        try {
            await prisma.users.create({
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    password: hashedPassword,
                },
            });
            console.log(`User ${user.username} created!`);
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log(`User ${user.username} already exists.`);
    }
}

async function seedUsers() {
    for (const user of users) {
        await createUser(user);
    }

    await prisma.$disconnect();
}

seedUsers();


