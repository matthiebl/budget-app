const Table = ({ headers, rows }) => {
  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-[6]'>
        <h2 className='text-2xl'>{headers[0]}</h2>
        {headers.slice(1).map(col => (
          <p key={crypto.randomUUID()}>{col.header}</p>
        ))}
      </div>
      {rows.map(row => (
        <div key={crypto.randomUUID()} className='grid grid-cols-7'>
          <p>{row[0]}</p>
          {row.slice(1).map(col => (
            <p
              key={crypto.randomUUID()}
              className='text-right text-sm italic'
            >{`$${col}`}</p>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Table
