// Dumb component to add markers and auto-fit bounds
import {useMap} from '@vis.gl/react-google-maps'
import {useEffect} from 'react'

export default function BoundaryFit({
  coordinates
}) {
  const map = useMap()

  // Adjust the map view to fit all the markers
  useEffect(() => {
    if (!map || coordinates.length === 0) return

    const bounds = new window.google.maps.LatLngBounds()
    coordinates.forEach(_location => bounds.extend(_location)
    )

    map.fitBounds(bounds)
  }, [coordinates, map])

  return <></>
}
