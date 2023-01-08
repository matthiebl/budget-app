const BasePage = ({ navigation, content, ...props }) => {
  return (
    <div className='flex min-h-screen w-screen'>
      {navigation}
      <main className='static w-full bg-gradient-to-br from-back-500 to-back-900 text-white'>
        {content || props.children}
      </main>
    </div>
  )
}

export default BasePage
