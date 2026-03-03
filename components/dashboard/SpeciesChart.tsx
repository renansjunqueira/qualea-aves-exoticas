interface SpeciesBar {
  name: string
  emoji: string
  count: number
}

interface Props {
  data: SpeciesBar[]
}

export function SpeciesChart({ data }: Props) {
  const max = Math.max(...data.map(d => d.count), 1)

  return (
    <div className="space-y-3">
      {data.map(item => (
        <div key={item.name} className="flex items-center gap-3">
          <span className="text-lg w-6 text-center flex-shrink-0">{item.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700 truncate">{item.name}</span>
              <span className="text-xs font-bold text-primary-700 ml-2 flex-shrink-0">{item.count}</span>
            </div>
            <div className="h-1.5 rounded-full bg-primary-50 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary-500 transition-all duration-700 ease-out"
                style={{ width: `${Math.round((item.count / max) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
