interface Post {
  id: number;
  text: string;
  author: string;
  created_at: string;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Tech Tinkers Twitter
    </main>
  );
}
