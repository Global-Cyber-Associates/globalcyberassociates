import { Link } from "react-router-dom";
import { useState } from "react";

const blogFiles = import.meta.glob("../blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

function parseFrontmatter(file) {
  const match = file.match(/---([\s\S]*?)---/);
  const frontmatter = match ? match[1] : "";

  const data = {};
  frontmatter.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (!key) return;
    data[key.trim()] = rest.join(":").trim();
  });

  const content = file.replace(/---([\s\S]*?)---/, "").trim();

  return { data, content };
}

function readingTime(text) {
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

const blogs = Object.entries(blogFiles)
  .map(([path, file]) => {
    const slug = path.split("/").pop().replace(".md", "");
    const { data, content } = parseFrontmatter(file);

    return {
      slug,
      ...data,
      tags: data.tags ? data.tags.split(",") : [],
      reading: readingTime(content)
    };
  })
  .filter((blog) => blog.title);

function Blog() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.description.toLowerCase().includes(search.toLowerCase());

    const matchesTag =
      activeTag === "" || blog.tags.includes(activeTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-10">Blog</h1>
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded bg-white/10"
      />

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag("")}
          className={`px-3 py-1 rounded ${activeTag === "" ? "bg-blue-500" : "bg-white/10"}`}
        >
          All
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1 rounded ${activeTag === tag ? "bg-blue-500" : "bg-white/10"}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.slug}
            className="bg-white/5 rounded-xl overflow-hidden hover:scale-105 transition"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-6">
              <p className="text-sm opacity-70 mb-2">
                {blog.date} • {blog.reading}
              </p>

              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>

              <p className="opacity-80 mb-4">{blog.description}</p>

              <Link
                to={`/blog/${blog.slug}`}
                className="text-blue-400 hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;