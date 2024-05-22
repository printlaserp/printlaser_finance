import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    let filters = req.query.filters;

    if (Array.isArray(filters)) {
      filters = filters.join(',');
    }

    let whereClause = { active: true };
    if (filters) {
      const filterObject = JSON.parse(filters);
      whereClause = { ...whereClause, ...filterObject };
    }
    const response = await prisma.expenses.findMany({
      where: whereClause
    })
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.json({ error: err })
  }finally{
    await prisma.$disconnect();
  }
}
