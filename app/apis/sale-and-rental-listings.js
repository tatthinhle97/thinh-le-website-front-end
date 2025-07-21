import apiUtility from '../utilities/api.jsx'

const getDefaultRentalListings = async() => {
  return apiUtility.get(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/projects/sale-and-rental-listings/default-rental-listings`)
}

const searchListings = async(_body) => {
  return apiUtility.post(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/projects/sale-and-rental-listings/search-listings`,
    _body
  )
}

const saleAndRentalListingsApi = {
  getDefaultRentalListings,
  searchListings
}

export default saleAndRentalListingsApi
