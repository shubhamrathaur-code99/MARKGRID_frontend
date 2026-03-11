export default function RootLoading() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-[url('/whitebg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed dark:bg-[url('/blackbg.jpg')]"
      role="status"
      aria-label="Loading"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#0070ff] border-t-transparent" />
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        Loading...
      </p>
    </div>
  );
}
