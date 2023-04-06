import { prisma } from "@/utils/dbConnection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const lead = await prisma.contactLead.create({
      data: { name, email, message },
    });
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).send({
      message: "This is an error!",
    });
  }
}
