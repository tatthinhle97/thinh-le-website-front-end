import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {useContext, useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import SaleAndRentalListingsContext from '../contexts/sale-and-rental-listings.jsx'
import stringUtility from '../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

// This component is only used in sale and rental listings project
export default function LeafletMap({className}) {
  const {
    backgroundTheme,
    textTheme
  } = useSelector(themeStates)

  const mapContainerRef = useRef(null)
  const {listings} = useContext(SaleAndRentalListingsContext)
  console.log('listings', listings)

  useEffect(() => {
    const map = L.map(mapContainerRef.current).setView([51.505, -0.09], 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    // Cleanup on unmount
    return () => {
      map.remove()
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
