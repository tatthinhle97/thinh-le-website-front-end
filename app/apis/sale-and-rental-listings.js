import apiUtility from '../utilities/api.jsx'

const getInitialSaleListings = async() => {
  return apiUtility.get(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/projects/sale-and-rental-listings/default-rental-listings`)
}

const saleAndRentalListingsApi = {
  getInitialSaleListings
}

export default saleAndRentalListingsApi
