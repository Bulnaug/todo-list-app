import { useEffect, useState } from 'react'
import type { Todo } from './types/todo'
import { Filter } from './types/filter'
import { TodoInput } from './components/TodaInput'
import { TodoList } from './components/TodoList'
import { FilterBar } from './components/FilterBar'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  const [value, setValue] = useState('')
  const [filter, setFilter] = useState<Filter>(Filter.ALL)

  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.ACTIVE) return !todo.completed
    if (filter === Filter.COMPLETED) return todo.completed
    return true
  })

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
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          📝 To-Do List
        </h1>

        <FilterBar
          value={filter}
          onChange={setFilter}
        />

        <TodoInput value={value} onChange={setValue} onAdd={addTodo} />
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onRemove={removeTodo} />
      </div>
    </div>
  )
}
