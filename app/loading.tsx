export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <div className="h-12 animate-pulse rounded-xl bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 animate-pulse rounded-full bg-slate-100" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
