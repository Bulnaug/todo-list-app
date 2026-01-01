import { useState } from 'react'


type Todo = {
id: number
text: string
completed: boolean
}


export default function App() {
const [todos, setTodos] = useState<Todo[]>([])
const [value, setValue] = useState('')


const addTodo = () => {
if (!value.trim()) return
setTodos([
...todos,
{ id: Date.now(), text: value, completed: false },
])
setValue('')
}


const toggleTodo = (id: number) => {
setTodos(
todos.map(todo =>
todo.id === id
? { ...todo, completed: !todo.completed }
: todo
)
)
}


const removeTodo = (id: number) => {
setTodos(todos.filter(todo => todo.id !== id))
}


return (
<div className="min-h-screen bg-gray-100 flex items-center justify-center">
<div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
<h1 className="text-2xl font-semibold mb-4 text-center">To‑Do List</h1>


<div className="flex gap-2 mb-4">
<input
value={value}
onChange={e => setValue(e.target.value)}
onKeyDown={e => e.key === 'Enter' && addTodo()}
className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
placeholder="new Todo"
/>
<button
onClick={addTodo}
className="bg-black text-white px-4 rounded hover:bg-gray-800"
>
+
</button>
</div>


<ul className="space-y-2">
{todos.map(todo => (
<li
key={todo.id}
className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
>
<label className="flex items-center gap-2 cursor-pointer">
<input
type="checkbox"
checked={todo.completed}
onChange={() => toggleTodo(todo.id)}
/>
<span
className={todo.completed ? 'line-through text-gray-400' : ''}
>
{todo.text}
</span>
</label>
<button
onClick={() => removeTodo(todo.id)}
className="text-red-500 hover:text-red-700"
>
✕
</button>
</li>
))}
</ul>
</div>
</div>
)
}