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
        className="
          flex-1 px-3 py-2 rounded-lg
          border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-700
          text-gray-800 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-blue-500
          placeholder:text-gray-400 dark:placeholder:text-gray-500
        "
        placeholder="New Task"
      />
      <button
        onClick={onAdd}
        className="
          px-4 py-2
          bg-blue-600 text-white
          rounded-lg
          hover:bg-blue-700
          transition
        "
      >
        +
      </button>
    </div>
  )
}