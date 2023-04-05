import * as React from 'react'
import type { Message } from '~/utilities'
import clsx from 'clsx'
export function MessageUI(properties: Message) {
  return (
    <div
      className={clsx(
        'm-2 max-w-fit justify-end break-words rounded-3xl py-3 px-2 text-left align-middle text-white',
        properties.from === 'user'
          ? 'place-self-end justify-self-end rounded-br-none bg-blue-500'
          : 'place-self-start justify-self-start rounded-bl-none bg-gray-600'
      )}
      key={properties.timestamp}
    >
      {/*  SHOW THESE ON HOVER
      
      <span className='pl-2 text-xs text-gray-400'>{properties.from}</span>
      <span className='pl-2 text-xs text-gray-400'>{properties.timestamp}</span> */}
      <span className='mx-4 text-lg'>{properties.message}</span>
    </div>
  )
}
