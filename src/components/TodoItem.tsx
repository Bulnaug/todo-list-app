import type { Todo } from '../types/todo'

interface Props {
  todo: Todo
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

export function TodoItem({ todo, onToggle, onRemove }: Props) {
  return (
    <li className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={todo.completed ? 'line-through text-gray-400' : ''}>
          {todo.text}
        </span>
      </label>
      <button
        onClick={() => onRemove(todo.id)}
        className="text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </li>
  )
}