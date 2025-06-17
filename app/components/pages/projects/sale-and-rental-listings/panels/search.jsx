import {HugeiconsIcon} from '@hugeicons/react'
import {Search01Icon} from '@hugeicons-pro/core-solid-rounded'
import {useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import locationApi from '../../../../../apis/location.js'
import rentCastConstant from '../../../../../constants/rentcast.jsx'
import stringUtility from '../../../../../utilities/string.jsx'
import PrimaryButton from '../../../../buttons/primary.jsx'
import ComboBox from '../../../../combo-box.jsx'
import NumberInput from '../../../../inputs/number.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme
  },
  createSelector
)

const propertyTypeOptions = Object.values(rentCastConstant.propertyType)

const forOptions = ['Rent', 'Sale']

export default function SearchPanel({
  ref,
  onFormSubmit,
  shouldValidateForm = false,
  className
}) {
  const {
    backgroundTheme,
    borderTheme
  } = useSelector(themeStates)

  const [states, setStates] = useState([])
  const [cityNames, setCityNames] = useState([])
  const [stateNameValue, setStateNameValue] = useState('')
  const [stateNameOption, setStateNameOption] = useState(
    'New Jersey')
  const [cityNameValue, setCityNameValue] = useState('')
  const [cityNameOption, setCityNameOption] = useState(
    'Atlantic City')
  const [propertyTypeValue, setPropertyTypeValue]
    = useState('')
  const [
    propertyTypeOption,
    setPropertyTypeOption
  ] = useState(propertyTypeOptions[0])
  const [forValue, setForValue] = useState('')
  const [forOption, setForOption] = useState(forOptions[0])
  const [numberOfBedRoomsValue, setNumberOfBedRoomsValue]
    = useState('')
  const [numberOfBathRoomsValue, setNumberOfBathRoomsValue]
    = useState('')

  useEffect(() => {
    // Get all the states when the component first loaded
    locationApi.getStates().then(data => setStates(data))
  }, [])

  const stateNames = useMemo(() => {
    return states.map(_state => _state.name)
  }, [states])

  useEffect(() => {
    // Get all the cities by state code when the state name changed
    if (stateNameOption) {
      locationApi.getCitiesByStateName(stateNameOption)
        .then(data => setCityNames(data))
    } else {
      setCityNames([])
    }
  }, [stateNameOption])

  const onStateNameValueChange = (_event) => {
    setStateNameValue(_event.target.value)
  }

  const onStateNameOptionChange = (_option) => {
    if (_option !== stateNameOption) {
      setCityNameOption('')
      setStateNameOption(_option)
    }
  }

  const onCityNameValueChange = (_event) => {
    setCityNameValue(_event.target.value)
  }

  const onCityNameOptionChange = (_option) => {
    setCityNameOption(_option)
  }

  const onPropertyTypeValueChange = (_event) => {
    setPropertyTypeValue(_event.target.value)
  }

  const onPropertyTypeOptionChange = (_option) => {
    setPropertyTypeOption(_option)
  }

  const onForValueChange = (_event) => {
    setForValue(_event.target.value)
  }

  const onForOptionChange = (_option) => {
    setForOption(_option)
  }

  const onNumberOfBedRoomsValueChange = (_event) => {
    setNumberOfBedRoomsValue(_event.target.value)
  }

  const onNumberOfBathRoomsValueChange = (_event) => {
    setNumberOfBathRoomsValue(_event.target.value)
  }

  return <section
    ref={ref}
    className={stringUtility.merge([
      'p-4 border border-t-0',
      borderTheme.secondaryColor300,
      backgroundTheme.primaryColor,
      className
    ])}>
    {/* [Form tip]: noValidate is to disable built-in form validation */}
    <form onSubmit={onFormSubmit} noValidate>
      <div className={'flex flex-col 2xl:flex-row content-gap'}>
        <div className={'flex flex-col xs:flex-row content-gap xs:basis-1/3'}>
          <ComboBox
            containerClassName={'basis-1/2'}
            id={'state'}
            isRequired={true}
            shouldValidate={shouldValidateForm}
            label={'State'}
            name={'state'}
            onComboBoxClose={() => setStateNameValue('')}
            onOptionChange={onStateNameOptionChange}
            onValueChange={onStateNameValueChange}
            option={stateNameOption}
            options={stateNames}
            optionsClassName={'z-40'}
            value={stateNameValue} />
          <ComboBox
            containerClassName={'basis-1/2'}
            id={'city'}
            isRequired={true}
            shouldValidate={shouldValidateForm}
            isVirtualScrolling={true}
            label={'City'}
            name={'city'}
            onComboBoxClose={() => setCityNameValue('')}
            onOptionChange={onCityNameOptionChange}
            onValueChange={onCityNameValueChange}
            option={cityNameOption}
            options={cityNames}
            optionsClassName={'z-40'}
            value={cityNameValue} />
        </div>
        <div className={'flex flex-col xs:flex-row content-gap xs:basis-1/3'}>
          <ComboBox
            containerClassName={'basis-1/2'}
            id={'propertyType'}
            isReadonly={true}
            isRequired={true}
            label={'Property type'}
            name={'propertyType'}
            onComboBoxClose={() => setPropertyTypeValue('')}
            onOptionChange={onPropertyTypeOptionChange}
            onValueChange={onPropertyTypeValueChange}
            option={propertyTypeOption}
            options={propertyTypeOptions}
            optionsClassName={'z-40'}
            value={propertyTypeValue} />
          <ComboBox
            containerClassName={'basis-1/2'}
            id={'for'}
            isReadonly={true}
            isRequired={true}
            label={'For'}
            name={'for'}
            onComboBoxClose={() => setForValue('')}
            onOptionChange={onForOptionChange}
            onValueChange={onForValueChange}
            option={forOption}
            options={forOptions}
            optionsClassName={'z-40'}
            value={forValue} />
        </div>
        <div className={'flex flex-col xs:flex-row content-gap xs:basis-1/3'}>
          <NumberInput
            containerClassName={'basis-1/2'}
            id={'numberOfBedRooms'}
            shouldValidate={shouldValidateForm}
            label={'Number of bedrooms'}
            min={1}
            name={'numberOfBedRooms'}
            onValueChange={onNumberOfBedRoomsValueChange}
            validationMessage={'Number must greater than 0'}
            value={numberOfBedRoomsValue} />
          <NumberInput
            containerClassName={'basis-1/2'}
            id={'numberOfBathRooms'}
            shouldValidate={shouldValidateForm}
            label={'Number of bathrooms'}
            min={1}
            name={'numberOfBathRooms'}
            onValueChange={onNumberOfBathRoomsValueChange}
            validationMessage={'Number must greater than 0'}
            value={numberOfBathRoomsValue} />
        </div>
      </div>
      <PrimaryButton
        ariaLabel={'Search'}
        type={'submit'}
        className={'button-link-leading-icon min-w-fit content-mt mx-auto'}>
        <HugeiconsIcon icon={Search01Icon} className={'wh-normal'} />
        Search
      </PrimaryButton>
    </form>
  </section>
}
