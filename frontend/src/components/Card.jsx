const Card = ({ content, background = false, className = '', ...props }) => {
  return (
    <div
      {...props}
      className={
        'w-full rounded-2xl p-8 shadow-2xl drop-shadow-2xl ' +
        (background ? '' : 'bg-gradient-to-br from-back-500 to-back-600 ') +
        className
      }
    >
      {content || props.children}
    </div>
  )
}

export default Card
