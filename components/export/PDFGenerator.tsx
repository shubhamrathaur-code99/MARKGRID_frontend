"use client";

/**
 * Utility to trigger a download for a Blob returned by the backend.
 * Keeps PDF generation on the server (Puppeteer/Playwright).
 */
export async function downloadBlobAsFile(
  res: Response,
  fallbackFilename: string,
): Promise<void> {
  if (!res.ok) {
    throw new Error(`Export failed: ${res.status}`);
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  // Try to read filename from Content-Disposition; fall back otherwise.
  const cd = res.headers.get("Content-Disposition") || "";
  const match = cd.match(/filename=\"?([^\";]+)\"?/i);
  const filename = match?.[1] ?? fallbackFilename;

  const link = window.document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}




