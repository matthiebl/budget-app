const IconButton = ({ icon, onClick = () => {}, className, ...props }) => {
  return (
    <button
      className={
        'rounded-3xl border border-transparent p-1 hover:border-white ' +
        className
      }
      onClick={onClick}
    >
      {icon || props.children}
    </button>
  )
}

export default IconButton
