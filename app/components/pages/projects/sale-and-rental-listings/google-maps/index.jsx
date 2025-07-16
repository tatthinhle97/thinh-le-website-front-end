import {
  Building05Icon,
  FactoryIcon,
  Home01Icon,
  House01Icon,
  House05Icon,
  PinLocation03Icon,
  RealEstate01Icon
} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps'
import {memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import rentCastConstant from '../../../../../constants/rentcast.jsx'
import stringUtility from '../../../../../utilities/string.jsx'
import BoundaryFit from './boundary-fit.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme
  },
  createSelector
)

const GoogleMap = memo(({
  locations,
  isClickable = true,
  markerClassName = '',
  mapClassName = ''
}) => {
  const {
    backgroundTheme
  } = useSelector(themeStates)

  const createMapIcon = useCallback((_icon) => {
    return <div className={stringUtility.merge([
      'flex items-center justify-center',
      backgroundTheme.valid600,
      'rounded-full p-1.5 text-white'
    ])}>
      {_icon}
    </div>
  }, [backgroundTheme.valid600])

  const getMapIconByPropertyType = useCallback((_propertyType) => {
    switch (_propertyType) {
    case rentCastConstant.propertyType.singleFamily:
      return createMapIcon(<HugeiconsIcon icon={Home01Icon} className={'wh-normal'} />)
    case rentCastConstant.propertyType.multiFamily:
      return createMapIcon(<HugeiconsIcon icon={House05Icon} className={'wh-normal'} />)
    case rentCastConstant.propertyType.condo:
      return createMapIcon(<HugeiconsIcon icon={RealEstate01Icon} className={'wh-normal'} />)
    case rentCastConstant.propertyType.townhouse:
      return createMapIcon(<HugeiconsIcon icon={House01Icon} className={'wh-normal'} />)
    case rentCastConstant.propertyType.manufactured:
      return createMapIcon(<HugeiconsIcon icon={FactoryIcon} className={'wh-normal'} />)
    case rentCastConstant.propertyType.apartment:
      return createMapIcon(<HugeiconsIcon icon={Building05Icon} className={'wh-normal'} />)
    default: // land
      return createMapIcon(<HugeiconsIcon icon={PinLocation03Icon} className={'wh-normal'} />)
    }
  }, [createMapIcon])

  return <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
    <Map
      // onCameraChanged={(e) => console.log(e.detail.zoom)}
      defaultZoom={8}
      defaultCenter={{lat: 40.143, lng: -74.726}}
      // Required for AdvancedMarker
      mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
      className={mapClassName}>
      {/* Render markers */}
      {locations.map((_location, _index) => <AdvancedMarker
        key={_index}
        title={_location.title}
        // Format: {lat: number, lng: number}
        position={{lat: _location.lat, lng: _location.lng}}
        clickable={isClickable}
        className={markerClassName}>
        {getMapIconByPropertyType(_location.propertyType)}
      </AdvancedMarker>)}
      <BoundaryFit locations={locations} />
    </Map>
  </APIProvider>
})

export default GoogleMap
