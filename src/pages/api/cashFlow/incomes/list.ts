import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  let filters = req.query.filters;

  try {
    if (Array.isArray(filters)) {
      filters = filters.join(',');
    }

    let whereClause = { active: true };
    if (filters) {
      const filterObject = JSON.parse(filters);
      whereClause = { ...whereClause, ...filterObject };
    }

    const response = await prisma.incomings.findMany({
      where: whereClause
    });
    return res.status(200).json(response);
  } catch (err) {
    res.json({ error: err })
    throw err
  } finally {
    await prisma.$disconnect()
  }
}
