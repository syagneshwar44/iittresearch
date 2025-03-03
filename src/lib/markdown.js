// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";

// const postsDirectory = path.join(process.cwd(), "posts");

// export function getAllPosts() {
//   const fileNames = fs.readdirSync(postsDirectory);
//   return fileNames.map((fileName) => {
//     const slug = fileName.replace(".md", "");
//     const filePath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(filePath, "utf8");
//     const { data } = matter(fileContents);
//     return { slug, ...data };
//   });
// }

// export function getPostBySlug(slug) {
//   const filePath = path.join(postsDirectory, `${slug}.md`);
//   if (!fs.existsSync(filePath)) return null;

//   const fileContents = fs.readFileSync(filePath, "utf8");
//   const { data, content } = matter(fileContents);
//   return { slug, ...data, content };
// }




// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";

// const postsDirectory = path.join(process.cwd(), "posts");

// export function getAllPosts() {
//   if (!fs.existsSync(postsDirectory)) {
//     console.error(`Posts directory not found: ${postsDirectory}`);
//     return [];
//   }

//   const fileNames = fs.readdirSync(postsDirectory);
//   return fileNames.map((fileName) => {
//     const slug = fileName.replace(".md", "");
//     const filePath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(filePath, "utf-8");
//     const { data } = matter(fileContents); // Extract metadata (title, subtitle, image, etc.)

//     return {
//       slug,
//       title: data.title || "Untitled",
//       subtitle: data.subtitle || "",
//       image: data.image || null,
//     };
//   });
// }




import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
    };
  });
}

export function getPostBySlug(slug) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null; // Return null if the file doesn't exist
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  return {
    slug,
    content,
    ...data,
  };
}
