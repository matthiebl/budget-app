import { useState } from 'react'
import Box from '../components/Box'
import Button from '../components/Button'
import Card from '../components/Card'
import Navigation from '../components/Navigation'
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

const NewEntry = () => {
  const [state, setState] = useState('single')

  const handleUpload = async file => {
    const data = await readFile(file)
    console.log(data)
  }

  return (
    <BasePage navigation={<Navigation />}>
      <div className='flex h-full w-full flex-col gap-4 p-10'>
        <Box className='flex justify-between'>
          <h1 className='text-4xl'>{RouteData.add.text}</h1>
          <Button
            text={state === 'single' ? 'Batch Upload' : 'Cancel'}
            onClick={() => {
              state === 'single' ? setState('multi') : setState('single')
            }}
            color='bg-gradient-to-br from-alt-500 to-alt-900'
          />
        </Box>

        {state === 'single' && <Card></Card>}
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
