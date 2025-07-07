import apiUtility from '../utilities/api.jsx'

const getStates = async() => {
  return apiUtility.get(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/states`)
}

const getCitiesByStateName = async(_state_name) => {
  return apiUtility.get(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/cities/cities-by-state-name?state_name=${_state_name}`)
}

const locationApi = {
  getStates,
  getCitiesByStateName
}

export default locationApi
