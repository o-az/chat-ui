import z from 'zod'

export const userMessageSchema = z.string().min(1).max(1000)
export type UserMessage = z.infer<typeof userMessageSchema>

export const messageSchema = z.object({
  from: z.union([z.literal('user'), z.literal('bot')]),
  timestamp: z.string(),
  message: z.string(),
})

export type Message = z.infer<typeof messageSchema>
/**
 * {
  "result": {
    "role": "assistant",
    "content": "Hello! How can I assist you today?"
  }
}
 */
export const botResponseSchema = z.object({
  result: z.object({
    role: z.literal('assistant'),
    content: z.string(),
  }),
})

export type BotResponse = z.infer<typeof botResponseSchema>
