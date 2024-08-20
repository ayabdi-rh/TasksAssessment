import { create } from 'zustand'
import { TaskType } from '../dto/tasks.dto'

interface TaskStoreState {
  selectedTask?: TaskType
  setSelectedTask: (task: TaskType) => void
}

export const useTasksStore = create<TaskStoreState>(set => ({
  selectedTask: undefined,
  setSelectedTask: (task: TaskType) => set({ selectedTask: task })
}))
