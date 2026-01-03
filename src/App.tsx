import { useEffect, useState } from 'react'
import type { Todo } from './types/todo'
import { Filter } from './types/filter'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { FilterBar } from './components/FilterBar'
import { motion } from 'framer-motion'
import { supabase } from './lib/supabase'

type Theme = 'light' | 'dark'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) return saved

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const [value, setValue] = useState('')
  const [filter, setFilter] = useState<Filter>(Filter.ALL)

  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.ACTIVE) return !todo.completed
    if (filter === Filter.COMPLETED) return todo.completed
    return true
  })

  useEffect(() => {
    const loadTodos = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setTodos(data)
      }
    }

    loadTodos()
  }, [])

  const addTodo = async () => {
    if (!text.trim()) return

    const { data, error } = await supabase
      .from('todos')
      .insert([{ text, completed: false }])
      .select()
      .single()

    if (!error && data) {
      setTodos(prev => [data, ...prev])
      setText('')
    }
  }

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return

    const { error } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', id)

    if (!error) {
      setTodos(prev =>
        prev.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      )
    }
  }

  const removeTodo = async (id: number) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (!error) {
      setTodos(prev => prev.filter(t => t.id !== id))
    }
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const activeCount = todos.filter(todo => !todo.completed).length

  const TaskCount = () => {
    if (todos.length === 0) {
      return (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 dark:text-gray-500 mt-6"
        >
          No Tasks ✨
        </motion.p>
      )
    } else {
      return (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 dark:text-gray-500 mt-6"
        >
          Tasks left: <span className="font-medium">{activeCount}</span>
        </motion.p>
      )
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <button
        onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        className="
          absolute top-4 right-4
          p-2 rounded-full
          bg-gray-200 dark:bg-gray-700
          hover:scale-105 transition
        "
      >
        {theme === 'dark' ? '☀️' : '🌙'}
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
          <TaskCount />
        </p>

        <hr className="my-4 border-gray-200" />

        <TodoInput value={text} onChange={setText} onAdd={addTodo} />
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onRemove={removeTodo} />
      </div>
    </div>
  )
}
