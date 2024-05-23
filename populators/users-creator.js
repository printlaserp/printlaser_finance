const { hash } = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users = [
    {
        first_name: "Usuário",
        last_name: "Limitado",
        username: "user",
        password: "1234",
        role: 'CASHIER'
    },
    {
        first_name: "Administrador",
        last_name: "ROOT",
        username: "admin",
        password: "cast32",
    },    
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


