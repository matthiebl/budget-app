import { useEffect, useState } from 'react'
import { add, deleteT, get, guessCTI } from '../api'
import Box from '../components/Box'
import Button from '../components/Button'
import Card from '../components/Card'
import Navigation from '../components/Navigation'
import Select from '../components/Select'
import { RouteData } from '../resources/routes'
import BasePage from './Page'

const readFile = async file => {
  const reader = new FileReader()
  const promise = new Promise((resolve, reject) => {
    reader.onerror = reject
    reader.onload = () => resolve(reader.result)
    reader.readAsText(file)
  })
  try {
    const text = await promise
    return text
  } catch (err) {
    console.log('Bad file input')
  }
}

const formatCSV = csvtext => {
  const lines = csvtext.split('\n')
  return lines
    .map(line => line.replaceAll('"', '').split(','))
    .reverse()
    .slice(1)
}

const NewEntry = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  const [state, setState] = useState('single')
  const [autoFill, setAutoFill] = useState([])
  const [previous, setPrevious] = useState([])
  const [removed, setRemoved] = useState([])

  const [fields, setFields] = useState(EMPTY_FIELDS)

  useEffect(() => {
    const onLoad = async () => {
      const data = await get()
      setData(data)
      setLoading(false)
    }
    onLoad()
  }, [])

  useEffect(() => {
    if (autoFill.length < 1) return
    const guess = guessCTI(autoFill[0][2], autoFill[0][1])
    setFields({
      ...fields,
      desc: autoFill[0][2],
      amount: autoFill[0][1],
      date: autoFill[0][0].split('/').reverse().join('-'),
      ...guess,
    })
  }, [autoFill])

  const handleUpload = async file => {
    const csv = await readFile(file)
    if (!csv) return
    const data = formatCSV(csv)
    setAutoFill(data)
    setState('single')
  }

  const handleAdd = async ev => {
    if (
      fields.desc === '' ||
      fields.category === '' ||
      fields.type === '' ||
      fields.item === '' ||
      fields.amount === '' ||
      !fields.date
    )
      return
    try {
      const value = parseFloat(fields.amount)
      const response = await add({
        ...fields,
        title: fields.title || 'Untitled',
        description: fields.desc,
      })
      console.log(response)
      setPrevious([response, ...previous])
      setFields(EMPTY_FIELDS)
      if (autoFill.length === 0) return
      setAutoFill([...autoFill.slice(1)])
    } catch (err) {
      return
    }
  }

  return (
    <BasePage navigation={<Navigation />}>
      <div className='flex h-full w-full flex-col gap-4 p-10'>
        <Box className='flex justify-between'>
          <span className='flex items-end gap-2'>
            <h1 className='text-4xl'>{RouteData.add.text}</h1>
            {autoFill.length > 1 && (
              <p className='mb-0.5 text-gray-400'>({autoFill.length - 1})</p>
            )}
          </span>
          <Button
            text={state === 'single' ? 'Batch Upload' : 'Cancel'}
            onClick={() => {
              state === 'single' ? setState('multi') : setState('single')
            }}
            color='bg-gradient-to-br from-alt-500 to-alt-900'
          />
        </Box>

        {state === 'single' && (
          <Card className='flex flex-col gap-4'>
            <input
              type='text'
              placeholder='Title'
              value={fields.title}
              onChange={ev => setFields({ ...fields, title: ev.target.value })}
              className='rounded-2xl border border-transparent bg-transparent p-2 px-3 text-lg outline-0 focus:border-white'
            />
            <input
              type='text'
              placeholder='Short description'
              value={fields.desc}
              onChange={ev => setFields({ ...fields, desc: ev.target.value })}
              className='rounded-2xl border border-transparent bg-transparent p-2 px-3 outline-0 invalid:border-alt-500 focus:border-white'
              required
            />

            <div className='flex gap-8 border border-transparent p-2 px-3'>
              <Select
                label='Category:'
                placeholder='Select a category'
                selected={fields.category}
                items={!loading && Object.keys(data)}
                onChange={ev => {
                  setFields({
                    ...fields,
                    category: ev.target.value,
                    type: '',
                    item: '',
                  })
                }}
                test={!loading}
                className='w-48 rounded-2xl border border-transparent px-1 invalid:border-alt-500 focus:border-white'
              />

              <Select
                label='Type:'
                placeholder='Select a type'
                selected={fields.type}
                items={
                  fields.category !== '' && Object.keys(data[fields.category])
                }
                onChange={ev => {
                  setFields({
                    ...fields,
                    type: ev.target.value,
                    item: '',
                  })
                }}
                test={fields.category !== ''}
                className='w-48 rounded-2xl border border-transparent px-1 invalid:border-alt-500 focus:border-white'
              />

              <Select
                label='Item:'
                placeholder='Select an item'
                selected={fields.item}
                items={
                  fields.type !== '' &&
                  Object.keys(data[fields.category][fields.type])
                }
                onChange={ev => setFields({ ...fields, item: ev.target.value })}
                test={fields.type !== ''}
                className='w-48 rounded-2xl border border-transparent px-1 invalid:border-alt-500 focus:border-white'
              />
            </div>

            <div className='flex gap-8'>
              <input
                type='text'
                placeholder='$ 0'
                value={'$ ' + fields.amount}
                onChange={ev => {
                  if (/^\$ -?\d*[.]?\d{0,2}$/.test(ev.target.value))
                    setFields({ ...fields, amount: ev.target.value.slice(2) })
                }}
                className='rounded-2xl border border-transparent bg-transparent p-2 px-3 text-lg outline-0 before:block before:content-["$"] focus:border-white'
              />

              <input
                type='date'
                placeholder='01/01/2023'
                value={fields.date}
                onChange={ev => setFields({ ...fields, date: ev.target.value })}
                className='rounded-2xl border border-transparent bg-transparent p-2 px-3 text-lg text-white outline-0 focus:border-white'
              />
            </div>

            <div className='flex justify-end gap-5'>
              {autoFill.length > 1 && (
                <Button
                  text='Skip'
                  className='w-48'
                  color='border-white'
                  onClick={() => setAutoFill([...autoFill.slice(1)])}
                  variant='outlined'
                />
              )}

              {autoFill.length <= 1 && (
                <Button
                  text='Clear'
                  className='w-48'
                  color='border-white'
                  onClick={() => setFields(EMPTY_FIELDS)}
                  variant='outlined'
                />
              )}

              <Button
                text={autoFill.length > 1 ? 'Next' : 'Add'}
                className='w-48'
                onClick={handleAdd}
                disabled={
                  fields.desc === '' ||
                  fields.category === '' ||
                  fields.type === '' ||
                  fields.item === '' ||
                  fields.amount === '' ||
                  fields.date === ''
                }
              />
            </div>
          </Card>
        )}

        {state === 'single' && previous.length > 0 && (
          <Box className='flex items-end gap-2'>
            <h1 className='text-2xl'>Recent Additions</h1>
            <p className='mb-0.5 text-gray-400'>
              ({previous.length - removed.length})
            </p>
          </Box>
        )}

        {state === 'single' &&
          previous.map(prev => (
            <Card
              key={prev.id}
              className={
                'left-0 flex items-center gap-2 py-3' +
                (removed.includes(prev.id) ? ' text-gray-500' : '')
              }
            >
              <p className='w-1/6'>{'$' + prev.amount}</p>
              <p className='w-8/12 overflow-hidden text-ellipsis whitespace-nowrap'>
                {prev.description}
              </p>
              <div className='flex w-1/6 justify-end gap-2 text-right'>
                {prev.date}
                <button
                  onClick={() => {
                    deleteT(prev.id)
                    setRemoved([...removed, prev.id])
                  }}
                  disabled={removed.includes(prev.id)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className={
                      'h-6 w-6' +
                      (removed.includes(prev.id) ? ' text-transparent' : '')
                    }
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
            </Card>
          ))}

        {state === 'multi' && (
          <>
            <label
              htmlFor='upload'
              className='flex flex-grow flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed'
              onDrag={() => {
                console.log('drop')
              }}
            >
              <p className='text-6xl'>+</p>
              <p className='text-4xl'>Upload a Batch CSV</p>
            </label>
            <input
              type='file'
              accept='.csv'
              id='upload'
              className='hidden'
              onChange={ev => handleUpload(ev.target.files[0])}
            />
          </>
        )}
      </div>
    </BasePage>
  )
}

export default NewEntry

const EMPTY_FIELDS = {
  title: '',
  desc: '',
  category: '',
  type: '',
  item: '',
  amount: '0',
  date: '',
}
