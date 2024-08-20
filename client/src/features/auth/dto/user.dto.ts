import { z } from 'zod'

export const UserSchemaDTO = z.object({
    id: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

export type UserType = z.infer<typeof UserSchemaDTO>