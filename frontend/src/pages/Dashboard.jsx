import Card from '../components/Card'
import SearchIcon from '../components/SearchIcon'
import Navigation from '../components/Navigation'
import BasePage from './Page'
import IconButton from '../components/IconButton'
import { useState } from 'react'
import { getAll } from '../resources/api'
import Modal from '../components/Modal'
import { useEffect } from 'react'
import { height } from '../classes/sizing-spacing'

const Dashboard = () => {
  const [all, setAll] = useState([])

  useEffect(() => {
    const onLoad = async () => {
      const res = await getAll()
      setAll(res)
    }
    onLoad()
  }, [])

  const [modalContent, setModalContent] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const [search, setSearch] = useState('')

  const searchFor = term => {
    if (term === '') return
    const found = all
      .filter(t => t.description.toLowerCase().includes(term.toLowerCase()))
      .sort((t1, t2) => -t1.date.localeCompare(t2.date))
    setModalContent(found)
    setModalOpen(true)
  }

  return (
    <BasePage navigation={<Navigation />}>
      <Modal
        title={<h3 className='mb-2 text-2xl'>{`Results for '${search}'...`}</h3>}
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
      >
        {modalContent.map(item => (
          <div key={crypto.randomUUID()} className='my-2 flex'>
            <p className='w-1/6'>{'$' + item.amount.toFixed(2)}</p>
            <p className='w-8/12 overflow-hidden text-ellipsis whitespace-nowrap'>
              {item.description}
            </p>
            <p className='w-1/6 overflow-hidden text-ellipsis whitespace-nowrap text-right'>
              {item.date}
            </p>
          </div>
        ))}
        {modalContent.length === 0 && <p>No transactions found</p>}
      </Modal>
      <div className='flex h-full w-full gap-10 p-10'>
        <div className='flex h-full flex-grow flex-col gap-8'>
          <h1 className='text-4xl'>Finances Dashboard</h1>
          <div className='flex gap-8'>
            <Card className='py-7'>
              <p className='mb-3'>Income</p>
              {incomeChange(all) === '' ? (
                <p className='text-gray-300'>Missing data for last month</p>
              ) : (
                <>
                  <p className='text-6xl text-primary-500'>{incomeChange(all)}</p>
                  <p className='text-sm text-primary-500'>change since last month</p>
                </>
              )}
            </Card>
            <Card className='py-7'>
              <p className='mb-3'>Expenses</p>
              {expenseChange(all) === '' ? (
                <p className='text-gray-300'>Missing data for last month</p>
              ) : (
                <>
                  <p className='text-6xl text-alt-500'>{expenseChange(all)}</p>
                  <p className='text-sm text-alt-500'>change since last month</p>
                </>
              )}
            </Card>
          </div>
          <IncomeExpenseGraph transactions={all} rule='flex xl:hidden' months={2} />
          <IncomeExpenseGraph transactions={all} rule='hidden xl:flex 2xl:hidden' months={3} />
          <IncomeExpenseGraph transactions={all} rule='hidden 2xl:flex 3xl:hidden' months={4} />
          <IncomeExpenseGraph transactions={all} rule='hidden 3xl:flex 4xl:hidden' months={5} />
          <IncomeExpenseGraph transactions={all} rule='hidden 4xl:flex 5xl:hidden' months={6} />
          <IncomeExpenseGraph transactions={all} rule='hidden 5xl:flex' months={7} />
        </div>

        <div className='flex h-full w-80 flex-col gap-8'>
          <Card className='flex-grow'></Card>
          <Card></Card>
          <Card className='flex-grow'></Card>
          <Card className='flex gap-2 py-4 px-4'>
            <input
              type='text'
              placeholder='Search transactions'
              value={search}
              onChange={ev => setSearch(ev.target.value)}
              className='flex-grow rounded-2xl border border-transparent bg-transparent p-2 px-3 outline-0 focus:border-white'
            />
            <IconButton icon={<SearchIcon />} onClick={() => searchFor(search)} className='p-2' />
          </Card>
        </div>
      </div>
    </BasePage>
  )
}

export default Dashboard

