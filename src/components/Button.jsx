import { useNavigate } from 'react-router-dom'

const Button = ({
  text,
  color = 'bg-gradient-to-br from-primary-500 to-primary-900',
  link,
  onClick,
  ...props
}) => {
  const navigate = useNavigate()

  const clickAction = ev => {
    if (onClick) {
      onClick(ev)
    } else if (link) {
      navigate(link)
    }
  }

  return (
    <button
      onClick={clickAction}
      className={
        'h-10 rounded-3xl shadow-2xl duration-100 hover:scale-105 ' + color
      }
    >
      {text || props.children}
    </button>
  )
}

export default Button
