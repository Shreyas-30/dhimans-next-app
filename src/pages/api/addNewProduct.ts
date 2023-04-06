import { prisma } from "../../utils/dbConnection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { title, description, images } = req.body;
  console.log(title, description);
  try {
    const product = await prisma.product.create({
      data: { title, description, images },
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error adding product!",
    });
  }
}
