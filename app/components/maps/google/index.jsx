import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps'
import {memo} from 'react'
import stringUtility from '../../../utilities/string.jsx'
import BoundaryFit from './boundary-fit.jsx'

const GoogleMap = memo(({
  className = '',
  locations,
  coordinates,
  onIconRender,
  isClickable = true,
  markerClassName = ''
}) => {
  return <div
    className={stringUtility.merge([
      'min-h-120',
      className
    ])}>
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <Map
        style={{
          borderRadius: '0.5rem', // rounded-lg
          overflow: 'hidden',
          width: '100%',
          height: '100%'
        }}
        // onCameraChanged={(e) => console.log(e.detail.zoom)}
        defaultZoom={8}
        defaultCenter={{lat: 40.143, lng: -74.726}}
        // Required for AdvancedMarker
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}>
        {/* Render markers */}
        {locations.map((_location, _index) => <AdvancedMarker
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
})

export default GoogleMap
