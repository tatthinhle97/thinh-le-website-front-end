import {HugeiconsIcon} from '@hugeicons/react'
import {Search01Icon} from '@hugeicons-pro/core-solid-rounded'
import {useContext, useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import locationApi from '../../../../../apis/location.js'
import iconConstant from '../../../../../constants/icon.jsx'
import panelNameConstant from '../../../../../constants/pages/sale-and-rental-listings/panel-name.jsx'
import rentCastConstant from '../../../../../constants/rentcast.jsx'
import {SaleAndRentalListingsContext} from '../../../../../contexts/sale-and-rental-listings.jsx'
import stringUtility from '../../../../../utilities/string.jsx'
import PrimaryButton from '../../../../buttons/primary.jsx'
import ComboBox from '../../../../combo-box.jsx'
import NumberInput from '../../../../inputs/number.jsx'
import TextInput from '../../../../inputs/text.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme
  },
  createSelector
)

const propertyTypeOptions = Object.values(rentCastConstant.propertyType)
const forOptions = Object.values(rentCastConstant.forType)

export default function SearchPanel({
  ref,
  className
}) {
  const {
    backgroundTheme,
    borderTheme
  } = useSelector(themeStates)

  const {activePanelName, setSelectedLocation, togglePanel} = useContext(SaleAndRentalListingsContext)

  const [shouldValidateForm, setShouldValidateForm] = useState(true)
  const [forValue, setForValue] = useState('')
  const [forOption, setForOption] = useState(forOptions[0])
  const [states, setStates] = useState([])
  const [cityNames, setCityNames] = useState([])
  const [stateNameValue, setStateNameValue] = useState('')
  const [stateNameOption, setStateNameOption] = useState('New Jersey')
  const [cityNameValue, setCityNameValue] = useState('')
  const [cityNameOption, setCityNameOption] = useState('Atlantic City')
  const [zipCodeValue, setZipCodeValue]
      = useState('')
  const [propertyTypeValue, setPropertyTypeValue]
    = useState('')
  const [
    propertyTypeOption,
    setPropertyTypeOption
  ] = useState('')
  const [numberOfBedRoomsValue, setNumberOfBedRoomsValue]
    = useState('')
  const [numberOfBathRoomsValue, setNumberOfBathRoomsValue]
    = useState('')

  useEffect(() => {
    if (activePanelName !== panelNameConstant.search
    || ref.current.classList.contains('hidden')) {
      setShouldValidateForm(false)
    }
  }, [activePanelName, ref])

  useEffect(() => {
    // Get all the states when the component first loaded
    locationApi.getStates().then(data => setStates(data))
  }, [])

  const stateNames = useMemo(() => {
    return states
      ? states.map(_state => _state.name)
      : []
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

  const onSearchPanelFormSubmit = (_event) => {
    _event.preventDefault()

    if (!_event.target.checkValidity()) {
      setShouldValidateForm(true)
      return
    }
    setSelectedLocation({})
    // Hide the search panel by toggling the class name
    togglePanel(panelNameConstant.search)

    setShouldValidateForm(false)

    const formData = new FormData(_event.target)
    const data = Object.fromEntries(formData.entries())
    console.log('TODO:', data)
  }

  const onForValueChange = (_event) => {
    setForValue(_event.target.value)
  }

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

  const onZipCodeValueChange = (_event) => {
    setZipCodeValue(_event.target.value)
  }

  const onPropertyTypeOptionChange = (_option) => {
    setPropertyTypeOption(_option)
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
    <form onSubmit={onSearchPanelFormSubmit} noValidate>
      <div className={'grid sm:grid-cols-3 2xl:grid-cols-10 gap-4 mb-4'}>
        <ComboBox
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
        <ComboBox
          containerClassName={'2xl:col-span-2'}
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
          containerClassName={'2xl:col-span-2'}
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
        <TextInput
          id={'zipCode'}
          shouldValidate={shouldValidateForm}
          label={'Zip code'}
          name={'zipCode'}
          onValueChange={onZipCodeValueChange}
          value={zipCodeValue} />
        <ComboBox
          containerClassName={'2xl:col-span-2'}
          id={'propertyType'}
          label={'Property type'}
          name={'propertyType'}
          onComboBoxClose={() => setPropertyTypeValue('')}
          onOptionChange={onPropertyTypeOptionChange}
          onValueChange={onPropertyTypeValueChange}
          option={propertyTypeOption}
          options={propertyTypeOptions}
          optionsClassName={'z-40'}
          value={propertyTypeValue} />
        <NumberInput
          id={'numberOfBedRooms'}
          shouldValidate={shouldValidateForm}
          label={'Bedrooms'}
          min={1}
          name={'numberOfBedRooms'}
          onValueChange={onNumberOfBedRoomsValueChange}
          validationMessage={'Number must greater than 0'}
          value={numberOfBedRoomsValue} />
        <NumberInput
          id={'numberOfBathRooms'}
          shouldValidate={shouldValidateForm}
          label={'BathRooms'}
          min={1}
          name={'numberOfBathRooms'}
          onValueChange={onNumberOfBathRoomsValueChange}
          validationMessage={'Number must greater than 0'}
          value={numberOfBathRoomsValue} />
      </div>
      <PrimaryButton
        ariaLabel={'Search listings button'}
        type={'submit'}
        className={'button-link-leading-icon mx-auto min-w-fit'}>
        <HugeiconsIcon icon={Search01Icon} size={iconConstant.buttonIconSize} />
        Search
      </PrimaryButton>
    </form>
  </section>
}
