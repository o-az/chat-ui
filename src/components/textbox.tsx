import clsx from 'clsx'

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
