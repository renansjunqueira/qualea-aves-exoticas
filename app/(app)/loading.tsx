export default function Loading() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[50vh] gap-3">
      <div className="w-8 h-8 rounded-full border-3 border-primary-200 border-t-primary-700 animate-spin" />
      <p className="text-sm text-muted font-medium">Carregando…</p>
    </div>
  )
}
