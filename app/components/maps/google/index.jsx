import {Search01Icon} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps'
import {useMemo} from 'react'
import stringUtility from '../../../utilities/string.jsx'
import BoundaryFit from './boundary-fit.jsx'

export default function GoogleMap({
  className = '',
  locations,
  getTitle,
  getLatitude,
  getLongitude,
  isClickable = true,
  markerClassName = '',
  icon
}) {
  const mappedLocationsOnly = useMemo(() => {
    return locations.map(_location => {
      return {
        lat: getLatitude(_location),
        lng: getLongitude(_location)
      }
    })
  }, [getLatitude, getLongitude, locations])

  return <div
    className={stringUtility.merge([
      'min-h-120',
      className
    ])}>
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <Map
        defaultZoom={13}
        defaultCenter={{lat: 12.527224, lng: 108.776156}}
        // Required for AdvancedMarker
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}>
        {/* Render markers */}
        {locations.map((_location, _index) => <AdvancedMarker
          key={_index}
          title={getTitle(_location)}
          // Format: {lat: number, lng: number, altitude: number}
          position={{lat: getLatitude(_location), lng: getLongitude(_location)}}
          clickable={isClickable}
          className={markerClassName}>
          {icon}
        </AdvancedMarker>)}
        <BoundaryFit locations={mappedLocationsOnly} />
      </Map>
    </APIProvider>
  </div>
}
