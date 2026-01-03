import type { Todo } from '../types/todo'
import { TodoItem } from './TodoItem'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  todos: Todo[]
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

export function TodoList({ todos, onToggle, onRemove }: Props) {

  return (
    <motion.ul
      layout
      className="space-y-2 mt-4"
    >
      <AnimatePresence>
      {todos.map(todo => (
        
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
      </AnimatePresence>
    </motion.ul>
  )
}