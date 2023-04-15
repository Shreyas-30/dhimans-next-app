import { prisma } from "@/utils/dbConnection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { category } = req.body;

  try {
    const newCat = await prisma.category.create({
      data: { name: category },
    });
    res.status(200).json(newCat);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding category!" });
  }
}
