import { create } from 'zustand'
import { CreateTask, TaskStatus, TaskType } from '../../../dto/tasks.dto'

interface EditorState {
  isOpen: boolean
  status?: TaskStatus
  selectedTask?: TaskType | null
  deleteModalOpen: boolean
}
interface TaskStoreState {
  editorState: EditorState
  formData: CreateTask
  setEditorState: (state: Partial<EditorState>) => void
  setFormData: (data: Partial<CreateTask>) => void
  resetEditorState: () => void
  resetFormData: () => void
}

const initialEditorState: EditorState = {
  isOpen: false,
  selectedTask: null,
  deleteModalOpen: false
}

const initialFormData: CreateTask = {
  name: '',
  description: '',
  status: 'BACKLOG'
}

export const useTasksStore = create<TaskStoreState>(set => ({
  editorState: initialEditorState,
  formData: initialFormData,
  setEditorState: (state: Partial<EditorState>) =>
    set(prev => ({ editorState: { ...prev.editorState, ...state } })),
  setFormData: (data: Partial<any>) => set(prev => ({ formData: { ...prev.formData, ...data } })),
  resetEditorState: () => set(prev => ({ editorState: { ...prev.editorState, ...initialEditorState } })),
  resetFormData: () => set({ formData: initialFormData })
}))
