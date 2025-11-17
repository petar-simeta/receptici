"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading3,
  Heading4,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(
    null
  );

  const wrapSelection = (before: string, after: string = before) => {
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newText);

    // Restore selection
    setTimeout(() => {
      textareaRef.focus();
      textareaRef.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const prefixLines = (prefix: string) => {
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;

    // Find the start of the first line and end of the last line
    const beforeSelection = value.substring(0, start);
    const afterSelection = value.substring(end);
    const lineStart = beforeSelection.lastIndexOf("\n") + 1;
    const lineEnd = afterSelection.indexOf("\n");
    const selectedLines = value.substring(
      lineStart,
      lineEnd === -1 ? value.length : end + lineEnd
    );

    const lines = selectedLines.split("\n");
    const prefixedLines = lines.map((line) => {
      if (line.trim() === "") return line;
      return prefix + line;
    });

    const newText =
      value.substring(0, lineStart) +
      prefixedLines.join("\n") +
      value.substring(lineEnd === -1 ? value.length : end + lineEnd);

    onChange(newText);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => wrapSelection("**")}
          title="Bold"
        >
          <Bold size={16} />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => wrapSelection("*")}
          title="Italic"
        >
          <Italic size={16} />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => prefixLines("### ")}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => prefixLines("#### ")}
          title="Heading 4"
        >
          <Heading4 size={16} />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => prefixLines("- ")}
          title="Bullet list"
        >
          <List size={16} />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => prefixLines("1. ")}
          title="Ordered list"
        >
          <ListOrdered size={16} />
        </Button>
      </div>

      <Textarea
        ref={setTextareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your recipe instructions in Markdown..."
        className="min-h-[300px] font-mono text-sm"
      />

      <div>
        <h4 className="mb-2 text-sm font-semibold">Preview</h4>
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="markdown-preview">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        </div>
      </div>

      <style jsx>{`
        .markdown-preview :global(h1) {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1rem;
          margin-bottom: 0.75rem;
          color: #0f766e;
        }
        .markdown-preview :global(h3) {
          font-size: 1rem;
          font-weight: 600;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
          color: #0f766e;
        }
        .markdown-preview :global(h4) {
          font-size: 0.875rem;
          font-weight: 600;
          margin-top: 0.625rem;
          margin-bottom: 0.5rem;
          color: #0f766e;
        }
        .markdown-preview :global(p) {
          font-size: 0.75rem;
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
        .markdown-preview :global(ul),
        .markdown-preview :global(ol) {
          font-size: 0.75rem;
          margin-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .markdown-preview :global(ol) {
          list-style-type: decimal;
        }
        .markdown-preview :global(li) {
          margin-bottom: 0.25rem;
        }
        .markdown-preview :global(strong) {
          font-weight: 600;
        }
        .markdown-preview :global(em) {
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
