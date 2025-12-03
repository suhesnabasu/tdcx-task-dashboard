import { useCallback, useEffect, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'
import { TASKS_STORAGE_KEY } from '../utils/constants'
import { readFromStorage, writeToStorage } from '../utils/storage'
import type { Task, TaskDraft, TaskStatus } from '../types/task'

interface UseTasksResult {
  tasks: Task[]
  isLoading: boolean
  addTask: (draft: TaskDraft) => void
  updateTask: (id: string, draft: TaskDraft) => void
  toggleCompletion: (id: string) => void
  deleteTask: (id: string) => void
  stats: {
    total: number
    completed: number
    pending: number
    completionRate: number
  }
}

export const useTasks = (): UseTasksResult => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedTasks = readFromStorage<Task[]>(TASKS_STORAGE_KEY, [])
    setTasks(savedTasks)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      writeToStorage(TASKS_STORAGE_KEY, tasks)
    }
  }, [tasks, isLoading])

  const addTask = useCallback((draft: TaskDraft) => {
    setTasks((current) => [
      {
        id: nanoid(),
        name: draft.name,
        description: draft.description,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dueDate: draft.dueDate
      },
      ...current
    ])
  }, [])

  const updateTask = useCallback((id: string, draft: TaskDraft) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              ...draft,
              updatedAt: new Date().toISOString()
            }
          : task
      )
    )
  }, [])

  const toggleCompletion = useCallback((id: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status: (task.status === 'completed'
                ? 'pending'
                : 'completed') as TaskStatus,
              updatedAt: new Date().toISOString()
            }
          : task
      )
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id))
  }, [])

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.status === 'completed').length
    const pending = total - completed
    const completionRate = total ? Math.round((completed / total) * 100) : 0
    return { total, completed, pending, completionRate }
  }, [tasks])

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    toggleCompletion,
    deleteTask,
    stats
  }
}

