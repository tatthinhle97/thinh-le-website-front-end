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
import {memo, useCallback, useContext} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import iconConstant from '../../../../../constants/icon.jsx'
import valueBoxConstant from '../../../../../constants/pages/sale-and-rental-listings/value-box.jsx'
import rentCastConstant from '../../../../../constants/rentcast.jsx'
import {SaleAndRentalListingsContext} from '../../../../../contexts/sale-and-rental-listings.jsx'
import stringUtility from '../../../../../utilities/string.jsx'
import BoundaryFit from './boundary-fit.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme
  },
  createSelector
)

const GoogleMap = memo(({
  locationDtos,
  isClickable = true,
  markerClassName = '',
  mapClassName = '',
  onMarkerClick
}) => {
  const {
    backgroundTheme
  } = useSelector(themeStates)

  const {
    priceStats
  } = useContext(SaleAndRentalListingsContext)

  const getLocationBackgroundColorClassNameByPrice = useCallback((_locationPrice) => {
    switch (_locationPrice) {
      case priceStats.min:
        return 'bg-emerald-600'
      case priceStats.max:
        return backgroundTheme.invalid
      default: // 'maximumPrice'
        return backgroundTheme.accentColor700
    }
  }, [backgroundTheme.invalid, backgroundTheme.accentColor700, priceStats.max, priceStats.min])

  const createMapIcon = useCallback((_icon, _locationPrice) => {
    return <div className={stringUtility.merge([
      'flex items-center justify-center',
      getLocationBackgroundColorClassNameByPrice(_locationPrice),
      'rounded-full p-1.5 text-white'
    ])}>
      {_icon}
    </div>
  }, [getLocationBackgroundColorClassNameByPrice])

  const getMapIconByPropertyType = useCallback((_locationDto) => {
    switch (_locationDto.propertyType) {
      case rentCastConstant.propertyType.singleFamily:
        return createMapIcon(<HugeiconsIcon icon={Home01Icon} size={iconConstant.defaultSize} />, _locationDto.price)
      case rentCastConstant.propertyType.multiFamily:
        return createMapIcon(<HugeiconsIcon icon={House05Icon} size={iconConstant.defaultSize} />, _locationDto.price)
      case rentCastConstant.propertyType.condo:
        return createMapIcon(<HugeiconsIcon icon={RealEstate01Icon} size={iconConstant.defaultSize} />,
          _locationDto.price)
      case rentCastConstant.propertyType.townhouse:
        return createMapIcon(<HugeiconsIcon icon={House01Icon} size={iconConstant.defaultSize} />, _locationDto.price)
      case rentCastConstant.propertyType.manufactured:
        return createMapIcon(<HugeiconsIcon icon={FactoryIcon} size={iconConstant.defaultSize} />, _locationDto.price)
      case rentCastConstant.propertyType.apartment:
        return createMapIcon(<HugeiconsIcon icon={Building05Icon} size={iconConstant.defaultSize} />,
          _locationDto.price)
      default: // land
        return createMapIcon(<HugeiconsIcon icon={PinLocation03Icon} size={iconConstant.defaultSize} />,
          _locationDto.price)
    }
  }, [createMapIcon])

  return <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
    <Map
      // onCameraChanged={(e) => console.log(e.detail.zoom)}
      defaultZoom={8}
      defaultCenter={{lat: 40.143, lng: -74.726}}
      // Required for AdvancedMarker
      mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
      className={mapClassName}
      gestureHandling={'greedy'}>
      {/* Render markers */}
      {locationDtos?.map((_locationDto, _index) => <AdvancedMarker
        key={_index}
        title={_locationDto.title}
        // Format: {lat: number, lng: number}
        position={{lat: _locationDto.lat, lng: _locationDto.lng}}
        clickable={isClickable}
        className={markerClassName}
        onClick={() => onMarkerClick(_locationDto)}>
        {getMapIconByPropertyType(_locationDto)}
      </AdvancedMarker>)}
      <BoundaryFit locationDtos={locationDtos} />
    </Map>
  </APIProvider>
})

export default GoogleMap
