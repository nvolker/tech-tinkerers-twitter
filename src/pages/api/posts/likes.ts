// write an api route that increments the number of likes on a post

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
  const { id } = req.body;
  const connection = await getConnection();
  const response = await connection.query("SELECT * FROM posts WHERE id = ?", [
    id,
  ]);

  const posts = response[0] as Post[];

  if (posts.length == 0) {
    return res.status(404).json({ message: "Post not found" });
  }

  const post = posts[0];

  if (req.method === "POST") {
    post.likes += 1;
    await connection.query("UPDATE posts SET likes = ? WHERE id = ?", [
      post.likes,
      id,
    ]);
  }

  return res.status(200).json(post);
}
