import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";

export default async function BlogPostPage({ params }) {
  const { id } = params;

  if (!id) return notFound(); // Handle missing ID

  const postsDirectory = path.join(process.cwd(), "src", "posts");
  const filePath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(filePath)) return notFound(); // Show 404 if file is missing

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4 text-center">{data.title}</h1>

      {/* Display main image if available */}
      {data.image && (
        <div className="flex justify-center mb-6">
          <Image
            src={data.image}
            alt={data.title}
            width={800}
            height={400}
            className="rounded-md object-cover"
          />
        </div>
      )}

      <article className="prose max-w-3xl mx-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]} // Enables GitHub Flavored Markdown (tables, strikethrough, etc.)
          components={{
            img: ({ src, alt }) => {
              // Ensure images render properly from Markdown and HTML <img> tags
              if (!src.startsWith("http")) return <img src={src} alt={alt} className="rounded-md my-4" />;
              return (
                <div className="flex justify-center my-4">
                  <Image src={src} alt={alt} width={800} height={400} className="rounded-md" />
                </div>
              );
            },
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-5" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4" {...props} />,
            p: ({ node, ...props }) => <p className="text-lg leading-relaxed my-4" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4" {...props} />
            ),
            strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
            em: ({ node, ...props }) => <em className="italic text-gray-700" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
