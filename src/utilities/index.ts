export * from './schema'

export const numberToBearEmoji = (number: number) => '🐻'.repeat(number)

export const randomNumberBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export const getTimestamp = () => new Date().toISOString()

export const humanDatetime = () =>
  Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())
