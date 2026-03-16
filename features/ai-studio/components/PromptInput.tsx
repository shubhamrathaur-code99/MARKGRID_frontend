"use client";

const textareaClass =
  "w-full min-h-[120px] resize-y rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-[#0070ff] focus:outline-none focus:ring-2 focus:ring-[#0070ff] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:placeholder:text-neutral-400";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function PromptInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = "Describe what you want to create...",
}: PromptInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={textareaClass}
        rows={4}
        aria-label="Prompt"
      />
    </div>
  );
}
