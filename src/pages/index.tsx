import { getConnection } from "@/connection";

interface Post {
  id: number;
  text: string;
  author: string;
  likes: number;
  created_at: string;
}

// write a function that returns a list of posts with serverside rendering
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export async function getServerSideProps() {
  const connection = await getConnection();
  const response = await connection.query("SELECT * FROM posts");
  const posts = response[0] as Post[];

  const formattedPosts = posts.map((post) => ({
    id: post.id,
    text: post.text,
    creatd_at: post.created_at.toString(),
    author: post.author,
    likes: post.likes,
  }));

  return {
    props: {
      posts: formattedPosts,
      owner: process.env.DISPLAY_NAME,
    },
  };
}

export default function Home({
  posts,
  owner,
}: {
  posts: Post[];
  owner: string;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Tech Tinkers Twitter</h1>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Posts</h2>
        <div className="flex flex-col items-center justify-center">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col items-center justify-center border border-gray-300 rounded-md p-4 m-4"
            >
              <p className="text-lg font-bold">{post.id}</p>
              <p className="text-lg font-bold">{post.text}</p>
              <p className="text-sm">{post.author}</p>
              <p className="text-sm">{post.created_at}</p>
              <p className="text-sm">{post.likes}</p>

              {/* Add a button that calles /api/posts/likes and uses the handler to increment the like count of a post */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={async () => {
                  await fetch(`/api/posts/likes`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: post.id }),
                  });
                  window.location.reload();
                }}
              >
                Like
              </button>

              {/* If post.author == owner then show a delete button that deletes the post */}
              {post.author == owner && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={async () => {
                    await fetch(`/api/posts/${post.id}`, {
                      method: "DELETE",
                    });
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          {/* Create a form for the create post button to allow input for the post text */}
          {process.env.NODE_ENV === "development" && (
            <form
              onSubmit={async (event: any) => {
                event.preventDefault();
                const text = event.target[0].value as string;
                await fetch(`/api/posts`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ text }),
                });
                window.location.reload();
              }}
            >
              <input
                className="border border-gray-300 rounded-md p-4 m-4 text-gray-700"
                type="text"
                placeholder="Post Text"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Create Post
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
