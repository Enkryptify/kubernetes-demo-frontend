import { useDeleteTodo, type Todo } from './api'

export default function TodoItem({ todo }: { todo: Todo }) {
  const deleteTodo = useDeleteTodo()

  return (
    <div className="group flex items-center gap-3 px-4 py-3 border-b border-border last:border-b-0 animate-fade-in">
      <div
        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
          todo.isFinished
            ? 'bg-text-secondary border-text-secondary'
            : 'border-text-tertiary'
        }`}
      />
      <span
        className={`flex-1 text-sm transition-colors ${
          todo.isFinished
            ? 'line-through text-text-tertiary'
            : 'text-text-primary'
        }`}
      >
        {todo.name}
      </span>
      <button
        onClick={() => deleteTodo.mutate(todo.id)}
        disabled={deleteTodo.isPending}
        className="opacity-0 group-hover:opacity-100 text-text-tertiary hover:text-red-400 transition-opacity text-xs cursor-pointer px-1"
      >
        Delete
      </button>
    </div>
  )
}
