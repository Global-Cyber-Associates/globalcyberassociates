import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const blogFiles = import.meta.glob("../blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

function removeFrontmatter(file) {
  return file.replace(/---([\s\S]*?)---/, "").trim();
}

function extractHeadings(markdown) {
  const headings = [];
  const lines = markdown.split("\n");

  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      headings.push(line.replace("## ", ""));
    }
  });

  return headings;
}

function BlogPost() {
  const { slug } = useParams();
  const file = blogFiles[`../blogs/${slug}.md`];

  const [toc, setToc] = useState([]);

  if (!file) return <h2>Blog not found</h2>;

  const content = removeFrontmatter(file);

  useEffect(() => {
    setToc(extractHeadings(content));
  }, [content]);

  return (
   <> 
    <Helmet>
      <title>{slug} | My Blog</title>
      <meta name="description" content="Developer blog article" />
    </Helmet>
    <div className="max-w-5xl mx-auto p-10 text-white grid md:grid-cols-4 gap-10 bg-white/5 rounded-2xl">

      {/* TABLE OF CONTENTS */}

      <div className="hidden md:block col-span-1">
        <h3 className="font-semibold mb-4">Contents</h3>

        {toc.map((item, i) => (
          <p key={i} className="text-sm opacity-70 mb-2">
            {item}
          </p>
        ))}
      </div>

      {/* BLOG CONTENT */}

      <div className="md:col-span-3 max-w-none 
      [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6
      [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-8 [&>h2]:mb-4
      [&>p]:mb-4 [&>p]:leading-relaxed
      [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4
      [&>li]:mb-2
      [&>pre]:bg-black/50 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto">

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>

      </div>

    </div>
    </>
  );
}

export default BlogPost;