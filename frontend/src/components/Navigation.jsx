import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RouteData } from '../resources/routes'
import Button from './Button'

const Navigation = () => {
  const [show, setShow] = useState(true)

  return (
    <div
      aria-expanded={show}
      className='top-0 z-20 hidden h-screen w-screen shrink-0 flex-col bg-gradient-to-br from-back-500 to-back-700 text-white shadow-2xl drop-shadow-2xl duration-100 aria-expanded:fixed aria-expanded:flex sm:w-48 aria-expanded:sm:sticky lg:w-52 xl:w-56'
    >
      <div className='flex h-48 w-full items-center justify-center rounded-b-2xl bg-gradient-to-br from-secondary-500 to-secondary-900 drop-shadow-2xl lg:h-52 xl:h-56'>
        <Link to={RouteData.home.path}>
          <h2 className='text-xl underline underline-offset-4'>
            {RouteData.home.text}
          </h2>
        </Link>
      </div>
      <nav className='align-center flex flex-grow flex-col gap-8 p-10'>
        <Button
          link={RouteData.home.path}
          color='bg-gradient-to-br from-alt-500 to-alt-900'
        >
          {RouteData.home.linktext}
        </Button>
        <Button
          link={RouteData.accmain.path}
          color='bg-gradient-to-br from-alt2-500 to-alt2-900'
        >
          {RouteData.accmain.linktext}
        </Button>
        <Button
          link={RouteData.accsaving.path}
          color='bg-gradient-to-br from-alt2-500 to-alt2-900'
        >
          {RouteData.accsaving.linktext}
        </Button>
        <Button
          link={RouteData.income.path}
          color='bg-gradient-to-br from-alt-500 to-alt-900'
        >
          {RouteData.income.linktext}
        </Button>
        <Button
          link={RouteData.expenses.path}
          color='bg-gradient-to-br from-alt-500 to-alt-900'
        >
          {RouteData.expenses.linktext}
        </Button>
        <Button
          link={RouteData.invest.path}
          color='bg-gradient-to-br from-alt-500 to-alt-900'
        >
          {RouteData.invest.linktext}
        </Button>
        <Button
          link={RouteData.add.path}
          color='bg-gradient-to-br from-back-500'
        >
          {RouteData.add.linktext}
        </Button>
      </nav>
    </div>
  )
}

export default Navigation
