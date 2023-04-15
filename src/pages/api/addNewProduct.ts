import { Category } from "@prisma/client";
import { prisma } from "../../utils/dbConnection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    title,
    description,
    images,
    fobPrice,
    exworkPrice,
    moq,
    color,
    features,
    category,
  } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        title,
        description,
        images,
        fobPrice,
        exworkPrice,
        color,
        moq,
        features: features.split(",").map((f: string) => f.trim()),
        categories: {
          connect: category.map((catID: Category) => ({ id: catID })),
        },
      },
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error adding product!",
    });
  }
}
