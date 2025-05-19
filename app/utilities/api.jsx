const getSingleResponse = async(url, headers = {}, method = 'GET') => {
  try {
    const response = await fetch(url, {
      method,
      headers
    })
    return response.json()
  } catch (error) {
    console.error(error)
  }
}

const getMultipleResponses = async(urls, headers = {}, method = 'GET') => {
  return Promise.all(
    urls.map(async(_url) => {
      return getSingleResponse(_url, headers, method)
    })
  )
}

const apiUtility = {
  getSingleResponse,
  getMultipleResponses
}

export default apiUtility
