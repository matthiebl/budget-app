import { useNavigate } from 'react-router-dom'

const Button = ({
  variant = 'solid',
  text,
  color,
  className = '',
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
        'rounded-3xl p-3 px-4 text-sm shadow-2xl duration-100 ' +
        variantDefaults[variant].style +
        (color ? color : variantDefaults[variant].color) +
        className
      }
    >
      {text || props.children}
    </button>
  )
}

export default Button

const variantDefaults = {
  solid: {
    color: ' bg-gradient-to-br from-primary-500 to-primary-900 ',
    style: ' hover:scale-105 ',
  },
  outlined: {
    color: ' border-primary-500 hover:bg-primary-500 ',
    style: ' border-2 hover:scale-110 ',
  },
  text: {
    color: ' ',
    style: ' hover:underline underline-offset-4 ',
  },
}
