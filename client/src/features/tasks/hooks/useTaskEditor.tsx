import { useState, useEffect } from 'react'
import { useTasksStore } from '../store/useTasksStore'
import { useCreateTask, useUpdateTask } from '../api/tasks'

export const useTaskEditor = () => {
  const { mutate: createTask, isPending: isCreating } = useCreateTask()
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask()

  const { editorState, resetEditorState } = useTasksStore()
  const initialState = {
    name: editorState.selectedTask?.name || '',
    description: editorState.selectedTask?.description || '',
    status: editorState.selectedTask?.status || editorState.status || 'BACKLOG'
  }
  const [formData, setFormData] = useState(initialState)

  const handleChange = (e: { name: string; value: string }) => {
    const { name, value } = e
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const close = () => {
    resetEditorState()
  }

  useEffect(() => {
    if (editorState.selectedTask || editorState.status) {
      setFormData(initialState)
    }
  }, [editorState.selectedTask, editorState.status])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const onSuccess = () => close()

    if (!!editorState.selectedTask)
      return updateTask({ id: editorState.selectedTask.id, body: formData }, { onSuccess })
    createTask(formData, { onSuccess })
  }

  return {
    selectedTask: editorState.selectedTask,
    formData,
    isOpen: editorState.isOpen,
    handleChange,
    close,
    onSubmit,
    loading: isUpdating || isCreating
  }
}
