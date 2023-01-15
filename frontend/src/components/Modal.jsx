import Card from './Card'
import CloseIcon from './CloseIcon'

const Modal = ({ title, content, isOpen, setIsOpen, ...props }) => {
  return (
    <>
      <Card
        aria-expanded={isOpen}
        className='fixed top-1/4 left-1/4 z-50 h-1/2 w-1/2 scale-0 overflow-y-auto duration-100 aria-expanded:scale-100'
      >
        {title}
        <button
          className='absolute top-7 right-7 rounded-2xl border border-transparent p-1 hover:border-white'
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon />
        </button>

        {content || props.children}
      </Card>
      <div
        aria-expanded={isOpen}
        aria-hidden
        className='fixed top-0 left-0 z-40 hidden h-screen w-screen backdrop-blur-sm duration-100 aria-expanded:block'
        onClick={() => setIsOpen(false)}
      />
    </>
  )
}

export default Modal
