import { useEffect, useState } from 'react'
import type { Todo } from './types/todo'
import { TodoInput } from './components/TodaInput'
import { TodoList } from './components/TodoList'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  const [value, setValue] = useState('')

  const addTodo = () => {
    if (!value.trim()) return
    setTodos([...todos, { id: Date.now(), text: value, completed: false }])
    setValue('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">To‑Do List</h1>

        <TodoInput value={value} onChange={setValue} onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
      </div>
    </div>
  )
}
