import React, { memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

const MarkdownRenderer = memo(({ content }) => {
  return (
    <div className="prose prose-invert max-w-full text-gray-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-3">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-medium mb-2">{children}</h3>,
          p: ({ children }) => <p className="text-base leading-relaxed mb-4">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-400 hover:underline hover:text-blue-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300 my-4">
              {children}
            </blockquote>
          ),
          table: ({ children }) => <table className="w-full border-collapse border border-gray-700 my-4">{children}</table>,
          th: ({ children }) => (
            <th className="border border-gray-600 px-3 py-2 bg-gray-800 text-white">{children}</th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-600 px-3 py-2">{children}</td>
          ),
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const [copied, setCopied] = useState(false);

            const copyToClipboard = async () => {
              await navigator.clipboard.writeText(children);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            };

            return inline ? (
              <code className="bg-gray-700 px-2 py-1 rounded text-sm font-mono text-white">
                {children}
              </code>
            ) : match ? (
              <div className="relative my-4">
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs p-1.5 rounded"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
                <SyntaxHighlighter
                  style={dracula}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ borderRadius: "8px", padding: "16px" }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-gray-700 px-2 py-1 rounded text-sm font-mono text-white">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

export default MarkdownRenderer;
