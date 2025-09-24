import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { visit } from "unist-util-visit";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Custom remark plugin to support underline syntax like ++text++
const remarkUnderline = () => {
  return (tree: any) => {
    visit(tree, "text", (node: any, index: any, parent: any) => {
      if (node.value && node.value.includes("++")) {
        const parts = node.value.split(/(\\+\\+[^+]+\\+\\+)/g);
        if (parts.length > 1) {
          const newChildren: any[] = [];

          parts.forEach((part: string, i: number) => {
            if (part.match(/^\\+\\+[^+]+\\+\\+$/)) {
              // This is underlined text
              const text = part.replace(/\\+\\+/g, "");
              newChildren.push({
                type: "html",
                value: `<u>${text}</u>`,
              });
            } else if (part) {
              // Regular text
              newChildren.push({
                type: "text",
                value: part,
              });
            }
          });

          parent.children.splice(index, 1, ...newChildren);
        }
      }
    });
  };
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  return (
    <div className={`prose prose-lg max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkUnderline]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mb-6 text-background-dark dark:text-background-light">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold mb-4 mt-8 text-background-dark dark:text-background-light">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-bold mb-3 mt-6 text-background-dark dark:text-background-light">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-bold mb-2 mt-4 text-background-dark dark:text-background-light">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-lg font-bold mb-2 mt-4 text-background-dark dark:text-background-light">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-base font-bold mb-2 mt-4 text-background-dark dark:text-background-light">
              {children}
            </h6>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="mb-4 text-background-dark/80 dark:text-background-light/80 leading-relaxed">
              {children}
            </p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-background-dark/80 dark:text-background-light/80 ml-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-background-dark/80 dark:text-background-light/80 ml-4">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),

          // Code
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-background-dark/10 dark:bg-background-light/10 px-1.5 py-0.5 rounded text-sm font-mono text-background-dark dark:text-background-light">
                  {children}
                </code>
              );
            }

            return (
              <code className="block bg-background-dark/5 dark:bg-background-light/5 p-4 rounded-lg text-sm font-mono overflow-x-auto text-background-dark dark:text-background-light">
                {children}
              </code>
            );
          },

          // Code blocks
          pre: ({ children }) => (
            <pre className="bg-background-dark/5 dark:bg-background-light/5 p-4 rounded-lg mb-4 overflow-x-auto">
              {children}
            </pre>
          ),

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 bg-background-dark/5 dark:bg-background-light/5 italic text-background-dark/80 dark:text-background-light/80">
              {children}
            </blockquote>
          ),

          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-background-dark/20 dark:border-background-light/20">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-background-dark/20 dark:border-background-light/20 px-4 py-2 bg-background-dark/10 dark:bg-background-light/10 font-semibold text-background-dark dark:text-background-light">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-background-dark/20 dark:border-background-light/20 px-4 py-2 text-background-dark/80 dark:text-background-light/80">
              {children}
            </td>
          ),

          // Horizontal rule
          hr: () => (
            <hr className="my-8 border-background-dark/20 dark:border-background-light/20" />
          ),

          // Images
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="max-w-full h-auto rounded-lg mb-4 mx-auto"
            />
          ),

          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="font-bold text-background-dark dark:text-background-light">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-background-dark dark:text-background-light">
              {children}
            </em>
          ),
          u: ({ children }) => (
            <u className="underline text-background-dark dark:text-background-light">
              {children}
            </u>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
