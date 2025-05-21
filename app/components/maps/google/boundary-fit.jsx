// Component to add markers and auto-fit bounds
import {useMap} from '@vis.gl/react-google-maps'
import {useEffect} from 'react'

export default function BoundaryFit({
  locations
}) {
  const map = useMap()

  // Adjust the map view to fit all the markers
  useEffect(() => {
    if (!map || locations.length === 0) return

    const bounds = new window.google.maps.LatLngBounds()
    locations.forEach(_location => bounds.extend(_location)
    )

    map.fitBounds(bounds)
  }, [locations, map])

  return <></>
}
