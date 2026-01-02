import { Filter } from '../types/filter'

type Props = {
  value: Filter
  onChange: (filter: Filter) => void
}

export function FilterBar({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      {Object.values(Filter).map(filter => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`px-3 py-1 rounded ${
            value === filter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
