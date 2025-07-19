
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
import TextInput from '../../../inputs/text.jsx'
import GoogleMap from './google-map/index.jsx'
import PanelBar from './panel-bar.jsx'
import AveragePriceByPropertyTypeChart from './chart.jsx'

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
  const [selectedLocation, setSelectedLocation] = useState({})

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

  return <Blog
    dateCreated={projectConstant.saleAndRentalListings.dateCreated}
    title={projectConstant.saleAndRentalListings.title}>
    <p className={`mb-6 ${textTheme.secondaryColor600}`}>
      Search for sale and rental listings across the US, integrating interactive data visualizations to analyze trends
      and insights in the housing market.
    </p>
    <section>
      <SaleAndRentalListingsContext.Provider value={{
        locationDtos: locationDtos ?? [],
        setFilteredLocationDtos
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
        <div className={'grid lg:grid-cols-2 gap-4'}>
          <Card
            title={'Average price by Property type'}
            containerClassName={'content-stretch flex flex-col'}
            contentClassName={'p-4 aspect-4/3'}>
            <AveragePriceByPropertyTypeChart locationDtos={filteredLocationDtos} />
          </Card>
          <Card
            title={'Listing locations'}
            contentClassName={''}>
            <GoogleMap
              locationDtos={filteredLocationDtos}
              mapClassName={'aspect-4/3'}
              onMarkerClick={onGoogleMarkerClick} />
          </Card>
        </div>
        <Card
          title={'Listing information'}
          contentClassName={'p-4'}>
          <div className={'grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'}>
            <TextInput
              containerClassName={'col-span-2'}
              isReadonly={true}
              label={'Full address'}
              value={selectedLocation.fullAddress ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Property type'}
              value={selectedLocation.propertyType ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Listing type'}
              value={selectedLocation.listingType ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Bedrooms'}
              value={selectedLocation.bedrooms ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Bathrooms'}
              value={selectedLocation.bathrooms ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Living area'}
              value={selectedLocation.livingArea ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Lot area'}
              value={selectedLocation.lotArea ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Year built'}
              value={selectedLocation.yearBuilt ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Price'}
              value={selectedLocation.price ? `$ ${selectedLocation.price}` : '-'} />
            <TextInput
              isReadonly={true}
              label={'HOA fee'}
              value={selectedLocation.hoaFee ? `$ ${selectedLocation.hoaFee}` : '-'} />
            <TextInput
              isReadonly={true}
              label={'Days on market'}
              value={selectedLocation.daysOnMarket ?? '-'} />
          </div>
        </Card>
        <Card
          title={'Listing contact'}
          contentClassName={'p-4'}>
          <div className={'grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'}>
            <TextInput
              isReadonly={true}
              label={'Listing office name'}
              value={selectedLocation.listingOfficeName ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Listing office phone'}
              value={selectedLocation.listingOfficePhone ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Listing office email'}
              value={selectedLocation.listingOfficeEmail ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Listing agent name'}
              value={selectedLocation.listingAgentName ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Listing agent phone'}
              value={selectedLocation.listingOfficePhone ?? '-'} />
            <TextInput
              isReadonly={true}
              label={'Listing agent email'}
              value={selectedLocation.listingAgentEmail ?? '-'} />
          </div>
        </Card>
      </section>
    </section>
  </Blog>
}
