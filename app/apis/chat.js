import apiUtility from '../utilities/api.jsx'

const sendMessage = async(_userMessage) => {
  return apiUtility.post(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/chatbot`, {
      message: _userMessage
    })
}

const chatApi = {
  sendMessage
}

export default chatApi
