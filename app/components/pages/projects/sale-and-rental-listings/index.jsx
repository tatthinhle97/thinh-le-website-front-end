
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
import Loading from '../../../widgets/loading.jsx'
import Modal from '../../../widgets/modal.jsx'
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

const LOADING_TITLE = 'Fetching data'

export default function SaleAndRentalListingsPage() {
  const {
    backgroundTheme,
    borderTheme,
    textTheme
  } = useSelector(themeStates)

  const [shouldShowModal, setShouldShowModal] = useState(false)
  const [modalText, setModalText] = useState({
    title: 'Error',
    description: 'Something went wrong!'
  })
  const [locationDtos, setLocationDtos] = useState([])
  const [filteredLocationDtos, setFilteredLocationDtos] = useState([])
  const [priceStats, setPriceStats] = useState({
    min: 0,
    median: 0,
    max: 0
  })
  const [selectedLocationDto, setSelectedLocationDto] = useState({})
  const [shouldShowLoadingComponent, setShouldShowLoadingComponent] = useState(false)

  useEffect(() => {
    setShouldShowLoadingComponent(true)
    saleAndRentalListingsApi.getDefaultRentalListings()
      .then(_locationDtos => {
        setLocationDtos(_locationDtos)
        setFilteredLocationDtos(_locationDtos)
        setShouldShowLoadingComponent(false)
      })
      .catch(_error => {
        setShouldShowModal(true)
        setModalText({
          title: 'Error',
          description: `Server error: ${_error.message}, please try again later.`
        })
      })
      .finally(() => {
        setShouldShowLoadingComponent(false)
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
    backgroundTheme.invalid,
    backgroundTheme.valid,
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
            {shouldShowLoadingComponent
              ? <Loading title={LOADING_TITLE} containerClassName={'mt-1'} />
              : <p className={'mt-1 text-3xl/10 font-bold'}>
                $ {getValueBoxValueById(_valueBox.id)}
              </p>}
          </div>
        </section>
      })
  }, [
    borderTheme.secondaryColor300,
    getValueBoxBackgroundColorClassNameById,
    getValueBoxValueById,
    textTheme.primaryColor,
    textTheme.secondaryColor600,
    shouldShowLoadingComponent
  ])

  const onGoogleMarkerClick = (_locationDto) => {
    setSelectedLocationDto(_locationDto)
  }

  const renderField = (_label, _data, _shouldAddMarginBottom = true) => {
    return <p className={`text-wrap ${_shouldAddMarginBottom ? 'mb-2' : ''}`}>
      <span className={'font-medium'}>{_label}</span>
      : {_data}
    </p>
  }

  const listingInformation = useMemo(() => {
    return <>
      {renderField(
        'Full address',
        selectedLocationDto.fullAddress ?? '-')}
      {renderField(
        'Property type',
        selectedLocationDto.propertyType ?? '-')}
      {renderField(
        'Listing type',
        selectedLocationDto.listingType ?? '-')}
      {renderField(
        'Bedrooms',
        selectedLocationDto.bedrooms ?? '-')}
      {renderField(
        'Bathrooms',
        selectedLocationDto.bathrooms ?? '-')}
      {renderField(
        'Living area',
        selectedLocationDto.livingArea ?? '-')}
      {renderField(
        'Lot area',
        selectedLocationDto.lotArea ?? '-')}
      {renderField(
        'Year built',
        selectedLocationDto.yearBuilt ?? '-')}
      {renderField(
        'Price',
        selectedLocationDto.price ? `$ ${selectedLocationDto.price.toLocaleString()}` : '-')}
      {renderField(
        'HOA fee',
        selectedLocationDto.hoaFee ? `$ ${selectedLocationDto.hoaFee.toLocaleString()}` : '-')}
      {renderField(
        'Days on market',
        selectedLocationDto.daysOnMarket ?? '-',
        false)}
    </>
  }, [selectedLocationDto])

  const listingContact = useMemo(() => {
    return <>
      {renderField(
        'Office name',
        selectedLocationDto.listingOfficeName ?? '-')}
      {renderField(
        'Office phone',
        selectedLocationDto.listingOfficePhone ?? '-')}
      {renderField(
        'Office email',
        selectedLocationDto.listingOfficeEmail ?? '-')}
      {renderField(
        'Agent name',
        selectedLocationDto.listingAgentName ?? '-')}
      {renderField(
        'Agent phone',
        selectedLocationDto.listingOfficePhone ?? '-')}
      {renderField(
        'Agent email',
        selectedLocationDto.listingAgentEmail ?? '-',
        false)}
    </>
  }, [selectedLocationDto])

  const listingHistory = useMemo(() => {
    return <table className='min-w-full divide-y'>
      <thead>
        <tr>
          <th scope='col' className='pb-3.5 pr-3 font-medium text-left'>
            Date
          </th>
          <th scope='col' className='pb-3.5 pr-3 font-medium text-left'>
            Event
          </th>
          <th scope='col' className='pb-3.5 pr-3 font-medium text-left'>
            Price
          </th>
          <th scope='col' className='pb-3.5 font-medium text-left'>
            Days on Market
          </th>
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-300'>
        {selectedLocationDto.history?.map((item) => (
          <tr key={item.date}>
            <td className='py-4 pr-3 whitespace-nowrap'>{item.date}</td>
            <td className='py-4 pr-3 whitespace-nowrap'>{item.event}</td>
            <td className='py-4 pr-3 whitespace-nowrap'>$ {item.price.toLocaleString()}</td>
            <td className='py-4 whitespace-nowrap'>{item.daysOnMarket}</td>
          </tr>
        ))}
      </tbody>
    </table>
  }, [selectedLocationDto])

  return <Blog
    dateCreated={projectConstant.saleAndRentalListings.dateCreated}
    title={projectConstant.saleAndRentalListings.title}>
    <Modal
      shouldShowModal={shouldShowModal}
      onModalClose={setShouldShowModal}
      title={modalText.title}
      description={modalText.description}
      onPrimaryButtonClick={() => setShouldShowModal(false)} />
    <div className={`mb-6 ${textTheme.secondaryColor600}`}>
      <p className={'mb-6'}>
        This project searches for rental and sale listings in the US. As <span className={'font-medium'}>
          API key usage is limited
        </span> (50 times), please create your own account on the <a
          target='_blank'
          className={'font-medium underline'}
          href={'https://app.rentcast.io/app'} rel='noreferrer'>
          RentCast
        </a> website and generate an API key then paste it in the search panel.
      </p>
      <p className={'mb-2'}>
        Notes:
      </p>
      <ul className='list-disc pl-8'>
        <li>I won&#39;t store your API key, just use it to fetch data from RentCast API.</li>
        <li>The default data is sale data in New York city in New York state (last update 07/20/2025).</li>
        <li>The first load may be slow due to the free backend host.</li>
      </ul>
    </div>
    <SaleAndRentalListingsContext.Provider value={{
      priceStats,
      locationDtos,
      setLocationDtos,
      setFilteredLocationDtos,
      setSelectedLocationDto,
      setShouldShowLoadingComponent
    }}>
      <section className={'min-w-lg'}>
        <PanelBar />
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
              contentClassName={stringUtility.merge([
                'aspect-4/3',
                shouldShowLoadingComponent ? 'flex justify-center items-center' : ''
              ])}>
              {shouldShowLoadingComponent
                ? <Loading title={LOADING_TITLE} />
                : <GoogleMap
                  locationDtos={filteredLocationDtos}
                  onMarkerClick={onGoogleMarkerClick} />}
            </Card>
            <Card
              title={'Average price by Listing type'}
              containerClassName={'grow basis-1/2'}
              contentClassName={stringUtility.merge([
                'p-4 aspect-4/3',
                shouldShowLoadingComponent ? 'flex justify-center items-center' : ''
              ])}>
              {shouldShowLoadingComponent
                ? <Loading title={LOADING_TITLE} />
                : <AveragePriceByListingTypeChart locationDtos={filteredLocationDtos} />}
            </Card>
          </div>
          <div className={'grid sm:grid-cols-2 xl:grid-cols-4 gap-4'}>
            <Card
              containerClassName={''}
              title={'Listing information'}
              contentClassName={'p-4'}>
              {listingInformation}
            </Card>
            <Card
              containerClassName={'content-stretch flex flex-col'}
              title={'Listing contact'}
              contentClassName={'p-4 grow'}>
              {listingContact}
            </Card>
            <Card
              containerClassName={'sm:col-span-2 content-stretch flex flex-col'}
              title={'Listing history'}
              contentClassName={'p-4 grow'}>
              {listingHistory}
            </Card>
          </div>
        </section>
      </section>
    </SaleAndRentalListingsContext.Provider>
  </Blog>
}
