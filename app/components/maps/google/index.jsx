import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps'
import stringUtility from '../../../utilities/string.jsx'
import BoundaryFit from './boundary-fit.jsx'

export default function GoogleMap({
  className = '',
  locations = [],
  coordinates = [],
  onIconRender,
  isClickable = true,
  markerClassName = ''
}) {
  console.log('re-rendered 1')

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
        {locations?.map((_location, _index) => <AdvancedMarker
          key={_index}
          title={_location.title}
          // Format: {lat: number, lng: number}
          position={{lat: _location.latitude, lng: _location.longitude}}
          clickable={isClickable}
          className={markerClassName}>
          {onIconRender(_location)}
        </AdvancedMarker>)}
        <BoundaryFit coordinates={coordinates} />
      </Map>
    </APIProvider>
  </div>
}
