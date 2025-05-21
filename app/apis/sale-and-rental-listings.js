import apiUtility from '../utilities/api.jsx'

const getInitialSaleListings = async() => {
  return apiUtility.getSingleResponse(
    `${import.meta.env.VITE_BACKEND_ORIGIN}/projects/sale-and-rental-listings/initial-sale-listings`)
}

const saleAndRentalListingsApi = {
  getInitialSaleListings
}

export default saleAndRentalListingsApi
