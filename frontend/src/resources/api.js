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

export const getAll = async () => {
  return await request('/all', 'GET')
}

export const add = async transaction => {
  return await request('/transaction', 'POST', transaction)
}

export const deleteT = async id => {
  return await request(`/transaction/${id}`, 'DELETE')
}

export const guessCTI = (description, amount) => {
  const words = description.split(' ')
  if (words[0] === 'Transfer' && amount < 0) {
    if (words[words.length - 1].toLowerCase() === 'holiday')
      return { category: 'future', type: 'savings', item: 'holiday' }
    if (words[words.length - 1] === 'account')
      return { category: 'future', type: 'savings', item: 'account' }
    return { category: 'future', type: 'savings', item: '' }
  }

  if (words.includes('Salary'))
    return { category: 'income', type: 'wages', item: 'paycheck' }

  if (description.includes('Anytime Fitness'))
    return { category: 'expense', type: 'health', item: 'fitness' }

  if (
    description.toLowerCase().includes('mcdonalds') ||
    description.includes('KFC')
  )
    return { category: 'expense', type: 'entertainment', item: 'food' }

  if (description.includes('SUSHI'))
    return { category: 'expense', type: 'everyday', item: 'food' }

  if (
    description.includes('WOOLWORTHS') ||
    description.includes('COLES') ||
    description.includes('ALDI') ||
    description.includes('BAKERS DELIGHT')
  )
    return { category: 'expense', type: 'everyday', item: 'groceries' }

  if (description.includes('More Telecom'))
    return { category: 'expense', type: 'utilities', item: 'mobile' }

  if (description.includes('DOMAINS'))
    return { category: 'expense', type: 'technology', item: 'domains' }

  if (description.includes('APPLE.COM/BILL'))
    return { category: 'expense', type: 'technology', item: 'services' }

  if (amount < 0) return { category: 'expense', type: '', item: '' }
  else return { category: 'income', type: '', item: '' }
}
