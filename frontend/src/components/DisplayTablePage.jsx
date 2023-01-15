import { useState } from 'react'
import { useLocalStorage } from '../resources/hooks'
import Button from './Button'
import Select from './Select'
import Modal from './Modal'
import Table from './Table'
import Card from './Card'

const DisplayTable = ({ loading, data, flipTableSign = false }) => {
  const [view, setView] = useLocalStorage('view', 'Monthly')
  const [date, setDate] = useLocalStorage('date', YEARS_ITEMS.at(-1))

  const [selected, setSelected] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Modal
        title={<h3 className='mb-2 text-2xl'>Transactions</h3>}
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
      >
        {selected.map(item => (
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
      </Modal>

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
          onChange={ev => {
            setDate({
              label: ev.target[ev.target.selectedIndex].innerText,
              value: ev.target.value,
            })
          }}
          className='w-32 rounded-2xl border border-transparent px-1 focus:border-white'
        />
      </div>

      <div className='flex flex-col gap-10'>
        {!loading &&
          Object.keys(data).map(type => (
            <Card key={type}>
              <Table
                headers={
                  view === 'Monthly' && date.label.includes('FY')
                    ? [
                        type,
                        ...headers[view].slice(6, 12),
                        ...headers[view].slice(0, 6),
                        'Total',
                      ]
                    : [type, ...headers[view]]
                }
                rows={formatRows(view, JSON.parse(date.value), data[type])}
                tooltips
                onClickToolTip={(ev, values) => {
                  setSelected(values)
                  setModalOpen(true)
                }}
                flipSign={flipTableSign}
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
const YEARS_ITEMS = [].concat(
  ...YEARS.map(y => [
    {
      label: `FY ${y}`,
      value: JSON.stringify({ m: 6, y: y - 1 }),
    },
    {
      label: y,
      value: JSON.stringify({ m: 0, y: y }),
    },
  ])
)

const CONCAT_YEARS = [].concat(
  ...YEARS.map(y =>
    MONTHS.map((m, mi) => ({
      label: `${m} ${y}`,
      value: JSON.stringify({ m: mi, y: y }),
    }))
  )
)

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
    if (view === 'Monthly') end = new Date(s.y, s.m + i + 1)
    if (view === 'Quarterly') end = new Date(s.y, s.m + 3 + i * 3)
    cols.push(
      transactions.filter(t => {
        const date = new Date(`${t.date}T12:00`)
        return start <= date && date < end
      })
    )
    start = end
  }
  cols.push(
    transactions.filter(t => {
      const date = new Date(`${t.date}T12:00`)
      return new Date(s.y, s.m) <= date && date < end
    })
  )
  return cols
}

const formatRows = (view, start, items) =>
  Object.keys(items).map(item => [item, ...formatRow(view, start, items[item])])
