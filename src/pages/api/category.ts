import { prisma } from "@/utils/dbConnection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const r = await prisma.category.findMany();
  //   console.log(r);

  res.status(200).json(r);
}
