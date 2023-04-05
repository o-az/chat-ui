export function Button(properties: JSX.IntrinsicElements['button']) {
  return (
    <button
      {...properties}
      className={`flex place-content-center rounded-md border-2 border-gray-200 bg-teal-800
			p-2 drop-shadow-xl hover:border-red-100 hover:underline hover:decoration-sky-600`}
    >
      <span className='font-semibold text-white antialiased'>{properties.value}</span>
    </button>
  )
}
