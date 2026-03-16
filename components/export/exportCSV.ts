"use client";

function escapeField(value: string | number): string {
  const s = String(value);
  const needsQuotes = /[",\r\n]/.test(s);
  if (!needsQuotes) return s;
  return `"${s.replace(/"/g, '""')}"`;
}

export function exportToCSV(
  headers: string[],
  rows: (string | number)[][],
  filename: string,
) {
  const headerRow = headers.map(escapeField).join(",");
  const dataRows = rows.map((row) => row.map(escapeField).join(","));
  const csv = [headerRow, ...dataRows].join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

