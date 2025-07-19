
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
import Card from '../../../cards/index.jsx'
import GoogleMap from './google-map/index.jsx'
import PanelBar from './panel-bar.jsx'
import AveragePriceByListingTypeChart from './chart.jsx'

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
  const [selectedLocation, setSelectedLocation] = useState({})

  useEffect(() => {
    saleAndRentalListingsApi.getInitialSaleListings()
      .then(_locationDtos => {
        setLocationDtos(_locationDtos)
        setFilteredLocationDtos(_locationDtos)
      })
  }, [])

  const calculatePriceStats = (_locationDtos) => {
    if (_locationDtos) {
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
  }

  useEffect(() => {
    calculatePriceStats(filteredLocationDtos)
  }, [filteredLocationDtos])

  const getValueBoxBackgroundColorClassNameById = useCallback((_id) => {
    switch (_id) {
    case valueBoxConstant.minimumPrice.id:
      return backgroundTheme.valid
    case valueBoxConstant.medianPrice.id:
      return backgroundTheme.warning
    default: // 'maximumPrice'
      return backgroundTheme.invalid
    }
  }, [
    // backgroundTheme.invalid,
    // backgroundTheme.valid,
    backgroundTheme.warning])

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

  const onGoogleMarkerClick = (_locationDto) => {
    setSelectedLocation(_locationDto)
  }

  function renderField(_label, _data, _shouldAddMarginBottom = true) {
    return <p className={`text-wrap ${_shouldAddMarginBottom ? 'mb-2' : ''}`}>
      <span className={'font-semibold'}>{_label}</span>
      : {_data}
    </p>
  }

  return <Blog
    dateCreated={projectConstant.saleAndRentalListings.dateCreated}
    title={projectConstant.saleAndRentalListings.title}>
    <p className={`mb-6 ${textTheme.secondaryColor600}`}>
      Search for sale and rental listings across the US, integrating interactive data visualizations to analyze trends
      and insights in the housing market.
    </p>
    <section>
      <SaleAndRentalListingsContext.Provider value={{
        locationDtos,
        setFilteredLocationDtos,
        setSelectedLocation
      }}>
        <PanelBar />
      </SaleAndRentalListingsContext.Provider>
      <section
        className={stringUtility.merge([
          'p-4 border border-t-0 flex flex-col gap-4 rounded-b-lg',
          borderTheme.secondaryColor300
        ])}>
        {/* Value boxes */}
        <div className={'flex flex-col md:flex-row gap-4'}>
          {valueBoxes}
        </div>
        <div className={'flex flex-col-reverse xl:flex-row gap-4'}>
          <Card
            containerClassName={'grow basis-1/2'}
            title={'Listing locations'}
            contentClassName={'aspect-4/3'}>
            <GoogleMap
              locationDtos={filteredLocationDtos}
              onMarkerClick={onGoogleMarkerClick} />
          </Card>
          <Card
            title={'Average price by Property type'}
            containerClassName={'grow basis-1/2'}
            contentClassName={'p-4 aspect-4/3'}>
            <AveragePriceByListingTypeChart locationDtos={filteredLocationDtos} />
          </Card>
        </div>
        <div className={'grid sm:grid-cols-2 xl:grid-cols-4 gap-4'}>
          <Card
            containerClassName={''}
            title={'Listing information'}
            contentClassName={'p-4'}>
            {renderField(
              'Full address',
              selectedLocation.fullAddress ?? '-')}
            {renderField(
              'Property type',
              selectedLocation.propertyType ?? '-')}
            {renderField(
              'Listing type',
              selectedLocation.listingType ?? '-')}
            {renderField(
              'Bedrooms',
              selectedLocation.bedrooms ?? '-')}
            {renderField(
              'Bathrooms',
              selectedLocation.bathrooms ?? '-')}
            {renderField(
              'Living area',
              selectedLocation.livingArea ?? '-')}
            {renderField(
              'Lot area',
              selectedLocation.lotArea ?? '-')}
            {renderField(
              'Year built',
              selectedLocation.yearBuilt ?? '-')}
            {renderField(
              'Price',
              selectedLocation.price ? `$${selectedLocation.price}` : '-')}
            {renderField(
              'HOA fee',
              selectedLocation.hoaFee ? `$${selectedLocation.hoaFee}` : '-')}
            {renderField(
              'Days on market',
              selectedLocation.daysOnMarket ?? '-',
              false)}
          </Card>
          <Card
            containerClassName={'content-stretch flex flex-col'}
            title={'Listing contact'}
            contentClassName={'p-4 grow'}>
            {renderField(
              'Office name',
              selectedLocation.listingOfficeName ?? '-')}
            {renderField(
              'Office phone',
              selectedLocation.listingOfficePhone ?? '-')}
            {renderField(
              'Office email',
              selectedLocation.listingOfficeEmail ?? '-')}
            {renderField(
              'Agent name',
              selectedLocation.listingAgentName ?? '-')}
            {renderField(
              'Agent phone',
              selectedLocation.listingOfficePhone ?? '-')}
            {renderField(
              'Agent email',
              selectedLocation.listingAgentEmail ?? '-',
              false)}
          </Card>
          <Card
            containerClassName={'sm:col-span-2 content-stretch flex flex-col'}
            title={'Listing history'}
            contentClassName={'p-4 grow'}>
            <table className='min-w-full divide-y'>
              <thead>
                <tr>
                  <th scope='col' className='pb-3.5 pr-3 font-semibold text-left'>
                    Date
                  </th>
                  <th scope='col' className='pb-3.5 pr-3 font-semibold text-left'>
                    Event
                  </th>
                  <th scope='col' className='pb-3.5 pr-3 font-semibold text-left'>
                    Price
                  </th>
                  <th scope='col' className='pb-3.5 font-semibold text-left'>
                    Days on Market
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-300'>
                {selectedLocation.history?.map((item) => (
                  <tr key={item.date}>
                    <td className='py-4 pr-3 whitespace-nowrap'>{item.date}</td>
                    <td className='py-4 pr-3 whitespace-nowrap'>{item.event}</td>
                    <td className='py-4 pr-3 whitespace-nowrap'>${item.price}</td>
                    <td className='py-4 whitespace-nowrap'>{item.daysOnMarket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>
    </section>
  </Blog>
}
