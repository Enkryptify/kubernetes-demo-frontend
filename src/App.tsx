import { useTodos } from './api'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'

function App() {
  const { data: todos, isLoading, isError, refetch } = useTodos()

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-text-primary mb-8">
          Todos
        </h1>

        <TodoInput />

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          {isLoading && (
            <div className="divide-y divide-border">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-4 h-4 rounded-full bg-surface animate-pulse" />
                  <div className="h-4 rounded bg-surface animate-pulse w-2/3" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="px-4 py-8 text-center">
              <p className="text-text-secondary text-sm mb-3">
                Failed to load todos
              </p>
              <button
                onClick={() => refetch()}
                className="text-sm text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {!isLoading && !isError && todos?.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-text-tertiary text-sm">No todos yet</p>
            </div>
          )}

          {todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
