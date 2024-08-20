import { create } from 'zustand'
import { TaskStatus, TaskType } from '../../../dto/tasks.dto'

interface EditorState {
  isOpen: boolean
  status?: TaskStatus
  selectedTask?: TaskType
  formData: any // Replace 'any' with the actual type of formData
  deleteModalOpen: boolean
}

interface TaskStoreState {
  editorState: EditorState
  setEditorState: (state: Partial<EditorState>) => void
  resetEditorState: () => void
}

const initialEditorState: EditorState = {
  isOpen: false,
  selectedTask: undefined,
  formData: {}, // Replace with the initial state of formData
  deleteModalOpen: false
}

export const useTasksStore = create<TaskStoreState>(set => ({
  editorState: initialEditorState,
  setEditorState: (state: Partial<EditorState>) => 
    set(prev => ({ editorState: { ...prev.editorState, ...state } })),
  resetEditorState: () => set({ editorState: initialEditorState })
}))