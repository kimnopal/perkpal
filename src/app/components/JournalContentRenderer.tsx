import React from "react";
import { JournalContentNode, JournalContentText } from "@/types";

interface JournalContentRendererProps {
  content: JournalContentNode[];
}

interface TextRendererProps {
  text: JournalContentText;
}

const TextRenderer: React.FC<TextRendererProps> = ({ text }) => {
  let className = "";

  if (text.bold) className += " font-bold";
  if (text.italic) className += " italic";
  if (text.underline) className += " underline";
  if (text.strikethrough) className += " line-through";

  return <span className={className.trim() || undefined}>{text.text}</span>;
};

const JournalContentRenderer: React.FC<JournalContentRendererProps> = ({
  content,
}) => {
  const renderNode = (node: JournalContentNode, index: number) => {
    const children = node.children.map((text, textIndex) => (
      <TextRenderer key={textIndex} text={text} />
    ));

    switch (node.type) {
      case "heading":
        const HeadingTag = `h${node.level}` as
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6";
        const headingClasses = {
          1: "text-4xl font-bold mb-6 text-background-dark dark:text-background-light",
          2: "text-3xl font-bold mb-4 text-background-dark dark:text-background-light",
          3: "text-2xl font-bold mb-3 text-background-dark dark:text-background-light",
          4: "text-xl font-bold mb-2 text-background-dark dark:text-background-light",
          5: "text-lg font-bold mb-2 text-background-dark dark:text-background-light",
          6: "text-base font-bold mb-2 text-background-dark dark:text-background-light",
        };

        return (
          <HeadingTag
            key={index}
            className={
              headingClasses[node.level as keyof typeof headingClasses] ||
              headingClasses[1]
            }
          >
            {children}
          </HeadingTag>
        );

      case "paragraph":
        return (
          <p
            key={index}
            className="mb-4 text-background-dark/80 dark:text-background-light/80 leading-relaxed"
          >
            {children}
          </p>
        );

      case "list":
        const ListTag = node.format === "ordered" ? "ol" : "ul";
        const listClass =
          node.format === "ordered"
            ? "list-decimal list-inside mb-4 space-y-1 text-background-dark/80 dark:text-background-light/80"
            : "list-disc list-inside mb-4 space-y-1 text-background-dark/80 dark:text-background-light/80";

        return (
          <ListTag key={index} className={listClass}>
            {children}
          </ListTag>
        );

      case "list-item":
        return (
          <li key={index} className="ml-4">
            {children}
          </li>
        );

      default:
        return (
          <div key={index} className="mb-4">
            {children}
          </div>
        );
    }
  };

  return (
    <div className="prose prose-lg max-w-none">
      {content.map((node, index) => renderNode(node, index))}
    </div>
  );
};

export default JournalContentRenderer;
