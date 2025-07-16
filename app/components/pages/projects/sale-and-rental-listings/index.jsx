
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import saleAndRentalListingsApi from '../../../../apis/sale-and-rental-listings.js'
import pageMetadataConstant from '../../../../constants/metadata/page.jsx'
import valueBoxConstant from '../../../../constants/pages/sale-and-rental-listings/value-box.jsx'
import projectConstant from '../../../../constants/project.jsx'
import {SaleAndRentalListingsContext} from '../../../../contexts/sale-and-rental-listings.jsx'
import stringUtility from '../../../../utilities/string.jsx'
import Blog from '../../../blog.jsx'
import GoogleMap from './google-maps/index.jsx'
import PanelBar from './panel-bar.jsx'

export function meta() {
  return [
    {title: pageMetadataConstant.saleAndRentalListingsProject.title},
    {name: 'description', content: pageMetadataConstant.saleAndRentalListingsProject.description}
  ]
}

export async function clientLoader() {
  return await saleAndRentalListingsApi.getInitialSaleListings()
}

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function SaleAndRentalListingsPage({
  loaderData: locationDtos
}) {
  const {
    backgroundTheme,
    borderTheme,
    textTheme
  } = useSelector(themeStates)

  const [filteredLocationDtos, setFilteredLocationDtos] = useState(locationDtos)
  const [priceStats, setPriceStats] = useState({
    min: 0,
    median: 0,
    max: 0
  })

  const calculatePriceStats = (_locationDtos) => {
    const locationPrices = _locationDtos
      .map(item => item.price)

    const min = locationPrices[0] || 0
    const max = locationPrices[locationPrices.length - 1] || 0
    const median = locationPrices.length
      ? locationPrices.length % 2 === 0
        ? (locationPrices[locationPrices.length / 2 - 1] + locationPrices[locationPrices.length / 2]) / 2
        : locationPrices[Math.floor(locationPrices.length / 2)]
      : 0

    setPriceStats({min, median, max})
  }

  useEffect(() => {
    calculatePriceStats(filteredLocationDtos)
  }, [filteredLocationDtos])

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
        setFilteredLocationDtos
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
          <div className={'grow aspect-4/3'}>
            <GoogleMap
              locations={filteredLocationDtos}
              mapClassName={''} />
          </div>
          <div className={'grow min-h-96'}>
          </div>
        </div>
      </section>
    </section>
  </Blog>
}
