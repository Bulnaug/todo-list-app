import type { Todo } from '../types/todo'
import { TodoItem } from './TodoItem'

interface Props {
  todos: Todo[]
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

export function TodoList({ todos, onToggle, onRemove }: Props) {

  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-400 dark:text-gray-500 mt-6">
        No Tasks ✨
      </p>
    )
  }

  return (
    <ul className="space-y-2 mt-4">
      {todos.map(todo => (
        
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}