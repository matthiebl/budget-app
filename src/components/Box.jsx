const Box = ({ className, ...props }) => {
  return <div className={'w-full p-8 ' + className}>{props.children}</div>
}

export default Box