const IncomeExpenseGraph = ({ transactions, rule, months = 3 }) => {
  return (
    <Card
      className={'flex-grow gap-6 bg-gradient-to-br from-secondary-500 to-primary-900 ' + rule}
      background
    >
      {getPreviousData(transactions, months).map(month => (
        <div
          key={crypto.randomUUID()}
          className='flex h-full w-full cursor-default flex-col items-center gap-3'
        >
          <div className='flex w-full flex-grow items-end justify-center gap-2'>
            <div className={`${month.incomeH} group flex w-20 justify-center rounded-md bg-white`}>
              <div className='absolute z-50 h-fit scale-0 rounded-md bg-white p-2 py-0.5 text-back-500 duration-100 group-hover:-translate-y-9 group-hover:scale-100'>
                {`$${month.income}`}
              </div>
              <div className='absolute z-40 h-5 w-5 rotate-45 scale-0 rounded-sm bg-white duration-100 group-hover:-translate-y-[26px] group-hover:scale-100' />
            </div>
            <div className={`${month.expenseH} group flex w-20 justify-center rounded-md bg-white`}>
              <div className='absolute z-50 h-fit scale-0 rounded-md bg-white p-2 py-0.5 text-back-500 duration-100 group-hover:-translate-y-9 group-hover:scale-100'>
                {`-$${month.expense}`}
              </div>
              <div className='absolute z-40 h-5 w-5 rotate-45 scale-0 rounded-sm bg-white duration-100 group-hover:-translate-y-[26px] group-hover:scale-100' />
            </div>
          </div>
          <div className='group flex justify-center'>
            <p className='px-2'>{month.month}</p>
            <div className='absolute z-50 h-fit scale-0 rounded-md bg-white p-2 py-0.5 text-back-500 duration-100 group-hover:translate-y-8 group-hover:scale-100'>
              {(month.income - month.expense < 0 ? '-' : '') +
                `$${Math.abs(month.income - month.expense)}`}
            </div>
            <div className='absolute z-40 h-5 w-5 rotate-45 scale-0 rounded-sm bg-white duration-100 group-hover:translate-y-[30px] group-hover:scale-100' />
          </div>
        </div>
      ))}
    </Card>
  )
}

const incomeChange = all => {
  const data = getPreviousData(all, 2)
  if (parseFloat(data[1].income) === 0 || parseFloat(data[0].income) === 0) return ''
  return `${(((data[1].income - data[0].income) / data[0].income) * 100).toFixed()}%`
}

const expenseChange = all => {
  const data = getPreviousData(all, 2)
  if (parseFloat(data[1].expense) === 0 || parseFloat(data[0].expense) === 0) return ''
  return `${(((data[1].expense - data[0].expense) / data[0].expense) * 100).toFixed()}%`
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const getPreviousData = (transactions, amount) => {
  let dates = []
  const current = new Date()
  for (let i = 1; i < amount + 1; i++)
    dates.push(new Date(current.getFullYear(), current.getMonth() - i, 1))
  dates.reverse()

  const income = date =>
    sum(
      transactionsInMonth(transactions, date, t => t.category === 'income'),
      t => t.amount
    )
  const expense = date =>
    sum(
      transactionsInMonth(transactions, date, t => t.category !== 'income'),
      t => t.amount
    )

  let incomeExpenses = dates.map(date => ({
    month: MONTHS[date.getMonth()],
    income: Math.abs(income(date)).toFixed(2),
    expense: Math.abs(expense(date)).toFixed(2),
  }))
  const max = incomeExpenses.reduce((m, ie) => Math.max(m, ie.income, ie.expense), 0)

  return incomeExpenses.map(ie => ({
    ...ie,
    incomeH: height[((ie.income / max) * 100).toFixed()],
    expenseH: height[((ie.expense / max) * 100).toFixed()],
  }))
}

const transactionsInMonth = (transactions, date, filterTest = _ => true) => {
  const correctedMonth = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)
  const reg = new RegExp(`^${date.getFullYear()}-${correctedMonth}-`)
  return transactions.filter(t => reg.test(t.date) && filterTest(t))
}

const sum = (arr, valueOf = i => i, start = 0) => {
  return arr.reduce((total, a) => total + valueOf(a), start)
}
