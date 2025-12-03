export type TaskStatus = 'pending' | 'completed'

export interface Task {
  id: string
  name: string
  description?: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
  dueDate?: string
}

export interface TaskDraft {
  name: string
  description?: string
  dueDate?: string
}

