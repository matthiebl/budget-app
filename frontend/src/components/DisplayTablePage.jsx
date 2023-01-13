import { useState } from 'react'
import Button from './Button'
import Card from './Card'
import Table from './Table'
import Select from './Select'
import { useEffect } from 'react'
import { useLocalStorage } from '../hooks'

const DisplayTable = ({ loading, data }) => {
  const [view, setView] = useLocalStorage('view', 'Monthly')
  const [date, setDate] = useLocalStorage('date', YEARS_ITEMS.at(-1))

  return (
    <>
      <div className='flex items-center justify-evenly gap-4'>
        {VIEWS.map((v, index) => (
          <Button
            key={index}
            text={v}
            variant='text'
            onClick={() => setView(v)}
            className={view === v ? 'underline' : ''}
          />
        ))}
        <Select
          label='Period:'
          selected={date}
          items={view === 'Weekly' ? CONCAT_YEARS : YEARS_ITEMS}
          onChange={ev => setDate({ label: 'blank', value: ev.target.value })}
          className='w-32 rounded-2xl border border-transparent px-1 focus:border-white'
        />
      </div>
      <div className='flex flex-col gap-10'>
        {!loading &&
          Object.keys(data).map(type => (
            <Card key={type}>
              <Table
                headers={[type, ...headers[view]]}
                rows={formatRows(view, JSON.parse(date.value), data[type])}
              />
            </Card>
          ))}
      </div>
    </>
  )
}

export default DisplayTable

const VIEWS = ['Weekly', 'Monthly', 'Quarterly']
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const currentYear = new Date().getFullYear()
const YEARS = Array.from(Array(currentYear - 2017).keys()).map(n => n + 2018)
const YEARS_ITEMS = YEARS.map(y => ({
  label: y,
  value: JSON.stringify({ m: 0, y: y }),
}))

const CONCAT_YEARS = [].concat(
  ...YEARS.map(y =>
    MONTHS.map((m, mi) => ({
      label: `${m} ${y}`,
      value: JSON.stringify({ m: mi, y: y }),
    }))
  )
)

const currentDate = {
  label: 'blank',
  value: JSON.stringify({ m: new Date().getMonth(), y: currentYear }),
}

const headers = {
  Weekly: ['W1', 'W2', 'W3', 'W4', 'Total'],
  Quarterly: ['Q1', 'Q2', 'Q3', 'Q4', 'Total'],
  Monthly: [...MONTHS, 'Total'],
}
const viewCols = { Weekly: 4, Quarterly: 4, Monthly: 12 }

const formatRow = (view, s, transactions) => {
  let start = new Date(s.y, s.m)
  let end
  let cols = []
  for (let i = 0; i < viewCols[view]; i++) {
    end = new Date(s.y, s.m, 8 + 7 * i)
    if (view === 'Weekly' && i == 3) end = new Date(s.y, s.m + 1)
    if (view === 'Monthly') end = new Date(s.y, i + 1)
    if (view === 'Quarterly') end = new Date(s.y, 3 + i * 3)
    cols.push(
      transactions
        .filter(t => {
          const date = new Date(`${t.date}T12:00`)
          return start <= date && date < end
        })
        .reduce((total, t) => total + t.amount, 0)
    )
    start = end
  }
  cols.push(
    transactions
      .filter(t => {
        const date = new Date(`${t.date}T12:00`)
        return new Date(s.y, s.m) <= date && date < end
      })
      .reduce((total, t) => total + t.amount, 0)
  )
  return cols
}

const formatRows = (view, start, items) =>
  Object.keys(items).map(item => [item, ...formatRow(view, start, items[item])])
