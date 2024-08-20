import { useEffect } from 'react'
import { useTasksStore } from '../store/useTasksStore'
import { useCreateTask, useDeleteTask, useUpdateTask } from '../api/tasks'

export const useTaskEditor = () => {
  const { mutate: createTask, isPending: isCreating } = useCreateTask()
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask()
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask()
  const { editorState, resetEditorState, resetFormData, setEditorState, setFormData, formData } =
    useTasksStore()

  const handleChange = (e: { name: string; value: string }) => {
    const { name, value } = e
    setFormData({ [name]: value })
  }

  const close = () => {
    resetEditorState()
    resetFormData()
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const onSuccess = () => close()

    if (!!editorState.selectedTask) {
      updateTask({ id: editorState.selectedTask.id, body: formData }, { onSuccess })
    } else {
      createTask(formData, { onSuccess })
    }
  }

  const onDelete = () => {
    const taskId = editorState.selectedTask?.id
    if (!taskId) return
    deleteTask(taskId, {
      onSuccess: () => {
        close()
      }
    })
  }

  // Set Initial Form State
  useEffect(() => {
    if (!editorState) return

    const { selectedTask, status } = editorState
    if (editorState || status) {
      setFormData({
        name: selectedTask?.name || '',
        status: selectedTask?.status || status,
        description: selectedTask?.description || ''
      })
    }
  }, [editorState.selectedTask, editorState.status])

  return {
    selectedTask: editorState.selectedTask,
    formData,
    isOpen: editorState.isOpen,
    handleChange,
    close,
    onSubmit,
    onDelete,
    loading: isUpdating || isCreating,
    isDeleting,
    setDeleteModalOpen: (bool: boolean) => setEditorState({ deleteModalOpen: bool }),
    deleteModalOpen: editorState.deleteModalOpen
  }
}
