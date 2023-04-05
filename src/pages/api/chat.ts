import type { NextApiRequest, NextApiResponse } from 'next'
import { type ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'
import { userMessageSchema } from '~/utilities'

const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openAIClient = new OpenAIApi(configuration)

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method Not Allowed' })

  const requestBody = JSON.parse(request.body)
  const message = userMessageSchema.parse(requestBody.message)
  console.log({ message })

  const completion = await openAIClient.createChatCompletion({
    model: OPENAI_MODEL,
    messages: [
      // {
      //   role: 'system',
      //   content: 'Hello! How are you?',
      // },
      { role: 'user', content: message },
    ],
  })

  response.status(200).json({ result: completion.data.choices[0].message })
}
