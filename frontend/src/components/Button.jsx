import { useNavigate } from 'react-router-dom'

const Button = ({
  variant = 'solid',
  text,
  color,
  className = '',
  link,
  onClick,
  disabled = false,
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
        'rounded-3xl p-3 px-4 text-sm shadow-2xl duration-100 hover:scale-105 disabled:text-gray-300 disabled:hover:scale-100 ' +
        (color ? color : variantDefaults[variant].color) +
        variantDefaults[variant].style +
        className
      }
      disabled={disabled}
    >
      {text || props.children}
    </button>
  )
}

export default Button

const variantDefaults = {
  solid: {
    color: ' bg-gradient-to-br from-primary-500 to-primary-900 ',
    style: ' disabled:from-gray-400 disabled:to-gray-600 ',
  },
  outlined: {
    color: ' border-primary-500 hover:bg-primary-500 ',
    style: ' border-2 disabled:border-gray-500 disabled:bg-transparent ',
  },
  text: {
    color: ' ',
    style: ' hover:underline underline-offset-4 ',
  },
}
