import { useState } from 'react'

const Table = ({
  headers,
  rows,
  flipSign = false,
  tooltips = false,
  onClickToolTip = () => {},
}) => {
  return (
    <div className='flex flex-col overflow-x-auto'>
      <h2 className='text-2xl'>
        {headers[0][0].toUpperCase() + headers[0].slice(1)}
      </h2>
      <div className='flex items-end'>
        <h2 className='w-1/12 text-2xl' />
        {headers.slice(1).map(col => (
          <p key={crypto.randomUUID()} className='flex-1 text-right'>
            {col}
          </p>
        ))}
      </div>
      {rows.map(row => (
        <div key={crypto.randomUUID()} className='flex items-end'>
          <p className='w-1/12'>{row[0][0].toUpperCase() + row[0].slice(1)}</p>
          {row.slice(1).map(col => {
            const sum = col.reduce((total, t) => total + t.amount, 0)
            return (
              <div
                key={crypto.randomUUID()}
                className='group flex flex-1 cursor-default justify-end text-sm'
              >
                <p
                  className={
                    'text-right italic ' +
                    (sum * (flipSign ? -1 : 1) === 0 ? 'text-gray-500' : '') +
                    (sum * (flipSign ? -1 : 1) < 0 ? 'text-alt-500' : '') +
                    (sum * (flipSign ? -1 : 1) < -500 ? 'text-alt-900' : '')
                  }
                >
                  {`$${(sum * (flipSign ? -1 : 1)).toFixed(2)}`}
                </p>
                {col.length > 0 && tooltips && (
                  <button
                    onClick={ev => onClickToolTip(ev, col)}
                    className='fixed translate-x-6 translate-y-5 scale-0 rounded-2xl bg-back-600 p-1 px-2 shadow-2xl drop-shadow-2xl duration-100 group-hover:scale-100'
                  >
                    {`${col.length} transactions`}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Table
