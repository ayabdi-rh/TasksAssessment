import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query'
import { axiosPrivate } from '../../../api'
import { UserSchemaDTO, UserType } from '../dto/user.dto'
import { toast } from 'react-toastify'

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const { data } = await axiosPrivate.get('/auth/me')
        console.log(data)
        return UserSchemaDTO.parse(data)
      } catch (error: any) {
        console.log(error.message)
        throw error
      }
    },
    retry() {
      return false
    }
  }) as UseQueryResult<UserType>
}

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      try {
        const { data } = await axiosPrivate.post('/auth/login', payload)
        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      toast.success('Logged In successfully')
      window.location.href = '/'
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || error.message)
    }
  })
}

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string; firstName: string; lastName: string }) => {
      try {
        const { data } = await axiosPrivate.post('/auth/signup', payload)
        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      toast.success('Logged In successfully')
      window.location.href = '/'
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || error.message)
    }
  })
}

export const useLogOutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axiosPrivate.post('/auth/logout')
        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      toast.success('Logged Out successfully')
      window.location.href = '/'
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || error.message)
    }
  })
}
