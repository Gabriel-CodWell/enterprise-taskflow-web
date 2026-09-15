// ── Authentication Types ──────────────────────────────────────────────

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

// ── Task Types ────────────────────────────────────────────────────────

export const TaskStatus = {
  Pending: 0,
  InProgress: 1,
  Completed: 2,
  Cancelled: 3,
} as const

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]

export interface TaskItem {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  createdAt: string
  updatedAt: string | null
}

export interface CreateTaskRequest {
  title: string
  description?: string
}
