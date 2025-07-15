import {FilterIcon, FilterResetIcon, PreferenceHorizontalIcon, Search01Icon} from '@hugeicons-pro/core-solid-rounded'
import {HugeiconsIcon} from '@hugeicons/react'
import {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import iconConstant from '../../../../../constants/icon.jsx'
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

  const {priceStats} = useContext(SaleAndRentalListingsContext)

  const [filteredPriceRange, setFilteredPriceRange] = useState({
    min: 0,
    max: 10
  })
  const [livingAreaValue, setLivingAreaValue] = useState('')
  const [livingAreaOption, setLivingAreaOption] = useState('')
  const [lotAreaValue, setLotAreaValue] = useState('')
  const [lotAreaOption, setLotAreaOption] = useState('')

  const priceRangeSliderRef = useRef(null)

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
    setFilteredPriceRange({
      min: setPriceRangeReturnValue(handleValues[0]),
      max: setPriceRangeReturnValue(handleValues[1])
    })
  }

  const resetPriceRange = useCallback(() => {
    setFilteredPriceRange({
      min: priceStats.min,
      max: priceStats.max
    })
  }, [priceStats.max, priceStats.min])

  useEffect(() => {
    resetPriceRange()
  }, [resetPriceRange])

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
    return undefined
  }

  const onResetFilterButtonClick = () => {
    resetPriceRange()
    setLivingAreaOption('')
    setLotAreaOption('')
  }

  return <section
    ref={ref}
    className={stringUtility.merge([
      'p-4 border border-t-0',
      borderTheme.secondaryColor300,
      backgroundTheme.primaryColor,
      className
    ])}>
    <div className={'grid xl:grid-cols-5 gap-4 mb-4'}>
      <RangeSlider
        ref={priceRangeSliderRef}
        containerClassName={'xl:col-span-3'}
        label={'Price range'}
        min={priceStats.min}
        filteredMin={filteredPriceRange.min}
        max={priceStats.max}
        filteredMax={filteredPriceRange.max}
        step={10}
        toValue={setPriceRangeDisplayValue}
        fromValue={setPriceRangeReturnValue}
        onChange={onPriceRangeChange}
        tooltipClassName={'text-small-1'} />
      <div className={'xl:col-span-2 grid sm:grid-cols-2 gap-4'}>
        <ComboBox
          id={'livingArea'}
          isReadonly={true}
          isRequired={true}
          label={'Living area'}
          name={'livingArea'}
          onComboBoxClose={() => setLivingAreaValue('')}
          onOptionChange={onLivingAreaOptionChange}
          onValueChange={onLivingAreaValueChange}
          option={livingAreaOption}
          options={livingAreaOptions}
          optionsClassName={'z-2'}
          value={livingAreaValue} />
        <ComboBox
          id={'lotArea'}
          isReadonly={true}
          isRequired={true}
          label={'Lot area'}
          name={'lotArea'}
          onComboBoxClose={() => setLotAreaValue('')}
          onOptionChange={onLotAreaOptionChange}
          onValueChange={onLotAreaValueChange}
          option={lotAreaOption}
          options={lotAreaOptions}
          optionsClassName={'z-2'}
          value={lotAreaValue} />
      </div>
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
        <HugeiconsIcon icon={FilterResetIcon} size={iconConstant.buttonIconSize} />
        Reset filter
      </SecondaryButton>
    </div>
  </section>
}
