import { useEffect } from 'react'
import { useTasksStore } from '../store/useTasksStore'
import { useCreateTask, useDeleteTask, useUpdateTask } from '../api/tasks'

export const useTaskEditor = () => {
  const { mutate: createTask, isPending: isCreating } = useCreateTask()
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask()
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask()
  const { editorState, resetEditorState, setEditorState } = useTasksStore()

  const initialState = {
    name: editorState.selectedTask?.name || '',
    description: editorState.selectedTask?.description || '',
    status: editorState.selectedTask?.status || editorState.status || 'BACKLOG'
  }

  const handleChange = (e: { name: string; value: string }) => {
    const { name, value } = e
    setEditorState({
      formData: {
        ...editorState.formData,
        [name]: value
      }
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const onSuccess = () => resetEditorState()
    const formData = editorState.formData

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
        resetEditorState()
      }
    })
  }

  // Set Initial Form State
  useEffect(() => {
    if (editorState.selectedTask || editorState.status) {
      setEditorState({
        formData: initialState
      })
    }
  }, [editorState.selectedTask, editorState.status])

  return {
    selectedTask: editorState.selectedTask,
    formData: editorState.formData,
    isOpen: editorState.isOpen,
    handleChange,
    close: resetEditorState,
    onSubmit,
    onDelete,
    loading: isUpdating || isCreating,
    isDeleting,
    setDeleteModalOpen: (bool: boolean) => setEditorState({ deleteModalOpen: bool }),
    deleteModalOpen: editorState.deleteModalOpen
  }
}
