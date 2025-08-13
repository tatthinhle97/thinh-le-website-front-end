import {FilterIcon, RefreshIcon} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import iconConstant from '../../../../../constants/icon.jsx'
import panelNameConstant from '../../../../../constants/pages/sale-and-rental-listings/panel-name.jsx'
import rentCastConstant from '../../../../../constants/rentcast.jsx'
import {SaleAndRentalListingsContext} from '../../../../../contexts/sale-and-rental-listings.jsx'
import stringUtility from '../../../../../utilities/string.jsx'
import PrimaryButton from '../../../../buttons/primary.jsx'
import SecondaryButton from '../../../../buttons/secondary.jsx'
import ComboBox from '../../../../combo-box.jsx'
import RangeSlider from '../../../../range-slider/index.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme
  },
  createSelector
)

const propertyTypeOptions = Object.values(rentCastConstant.propertyType)
const listingTypeOptions = Object.values(rentCastConstant.listingType)
const livingAreaOptions = Object.values(rentCastConstant.livingAreaType)
const lotAreaOptions = Object.values(rentCastConstant.lotAreaType)

export default function FilterPanel({
  ref,
  className
}) {
  const {
    backgroundTheme,
    borderTheme
  } = useSelector(themeStates)

  const {
    locationDtos,
    setFilteredLocationDtos,
    setSelectedLocationDto,
    togglePanel
  } = useContext(SaleAndRentalListingsContext)

  const priceRangeSliderRef = useRef(null)
  // locationDtos is sorted in the backend
  const [priceRangeHanlders, setPriceRangeHanlders] = useState([
    0, 0
  ])
  const [propertyTypeValue, setPropertyTypeValue] = useState('')
  const [propertyTypeOption, setPropertyTypeOption] = useState('')
  const [listingTypeValue, setListingTypeValue] = useState('')
  const [listingTypeOption, setListingTypeOption] = useState('')
  const [livingAreaValue, setLivingAreaValue] = useState('')
  const [livingAreaOption, setLivingAreaOption] = useState('')
  const [lotAreaValue, setLotAreaValue] = useState('')
  const [lotAreaOption, setLotAreaOption] = useState('')

  useEffect(() => {
    setPriceRangeHanlders([
      locationDtos ? locationDtos[0]?.price : 0,
      locationDtos ? locationDtos[locationDtos.length - 1]?.price : 0
    ])
  }, [locationDtos])

  const setPriceRangeDisplayValue = (value) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0, // No decimals
      maximumFractionDigits: 0 // No decimals
    })

    return formatter.format(value)
  }

  const setPriceRangeReturnValue = (value) => {
    return Number(value.replace(/[$,]/g, ''))
  }

  const onPriceRangeChange = (handleValues) => {
    setPriceRangeHanlders([
      setPriceRangeReturnValue(handleValues[0]),
      setPriceRangeReturnValue(handleValues[1])
    ])
  }

  const resetPriceRange = useCallback(() => {
    setPriceRangeHanlders([
      locationDtos[0]?.price ?? 0,
      locationDtos[locationDtos.length - 1]?.price ?? 0
    ])
  }, [locationDtos])

  const onPropertyTypeValueChange = (_event) => {
    setPropertyTypeValue(_event.target.value)
  }

  const onPropertyTypeOptionChange = (_option) => {
    setPropertyTypeOption(_option)
  }

  const onListingTypeValueChange = (_event) => {
    setListingTypeValue(_event.target.value)
  }

  const onListingTypeOptionChange = (_option) => {
    setListingTypeOption(_option)
  }

  const onLivingAreaValueChange = (_event) => {
    setLivingAreaValue(_event.target.value)
  }

  const onLivingAreaOptionChange = (_option) => {
    setLivingAreaOption(_option)
  }

  const onLotAreaValueChange = (_event) => {
    setLotAreaValue(_event.target.value)
  }

  const onLotAreaOptionChange = (_option) => {
    setLotAreaOption(_option)
  }

  const onFilterButtonClick = () => {
    setSelectedLocationDto({})
    // Hide the filter panel by toggling the class name
    togglePanel(panelNameConstant.filter)

    const livingAreaRange = stringUtility.extractNumbers(livingAreaOption)
    const lotAreaRange = stringUtility.extractNumbersWithSuffixMultipliers(lotAreaOption)

    const filteredLocationDtos = locationDtos.filter(
      (_locationDto) => {
        if (_locationDto.price < priceRangeHanlders[0]
            || _locationDto.price > priceRangeHanlders[1]) {
          return false
        }

        if (propertyTypeOption && _locationDto.propertyType !== propertyTypeOption) {
          return false
        }

        if (listingTypeOption && _locationDto.listingType !== listingTypeOption) {
          return false
        }

        if (livingAreaRange) {
          if (livingAreaRange.length > 1) {
            if (_locationDto.livingArea < livingAreaRange[0]
            || _locationDto.livingArea > livingAreaRange[1]) {
              return false
            }
          } else {
            if (_locationDto.livingArea < livingAreaRange[0]) {
              return false
            }
          }
        }

        if (lotAreaRange) {
          if (lotAreaRange.length > 1) {
            if (_locationDto.lotArea < lotAreaRange[0]
                || _locationDto.lotArea > lotAreaRange[1]) {
              return false
            }
          } else {
            if (_locationDto.lotArea < lotAreaRange[0]) {
              return false
            }
          }
        }

        return true
      })

    setFilteredLocationDtos(filteredLocationDtos)
  }

  const onResetFilterButtonClick = () => {
    resetPriceRange()
    setPropertyTypeOption('')
    setListingTypeOption('')
    setLivingAreaOption('')
    setLotAreaOption('')
  }

  return <section
    ref={ref}
    className={stringUtility.merge([
      'p-4 border border-t-0 rounded-b-lg',
      borderTheme.secondaryColor300,
      backgroundTheme.primaryColor,
      className
    ])}>
    <RangeSlider
      containerClassName={'mb-4'}
      ref={priceRangeSliderRef}
      label={'Price range'}
      min={locationDtos ? locationDtos[0]?.price : 0}
      filteredMin={priceRangeHanlders[0] ?? 0}
      max={locationDtos ? locationDtos[locationDtos.length - 1]?.price : 0}
      filteredMax={priceRangeHanlders[1] ?? 0}
      step={10}
      toValue={setPriceRangeDisplayValue}
      fromValue={setPriceRangeReturnValue}
      onChange={onPriceRangeChange}
      tooltipClassName={'small-text'} />
    <div className={'grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'}>
      <ComboBox
        label={'Property type'}
        onComboBoxClose={() => setPropertyTypeValue('')}
        onOptionChange={onPropertyTypeOptionChange}
        onValueChange={onPropertyTypeValueChange}
        option={propertyTypeOption}
        options={propertyTypeOptions}
        optionsClassName={'z-2'}
        value={propertyTypeValue} />
      <ComboBox
        label={'Listing type'}
        onComboBoxClose={() => setListingTypeValue('')}
        onOptionChange={onListingTypeOptionChange}
        onValueChange={onListingTypeValueChange}
        option={listingTypeOption}
        options={listingTypeOptions}
        optionsClassName={'z-2'}
        value={listingTypeValue} />
      <ComboBox
        label={'Living area'}
        onComboBoxClose={() => setLivingAreaValue('')}
        onOptionChange={onLivingAreaOptionChange}
        onValueChange={onLivingAreaValueChange}
        option={livingAreaOption}
        options={livingAreaOptions}
        optionsClassName={'z-2'}
        value={livingAreaValue} />
      <ComboBox
        label={'Lot area'}
        onComboBoxClose={() => setLotAreaValue('')}
        onOptionChange={onLotAreaOptionChange}
        onValueChange={onLotAreaValueChange}
        option={lotAreaOption}
        options={lotAreaOptions}
        optionsClassName={'z-2'}
        value={lotAreaValue} />
    </div>
    <div className={'flex justify-center gap-4'}>
      <PrimaryButton
        ariaLabel={'Search listings button'}
        type={'submit'}
        onClick={onFilterButtonClick}
        className={'button-link-leading-icon min-w-fit'}>
        <HugeiconsIcon icon={FilterIcon} size={iconConstant.buttonIconSize} />
        Filter
      </PrimaryButton>
      <SecondaryButton
        ariaLabel={'Search listings button'}
        type={'submit'}
        onClick={onResetFilterButtonClick}
        className={'button-link-leading-icon min-w-fit'}>
        <HugeiconsIcon icon={RefreshIcon} size={iconConstant.buttonIconSize} />
        Reset filter
      </SecondaryButton>
    </div>
  </section>
}
