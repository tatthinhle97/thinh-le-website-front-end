// Dumb component to add markers and auto-fit bounds
import {useMap} from '@vis.gl/react-google-maps'
import {useEffect} from 'react'

export default function BoundaryFit({
  locationDtos
}) {
  const map = useMap()

  // Adjust the map view to fit all the markers
  useEffect(() => {
    if (!map || !locationDtos) return

    const bounds = new window.google.maps.LatLngBounds()
    locationDtos.forEach(_locationDto => bounds.extend({
      lat: _locationDto.lat, lng: _locationDto.lng
    }))

    map.fitBounds(bounds)
  }, [locationDtos, map])

  return <></>
}
