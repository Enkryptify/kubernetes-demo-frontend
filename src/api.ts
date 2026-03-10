import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface Todo {
  id: string
  name: string
  isFinished: boolean
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export function useTodos() {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await api.get('/todo')
      return data
    },
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (name: string) => {
      const { data } = await api.post('/todo', { name })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/todo/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
