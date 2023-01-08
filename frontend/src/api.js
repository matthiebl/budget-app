const request = async (endpoint, method, body = {}) => {
  let options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }
  if (method === 'GET')
    endpoint += '?' + Object.keys(body).map(key => key + '=' + body[key]).join('&')
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
