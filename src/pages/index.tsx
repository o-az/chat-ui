import * as React from 'react'
import Head from 'next/head'
import { type Message, getTimestamp, botResponseSchema, humanDatetime } from '~/utilities'
import { MessageUI } from '~/components'
import { useKeyPress } from '~/hooks'
import { CodeBlock, CopyBlock, dracula } from 'react-code-blocks'
import { Inter, JetBrains_Mono } from 'next/font/google'
import clsx from 'clsx'
import { HeroiconsOutlineAdjustmentsVertical, HeroiconsOutlineArrowSmUp } from '~/components/icons'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
// const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap' })
// const replaceFavicon = (bearCount: number) => {
//   const linkTag = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]')
//   let href = linkTag?.getAttribute('href')
//   href = bearCount > 0 ? href?.replace('💀', '🐻') : href?.replace('🐻', '💀')
//   linkTag?.setAttribute('href', href ?? '')
// }
const codeSnippet = `
import { CodeBlock, dracula } from "react-code-blocks";

function MyCoolCodeBlock({ code, language, showLineNumbers, startingLineNumber }) {
  return (
    <CodeBlock
      text={code}
      language={language}
      showLineNumbers={showLineNumbers}
      startingLineNumber={startingLineNumber}
      theme={dracula}
    />
  );
}`
export async function chatRequest(message: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  })
  const data = botResponseSchema.parse(await response.json())
  return data.result.content
}

export function TextArea(properties: {
  setState: React.Dispatch<React.SetStateAction<string>>
  onSubmit: (event: React.MouseEvent<Element, MouseEvent>) => void
}) {
  return (
    <span
      className={clsx(
        // custom CSS from `src/styles/index.css`
        'textarea',
        'min-h-9 max-h-84 h-auto',
        'ml-1 mr-2.5 rounded-2xl border-2 px-4 py-2 pt-1.5 text-lg',
        'border-neutral-500 text-gray-50 outline-none'
      )}
      role='textbox'
      contentEditable={true}
      onInput={event => properties.setState(event.currentTarget.textContent ?? '')}
      onKeyDown={event => {
        if (event.shiftKey && event.key === 'Enter') return
        if (event.key === 'Enter') {
          properties.onSubmit(event as unknown as React.MouseEvent<HTMLButtonElement>)
          Object.assign(event.currentTarget, { innerHTML: '', textContent: '' })
          properties.setState('')
        }
      }}
    />
  )
}

export default function IndexPage() {
  // const keyboardClick = useKeyPress('Enter')
  // console.log(keyboardClick)
  // console.log(keyboardClick)
  const [message, setMessage] = React.useState<string>('')
  const [messages, setMessages] = React.useState<Array<JSX.Element>>([
    <MessageUI
      from='bot'
      message='Hello, I am a bot. How can I help you?'
      timestamp={getTimestamp()}
      key={0}
    />,
  ])
  const updateChat = (message: Message) => {
    const messageComponent = (
      <MessageUI
        {...message}
        key={messages.length}
      />
    )
    setMessages(messages => [...messages, messageComponent])
  }

  /**
   * Update chat UI
   * Send message to API
   * Update chat UI with response
   */
  const chatEventHandler = async (event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
    event.preventDefault()
    if (!message) return
    // Update chat UI
    updateChat({ from: 'user', message, timestamp: getTimestamp() })
    // Send message to API
    const responseMessage = await chatRequest(message)
    // Update chat UI with response
    updateChat({
      from: 'bot',
      message: responseMessage,
      timestamp: getTimestamp(),
    })
  }

  return (
    <>
      <Head>
        <title>🫠</title>
      </Head>
      <main
        className={clsx(
          'max-w-96 flex h-full w-[36rem] flex-col place-content-start items-center p-2 subpixel-antialiased',
          inter.className
        )}
      >
        <p className='text-sm font-bold text-gray-200 antialiased'>{humanDatetime()}</p>
        <section className='mb-3 flex w-full flex-col items-center'>
          {messages.map((message, index) => (
            <div
              key={`${index}`}
              className={clsx('flex w-full', message.props.from === 'bot' ? 'justify-start' : 'justify-end')}
            >
              {message}
            </div>
          ))}
        </section>
        <form className='flex h-full w-full min-w-full flex-row items-end pb-3'>
          <button
            // TODO: Add menu
            onClick={event => {
              event.preventDefault()
              console.log('clicked')
            }}
          >
            <HeroiconsOutlineAdjustmentsVertical
              className={clsx('mb-[0.25] h-10 w-10 text-slate-300 hover:text-slate-50 active:text-blue-400')}
            />
          </button>
          <TextArea
            setState={setMessage}
            onSubmit={event => {
              if (!message) return
              chatEventHandler(event)
            }}
          />
          <button
            onClick={chatEventHandler}
            disabled={!message}
          >
            <HeroiconsOutlineArrowSmUp
              className={clsx(
                'mb-0.5 h-9 w-9 rounded-full',
                message?.length
                  ? 'bg-blue-500 text-gray-200 hover:bg-blue-600 active:bg-blue-500'
                  : 'bg-gray-500 text-gray-900'
              )}
            />
          </button>
        </form>
      </main>
    </>
  )
}
