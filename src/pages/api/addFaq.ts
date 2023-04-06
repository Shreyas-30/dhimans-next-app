import { prisma } from "@/utils/dbConnection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { question, answer, image, video } = req.body;

  try {
    const product = await prisma.faq.create({
      data: { question, answer, image, video },
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding faq!" });
  }
}
