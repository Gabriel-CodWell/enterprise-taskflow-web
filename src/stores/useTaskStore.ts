import { create } from 'zustand'
import api from '@/services/api'
import type { TaskItem, CreateTaskRequest } from '@/types'

// ── Task State Interface ──────────────────────────────────────────────

interface TaskState {
  tasks: TaskItem[]
  isLoading: boolean
  error: string | null

  fetchPendingTasks: () => Promise<void>
  createTask: (data: CreateTaskRequest) => Promise<boolean>
  completeTask: (id: string) => Promise<boolean>
}

// ── Task Store ────────────────────────────────────────────────────────

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchPendingTasks: async () => {
    set({ isLoading: true, error: null })

    try {
      const { data } = await api.get<TaskItem[]>('/tasks/pending')
      set({ tasks: data, isLoading: false })
    } catch {
      set({ error: 'Failed to fetch tasks.', isLoading: false })
    }
  },

  createTask: async (payload: CreateTaskRequest) => {
    try {
      await api.post('/tasks', payload)
      // Refresh task list after creation
      await get().fetchPendingTasks()
      return true
    } catch {
      set({ error: 'Failed to create task.' })
      return false
    }
  },

  completeTask: async (id: string) => {
    try {
      await api.post(`/tasks/${id}/complete`)
      // Remove from local state immediately for snappy UX
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }))
      return true
    } catch {
      set({ error: 'Failed to complete task.' })
      return false
    }
  },
}))
