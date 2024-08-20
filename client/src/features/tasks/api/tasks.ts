import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { axiosPrivate } from '../../../api'
import { CreateTask, TasksSchemaDTO, TaskType } from '../dto/tasks.dto'
import { toast } from 'react-toastify'

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      try {
        const { data } = await axiosPrivate.get('/task')
        return data.map((d: any) => TasksSchemaDTO.parse(d))
      } catch (error: any) {
        throw error
      }
    }
  }) as UseQueryResult<TaskType[]>
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreateTask) => {
      try {
        const { data } = await axiosPrivate.post('/task', body)
        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      toast.success('Task successfully created')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (error: any) => {
      toast.error(error.response.data)
    }
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: Partial<CreateTask> }) => {
      try {
        const { data } = await axiosPrivate.patch(`/task/${id}`, body)
        return TasksSchemaDTO.parse(data)
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      toast.success('Task successfully updated')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (error: any) => {
      toast.error(error.response.data)
    }
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const { data } = await axiosPrivate.delete(`/task/${id}`)
        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      toast.success('Task successfully deleted')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (error: any) => {
      toast.error(error.response.data)
    }
  })
}
