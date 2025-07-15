import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps'
import {memo} from 'react'
import stringUtility from '../../../utilities/string.jsx'
import BoundaryFit from './boundary-fit.jsx'

const GoogleMap = memo(({
  locations,
  coordinates,
  onIconRender,
  isClickable = true,
  markerClassName = '',
  mapClassName = '',
  defaultZoom = 8,
  defaultLat = 40.143,
  defaultLng = -74.726

}) => {
  return <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
    <Map
      // onCameraChanged={(e) => console.log(e.detail.zoom)}
      defaultZoom={defaultZoom}
      defaultCenter={{lat: defaultLat, lng: defaultLng}}
      // Required for AdvancedMarker
      mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
      className={stringUtility.merge([
        mapClassName
      ])}>
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
})

export default GoogleMap
