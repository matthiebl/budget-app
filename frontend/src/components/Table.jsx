const Table = ({ headers, rows, flipSign = false }) => {
  return (
    <div className='flex flex-col'>
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
          {row.slice(1).map(col => (
            <p
              key={crypto.randomUUID()}
              className={
                'flex-1 text-right text-sm italic ' +
                (col * (flipSign ? -1 : 1) === 0 ? 'text-gray-500' : '') +
                (col * (flipSign ? -1 : 1) < 0 ? 'text-alt-500' : '') +
                (col * (flipSign ? -1 : 1) < -500 ? 'text-alt-900' : '')
              }
            >{`$${(col * (flipSign ? -1 : 1)).toFixed(2)}`}</p>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Table
