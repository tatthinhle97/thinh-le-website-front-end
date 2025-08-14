import apiUtility from '../utilities/api.jsx'

const sendContactForm = async(_contactMeDto) => {
  return apiUtility.post(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/contact-me`,
    _contactMeDto
  )
}

const contactMeApi = {
  sendContactForm
}

export default contactMeApi
