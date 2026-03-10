import { useState, type FormEvent } from 'react'
import { useCreateTodo } from './api'

export default function TodoInput() {
  const [name, setName] = useState('')
  const createTodo = useCreateTodo()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    createTodo.mutate(trimmed, {
      onSuccess: () => setName(''),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add a todo..."
        disabled={createTodo.isPending}
        className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-text-tertiary transition-colors"
      />
    </form>
  )
}
