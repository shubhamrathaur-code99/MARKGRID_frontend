"use client";

import { useState, type ReactNode } from "react";

interface ExportButtonProps {
  onExport: () => void | Promise<void>;
  className?: string;
  children: ReactNode;
}

export function ExportButton({
  onExport,
  className,
  children,
}: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onExport();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      disabled={loading}
    >
      {children}
    </button>
  );
}


