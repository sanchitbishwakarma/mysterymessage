import { z } from "zod"

export const acceptingMessagesSchema = z.object({
    acceptingMessage: z.boolean()
})