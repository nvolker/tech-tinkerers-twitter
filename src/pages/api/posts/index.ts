// create a new post

import { getConnection } from "@/connection";

import { NextApiRequest, NextApiResponse } from "next";

interface Post {
  id: number;
  text: string;
  author: string;
  likes: number;
  created_at: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      const { text } = req.body;
      const author = process.env.DISPLAY_NAME;
      const connection = await getConnection();

      const post = await connection.query(
        "INSERT INTO posts (text, author) VALUES (?, ?)",
        [text, author]
      );

      return res.status(200).json(post);
    }
    default: {
      return res.status(404).json({ message: "Post not found" });
    }
  }
}
