import { posts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-10 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold text-foreground">
            LinkedIn Posts Gallery
          </h1>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {posts.length} posts
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}