const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const filters = {
    id: "",
    
}
const simpleQuery = async () => {
    const result = await prisma.accounts.findMany({
        where: {
            id: undefined
        }
    })

    console.log(result)
}

simpleQuery()