import type { Todo } from '../types/todo'

interface Props {
  todo: Todo
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

export function TodoItem({ todo, onToggle, onRemove }: Props) {
  return (
    <li className="
      flex items-center justify-between
      px-3 py-2
      border rounded-lg
      hover:bg-gray-50
      transition
    ">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="accent-blue-600"
        />
        <span
          className={`${
            todo.completed
              ? 'line-through text-gray-400'
              : 'text-gray-800'
          }`}
        >
          {todo.text}
        </span>
      </label>
      <button
        onClick={() => onRemove(todo.id)}
        className="
          w-6 h-6
          flex items-center justify-center
          rounded-full
          text-gray-400
          hover:bg-red-100
          hover:text-red-500
          transition
        "
      >
        ✕
      </button>
    </li>
  )
}