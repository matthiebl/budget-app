import { useEffect, useState } from 'react'
import { get } from '../api'
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

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('0')
  const [date, setDate] = useState('')

  const [category, setCategory] = useState('')
  const [type, setType] = useState('')
  const [item, setItem] = useState('')

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
    setDesc(autoFill[0][2])
    setAmount(autoFill[0][1])
    setDate(autoFill[0][0].split('/').reverse().join('-'))
  }, [autoFill])

  const handleUpload = async file => {
    const csv = await readFile(file)
    if (!csv) return
    const data = formatCSV(csv)
    setAutoFill(data)
    setState('single')
  }

  const handleAdd = ev => {
    if (
      desc === '' ||
      category === '' ||
      type === '' ||
      item === '' ||
      amount === '' ||
      !date
    )
      return
    try {
      const value = parseFloat(amount)
      console.log('Adding guy')
      setTitle('')
      setDesc('')
      setAmount('0')
      setDate('')
      setCategory('')
      setType('')
      setItem('')
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
            {autoFill.length > 0 && (
              <p className='mb-0.5 text-gray-400'>({autoFill.length})</p>
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
              value={title}
              onChange={ev => setTitle(ev.target.value)}
              className='rounded-2xl border border-transparent bg-transparent p-2 px-3 text-lg outline-0 focus:border-white'
            />
            <input
              type='text'
              placeholder='Short description'
              value={desc}
              onChange={ev => setDesc(ev.target.value)}
              className='rounded-2xl border border-transparent bg-transparent p-2 px-3 outline-0 focus:border-white'
            />

            <div className='flex gap-8 border border-transparent p-2 px-3'>
              <Select
                label='Category:'
                placeholder='Select a category'
                selected={category}
                items={!loading && Object.keys(data)}
                onChange={ev => {
                  setCategory(ev.target.value)
                  setType('')
                  setItem('')
                }}
                test={!loading}
                className='w-48'
              />

              <Select
                label='Type:'
                placeholder='Select a type'
                selected={type}
                items={category !== '' && Object.keys(data[category])}
                onChange={ev => {
                  setType(ev.target.value)
                  setItem('')
                }}
                test={category !== ''}
                className='w-48'
              />

              <Select
                label='Item:'
                placeholder='Select an item'
                selected={item}
                items={type !== '' && Object.keys(data[category][type])}
                onChange={ev => setItem(ev.target.value)}
                test={type !== ''}
                className='w-48'
              />
            </div>

            <input
              type='text'
              placeholder='$ 0'
              value={'$ ' + amount}
              onChange={ev => {
                if (/^\$ -?\d*[.]?\d{0,2}$/.test(ev.target.value))
                  setAmount(ev.target.value.slice(2))
              }}
              className='rounded-2xl border border-transparent bg-transparent p-2 px-3 text-lg outline-0 before:block before:content-["$"] focus:border-white'
            />

            <input
              type='date'
              placeholder='01/01/2023'
              value={date}
              onChange={ev => {
                setDate(ev.target.value)
                console.log(ev.target.value)
              }}
              className='w-fit rounded-2xl border border-transparent bg-transparent p-2 px-3 text-lg text-white outline-0 focus:border-white'
            />

            <Button
              text={autoFill.length > 1 ? 'Next' : 'Add'}
              className='ml-auto w-48'
              onClick={handleAdd}
            />
          </Card>
        )}

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
