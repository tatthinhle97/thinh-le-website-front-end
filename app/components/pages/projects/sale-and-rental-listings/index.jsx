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

  const [saleAndRentalListingsDto, setSaleAndRentalListingsDto] = useState()

  useEffect(() => {
    saleAndRentalListingsApi.getInitialSaleListings().then(data => setSaleAndRentalListingsDto(data))
  }, [])

  const renderValueBoxBackgroundColorById = useCallback((_id) => {
    switch (_id) {
    case valueBoxConstant.bestDeal.id:
      return backgroundTheme.valid600
    case valueBoxConstant.medianPrice.id:
      return backgroundTheme.warning400
    default: // 'mostExpensive'
      return backgroundTheme.invalid600
    }
  }, [backgroundTheme.invalid600, backgroundTheme.valid600, backgroundTheme.warning400])

  const valueBoxes = useMemo(() => {
    console.log('VALUE BOXES rerendered')
    return valueBoxConstant.allValueBoxes.map(
      (_valueBox, _index) => {
        return <section
          key={_index}
          className={stringUtility.merge([
            'basis-1/3 p-4 border rounded-big-1',
            'flex content-gap items-center',
            borderTheme.secondaryColor300
          ])}>
          <div
            className={stringUtility.merge([
              renderValueBoxBackgroundColorById(_valueBox.id),
              'p-2 w-fit rounded-normal h-fit',
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
            <p className={'mt-1 text-big-2 font-bold'}>$ 4,000,000</p>
          </div>
        </section>
      })
  }, [
    borderTheme.secondaryColor300,
    renderValueBoxBackgroundColorById,
    textTheme.primaryColor,
    textTheme.secondaryColor600
  ])

  const [locations, coordinates] = useMemo(() => {
    return saleAndRentalListingsDto
      ? [saleAndRentalListingsDto.locations, saleAndRentalListingsDto.coordinates]
      : [[], []]
  }, [saleAndRentalListingsDto])

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
    const iconSize = 18
    switch (_propertyType) {
    case rentCastConstant.propertyType.singleFamily:
      return createMapIcon(<HugeiconsIcon icon={Home01Icon} size={iconSize} />)
    case rentCastConstant.propertyType.multiFamily:
      return createMapIcon(<HugeiconsIcon icon={House05Icon} size={iconSize} />)
    case rentCastConstant.propertyType.condo:
      return createMapIcon(<HugeiconsIcon icon={RealEstate01Icon} size={iconSize} />)
    case rentCastConstant.propertyType.townhouse:
      return createMapIcon(<HugeiconsIcon icon={House01Icon} size={iconSize} />)
    case rentCastConstant.propertyType.manufactured:
      return createMapIcon(<HugeiconsIcon icon={FactoryIcon} size={iconSize} />)
    case rentCastConstant.propertyType.apartment:
      return createMapIcon(<HugeiconsIcon icon={Building05Icon} size={iconSize} />)
    default: // land
      return createMapIcon(<HugeiconsIcon icon={PinLocation03Icon} size={iconSize} />)
    }
  }, [createMapIcon])

  return <Blog
    dateCreated={projectConstant.saleAndRentalListings.dateCreated}
    title={projectConstant.saleAndRentalListings.title}
    contentClassName={stringUtility.merge([
      'relative',
      borderTheme.secondaryColor300
    ])}>
    <section>
      <PanelBar />
      <section
        className={stringUtility.merge([
          'p-4 border border-t-0 flex flex-col gap-4',
          backgroundTheme.primaryColor
        ])}>
        {/* Value boxes */}
        <div className={'flex flex-col md:flex-row gap-4'}>
          {valueBoxes}
        </div>
        <div className={'flex flex-col lg:flex-row content-gap'}>
          <div className={'basis-1/2'}>test</div>
          <GoogleMap
            locations={locations}
            coordinates={coordinates}
            onIconRender={(_location) => getMapIconByPropertyType(_location.propertyType)}
            className={'basis-1/2'} />
        </div>
      </section>
    </section>
  </Blog>
}
