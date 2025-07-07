const get = async(_url, _headers = {}) => {
  try {
    const response = await fetch(_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ..._headers
      }
    })

    return response.json()
  } catch (error) {
    console.error(error)
  }
}

const post = async(_url, _body = {}, _headers = {}) => {
  try {
    const response = await fetch(_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ..._headers
      },
      body: JSON.stringify(_body)
    })

    return response.json()
  } catch (error) {
    console.error(error)
  }
}

const apiUtility = {
  get,
  post
}

export default apiUtility
