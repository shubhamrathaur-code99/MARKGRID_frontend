"use client";

import { Dropdown } from "@/components/ui/Dropdown";

const btnClass =
  "flex h-10 items-center rounded-xl bg-[#0070ff] px-5 text-sm font-medium text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0070ff] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed dark:focus:ring-offset-neutral-900";

const contentTypeOptions = [
  { value: "post" as const, label: "Post" },
  { value: "image" as const, label: "Image" },
  { value: "video" as const, label: "Video" },
  { value: "blog" as const, label: "Blog" },
];

export type ContentType = "post" | "image" | "video" | "blog";

interface GenerateControlsProps {
  contentType: ContentType;
  onContentTypeChange: (type: ContentType) => void;
  onGenerate: () => void;
  generating?: boolean;
}

export function GenerateControls({
  contentType,
  onContentTypeChange,
  onGenerate,
  generating = false,
}: GenerateControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Dropdown<ContentType>
        value={contentType}
        options={contentTypeOptions}
        onChange={onContentTypeChange}
        ariaLabel="Content type"
        size="small"
      />
      <button
        type="button"
        onClick={onGenerate}
        disabled={generating}
        className={btnClass}
      >
        {generating ? "Generating…" : "Generate"}
      </button>
    </div>
  );
}
