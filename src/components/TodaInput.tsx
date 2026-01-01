import { type KeyboardEvent } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  onAdd: () => void
}

export function TodoInput({ value, onChange, onAdd }: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onAdd()
  }

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
        placeholder="New Task"
      />
      <button
        onClick={onAdd}
        className="bg-black text-white px-4 rounded hover:bg-gray-800"
      >
        +
      </button>
    </div>
  )
}