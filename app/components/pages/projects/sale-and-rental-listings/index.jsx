import {
  Building05Icon,
  FactoryIcon,
  Home01Icon,
  House01Icon,
  House05Icon, PinLocation03Icon,
  RealEstate01Icon
} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import saleAndRentalListingsApi from '../../../../apis/sale-and-rental-listings.js'
import pageMetadataConstant from '../../../../constants/metadata/page.jsx'
import valueBoxConstant from '../../../../constants/pages/sale-and-rental-listings/value-box.jsx'
import projectConstant from '../../../../constants/project.jsx'
import rentCastConstant from '../../../../constants/rentcast.jsx'
import {SaleAndRentalListingsContext} from '../../../../contexts/sale-and-rental-listings.jsx'
import stringUtility from '../../../../utilities/string.jsx'
import Blog from '../../../blog.jsx'
import GoogleMap from '../../../maps/google/index.jsx'
import PanelBar from './panel-bar.jsx'

export function meta() {
  return [
    {title: pageMetadataConstant.saleAndRentalListingsProject.title},
    {name: 'description', content: pageMetadataConstant.saleAndRentalListingsProject.description}
  ]
}

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function SaleAndRentalListingsPage() {
  const {
    backgroundTheme,
    borderTheme,
    textTheme
  } = useSelector(themeStates)

  const [locationDtos, setLocationDtos] = useState([])
  const [filteredLocationDtos, setFilteredLocationDtos] = useState([])
  const [priceStats, setPriceStats] = useState({
    min: 0,
    median: 0,
    max: 0
  })

  const updatePriceStats = (_locationDtos) => {
    const sortedPrices = _locationDtos
      .map(item => item.price)
      .sort((a, b) => a - b)

    const min = sortedPrices[0] || 0
    const max = sortedPrices[sortedPrices.length - 1] || 0
    const median = sortedPrices.length
      ? sortedPrices.length % 2 === 0
        ? (sortedPrices[sortedPrices.length / 2 - 1] + sortedPrices[sortedPrices.length / 2]) / 2
        : sortedPrices[Math.floor(sortedPrices.length / 2)]
      : 0

    setPriceStats({min, median, max})
  }

  useEffect(() => {
    saleAndRentalListingsApi.getInitialSaleListings()
      .then(_locationDtos => {
        setLocationDtos(_locationDtos)
        setFilteredLocationDtos(_locationDtos)
        updatePriceStats(_locationDtos)
      })
  }, [])

  const getValueBoxBackgroundColorClassNameById = useCallback((_id) => {
    switch (_id) {
    case valueBoxConstant.minimumPrice.id:
      return backgroundTheme.valid600
    case valueBoxConstant.medianPrice.id:
      return backgroundTheme.warning400
    default: // 'maximumPrice'
      return backgroundTheme.invalid600
    }
  }, [
    backgroundTheme.invalid600,
    backgroundTheme.valid600,
    backgroundTheme.warning400])

  const getValueBoxValueById = useCallback((_id) => {
    switch (_id) {
    case valueBoxConstant.minimumPrice.id:
      return priceStats.min.toLocaleString() ?? 0
    case valueBoxConstant.medianPrice.id:
      return priceStats.median.toLocaleString() ?? 0
    default: // 'maximumPrice'
      return priceStats.max.toLocaleString() ?? 0
    }
  }, [priceStats.max, priceStats.median, priceStats.min])

  const valueBoxes = useMemo(() => {
    return valueBoxConstant.allValueBoxes.map(
      (_valueBox, _index) => {
        return <section
          key={_index}
          className={stringUtility.merge([
            'basis-1/3 p-4 border rounded-lg',
            'flex gap-4 items-center',
            borderTheme.secondaryColor300
          ])}>
          <div
            className={stringUtility.merge([
              getValueBoxBackgroundColorClassNameById(_valueBox.id),
              'p-2 w-fit rounded-lg h-fit',
              textTheme.primaryColor
            ])}>
            {_valueBox.icon}
          </div>
          <div className={stringUtility.merge([
            'flex flex-col'
          ])}>
            <p className={stringUtility.merge([
              textTheme.secondaryColor600
            ])}>{_valueBox.title}</p>
            <p className={'mt-1 text-3xl/10 font-bold'}>
              $ {getValueBoxValueById(_valueBox.id)}
            </p>
          </div>
        </section>
      })
  }, [
    borderTheme.secondaryColor300,
    getValueBoxBackgroundColorClassNameById,
    getValueBoxValueById,
    textTheme.primaryColor,
    textTheme.secondaryColor600
  ])

  // const barChartData = useMemo(() => {
  //   if (filteredLocationDtos) {
  //     const countByListingType = filteredLocationDtos.locations
  //       .reduce((_accumulator, _currentLocation) => {
  //         if (_currentLocation.listingType) {
  //           _accumulator[_currentLocation.listingType] = (_accumulator[_currentLocation.listingType] || 0) + 1
  //         }
  //
  //         return _accumulator
  //       }, {})
  //
  //     return Object.entries(countByListingType)
  //       .map(([_listingType, _count]) => ({
  //         listingType: _listingType,
  //         // Round up to nearest integer
  //         count: _count
  //       }))
  //   }
  //
  //   return []
  // }, [filteredLocationDtos])
  //
  // console.log(barChartData)
  //
  // const donutChartData = useMemo(() => {
  //   if (filteredLocationDtos) {
  //     const countByListingType = filteredLocationDtos.locations
  //       .reduce((_accumulator, _currentLocation) => {
  //         if (_currentLocation.listingType) {
  //           _accumulator[_currentLocation.listingType] = (_accumulator[_currentLocation.listingType] || 0) + 1
  //         }
  //
  //         return _accumulator
  //       }, {})
  //
  //     return Object.entries(countByListingType)
  //       .map(([_listingType, _count]) => ({
  //         listingType: _listingType,
  //         count: _count
  //       }))
  //   }
  //
  //   return []
  // }, [filteredLocationDtos])

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

  return <Blog
    dateCreated={projectConstant.saleAndRentalListings.dateCreated}
    title={projectConstant.saleAndRentalListings.title}
    contentClassName={stringUtility.merge([
      'relative',
      borderTheme.secondaryColor300
    ])}>
    <p className={`mb-6 ${textTheme.secondaryColor600}`}>
      Search for sale and rental listings across the US, integrating interactive data visualizations to analyze trends
      and insights in the housing market.
    </p>
    <section>
      <SaleAndRentalListingsContext.Provider value={{
        locationDtos,
        setFilteredLocationDtos,
        priceStats,
        updatePriceStats
      }}>
        <PanelBar />
      </SaleAndRentalListingsContext.Provider>
      <section
        className={stringUtility.merge([
          'p-4 border border-t-0 flex flex-col gap-4 rounded-b-lg',
          borderTheme.secondaryColor300,
          backgroundTheme.primaryColor
        ])}>
        {/* Value boxes */}
        <div className={'flex flex-col md:flex-row gap-4'}>
          {valueBoxes}
        </div>
        <div className={'flex flex-col lg:flex-row gap-4'}>
          <div className={'grow min-h-96'}>
          </div>
          <div className={'grow aspect-3/2'}>
            <GoogleMap
              locations={filteredLocationDtos}
              onIconRender={(_location) => getMapIconByPropertyType(_location.propertyType)}
              mapClassName={''} />
          </div>
        </div>
      </section>
    </section>
  </Blog>
}
