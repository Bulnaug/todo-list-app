import { useEffect, useState } from 'react'
import type { Todo } from './types/todo'
import { Filter } from './types/filter'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { FilterBar } from './components/FilterBar'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  const [value, setValue] = useState('')
  const [filter, setFilter] = useState<Filter>(Filter.ALL)
  const [darkMode, setDarkMode] = useState(false)

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

  const activeCount = todos.filter(todo => !todo.completed).length

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      darkMode ? 'dark bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <button
        onClick={() => setDarkMode(prev => !prev)}
        className="
          absolute top-4 right-4
          p-2 rounded-full
          bg-gray-200 dark:bg-gray-700
          hover:scale-105 transition
        "
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      <div className="w-full max-w-md
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-100
        rounded-xl shadow-lg p-6"
      >
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
          📝 To-Do List
        </h1>

        <FilterBar
          value={filter}
          onChange={setFilter}
        />

        <hr className="my-4 border-gray-200" />

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
          Tasks left: <span className="font-medium">{activeCount}</span>
        </p>

        <hr className="my-4 border-gray-200" />

        <TodoInput value={value} onChange={setValue} onAdd={addTodo} />
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onRemove={removeTodo} />
      </div>
    </div>
  )
}
