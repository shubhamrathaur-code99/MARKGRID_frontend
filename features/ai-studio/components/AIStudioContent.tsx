"use client";

import { useState, useCallback } from "react";
import { PromptInput } from "./PromptInput";
import { GenerateControls, type ContentType } from "./GenerateControls";
import { AIResponsePanel } from "./AIResponsePanel";

export function AIStudioContent() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [contentType, setContentType] = useState<ContentType>("post");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return;
    setGenerating(true);
    // Placeholder: simulate generation. Replace with real API call.
    setTimeout(() => {
      setOutput(
        `[${contentType.toUpperCase()}]\n\n${prompt.trim()}\n\n---\nGenerated content placeholder. Connect to your AI API to replace this.`
      );
      setGenerating(false);
    }, 800);
  }, [prompt, contentType]);

  const handleCopy = useCallback(() => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-studio-${contentType}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [output, contentType]);

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col gap-6">
      {/* Top: title + description */}
      <header className="shrink-0">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          AI Studio
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Generate posts, images, video ideas, or blog content. Enter your prompt below and choose a content type.
        </p>
      </header>

      {/* Middle: response panel (chat-style) */}
      <div className="min-h-0 flex-1">
        <AIResponsePanel
          output={output}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onExport={handleDownload}
          emptyMessage="Your generated content will appear here. Enter a prompt and click Generate."
        />
      </div>

      {/* Bottom: prompt input + controls */}
      <div className="shrink-0 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
        <PromptInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleGenerate}
          disabled={generating}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <GenerateControls
            contentType={contentType}
            onContentTypeChange={setContentType}
            onGenerate={handleGenerate}
            generating={generating}
          />
        </div>
      </div>
    </div>
  );
}
