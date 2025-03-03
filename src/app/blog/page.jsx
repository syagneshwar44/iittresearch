import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/markdown"; // Ensure it's a server function

export default async function BlogPage() {
  const posts = getAllPosts(); // Runs on the server

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">Blog Posts</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="rounded-lg shadow-lg p-4 hover:shadow-xl transition">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="rounded-md"
                />
              )}
              <h2 className="text-xl font-semibold mt-3">{post.title}</h2>
              <p className="text-sm text-blue-600">{post.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


