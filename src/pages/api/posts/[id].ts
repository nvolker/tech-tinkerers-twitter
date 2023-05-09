import { getConnection } from "@/connection";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "DELETE": {
      const { id } = req.query;
      const connection = await getConnection();

      const post = await connection.query("DELETE FROM posts WHERE id = ?", [
        id,
      ]);

      return res.status(200).json(post);
    }
    default: {
      return res.status(404).json({ message: "Post not found" });
    }
  }
}
