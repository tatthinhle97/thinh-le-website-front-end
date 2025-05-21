import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {useContext, useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import SaleAndRentalListingsContext from '../../../../contexts/sale-and-rental-listings.jsx'
import stringUtility from '../../../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

// This component is only used in sale and rental listings project
export default function Map({className}) {
  const {
    backgroundTheme,
    textTheme
  } = useSelector(themeStates)

  const mapContainerRef = useRef(null)
  const {listings} = useContext(SaleAndRentalListingsContext)

  useEffect(() => {
    let map = undefined

    if (L && mapContainerRef.current) {
      /* Initialize the map */
      map = L
        .map(mapContainerRef.current)

      /* Add tile */
      const creditLink = 'http://www.openstreetmap.org/copyright'

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: `&copy; <a href="${creditLink}">OpenStreetMap</a>`
      }).addTo(map)

      const bounds = L.latLngBounds() // Create a bounds object to hold all marker positions

      // Adjust the map view to fit the bounds
      if (bounds.isValid()) {
        map.fitBounds(bounds, {padding: [20, 20]})
      }
    }

    // Cleanup on unmount
    return () => {
      map?.remove()
    }
  }, [
    backgroundTheme.accentColor700,
    backgroundTheme.hover.accentColor700,
    backgroundTheme.secondaryColor,
    listings,
    textTheme
  ])

  return <div
    ref={mapContainerRef}
    className={stringUtility.merge([
      'min-h-120 z-10',
      className
    ])}>
  </div>
}
