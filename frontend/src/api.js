const request = async (endpoint, method, body = {}) => {
  let options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }
  if (method === 'GET')
    endpoint +=
      '?' +
      Object.keys(body)
        .map(key => key + '=' + body[key])
        .join('&')
  else options.body = JSON.stringify(body)

  try {
    const response = await fetch(`http://localhost:5009${endpoint}`, options)
    return await response.json()
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const get = async () => {
  return await request('/categories', 'GET')
}

export const add = async transaction => {
  return await request('/transaction', 'POST', transaction)
}

export const deleteT = async id => {
  return await request(`/transaction/${id}`, 'DELETE')
}

export const guessCTI = (description, amount) => {
  const words = description.split(' ')
  if (words[0] === 'Transfer') {
    if (words[words.length - 1].toLowerCase() === 'holiday')
      return { category: 'investment', type: 'savings', item: 'holiday' }
    if (words[words.length - 1] === 'account')
      return { category: 'investment', type: 'savings', item: 'account' }
    return { category: 'investment', type: 'savings', item: '' }
  }
  if (words.includes('Salary'))
    return { category: 'income', type: 'wages', item: 'paycheck' }
  if (amount < 0) return { category: 'expense', type: '', item: '' }
  else return { category: 'income', type: '', item: '' }
}
