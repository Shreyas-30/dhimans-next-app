import { prisma } from "@/utils/dbConnection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;

  if (method != "GET") return res.status(405).end(`Method Not Allowed`);

  const id = query.id as string;
  const r = await prisma.product.findUnique({ where: { id } });

  res.status(200).json(r);
}
