import { z } from 'zod'

export const TaskStatusEnum = z.enum(['BACKLOG', 'TODO', 'IN_PROGRESS', 'COMPLETE'])
export const TasksSchemaDTO = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish().default(''),
  status: TaskStatusEnum
})

export const CreateTaskSchema = z.object({
  name: z.string(),
  status: TaskStatusEnum.default('BACKLOG')
})

export type TaskType = z.infer<typeof TasksSchemaDTO>
export type TaskStatus = z.infer<typeof TaskStatusEnum>
export type CreateTask = z.infer<typeof CreateTaskSchema>
