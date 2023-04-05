async function getAllOpenAIModels() {
  const response = await fetch('https://api.openai.com/v1/models', {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  })
  return response.json()
}

export async function getModelNames() {
  const data = await getAllOpenAIModels()
  return data.map(({ id }: { id: string }) => id)
}
