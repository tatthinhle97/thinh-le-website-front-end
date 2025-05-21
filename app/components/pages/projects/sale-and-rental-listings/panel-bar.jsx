import {HugeiconsIcon} from '@hugeicons/react'
import {PreferenceHorizontalIcon, Search01Icon} from '@hugeicons-pro/core-solid-rounded'
import {useContext} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import panelNameConstant from '../../../../constants/pages/sale-and-rental-listings/panel-name.jsx'
import SaleAndRentalListingsContext from '../../../../contexts/sale-and-rental-listings.jsx'
import stringUtility from '../../../../utilities/string.jsx'
import IconButton from '../../../buttons/icon.jsx'
import FilterPanel from './panels/filter.jsx'
import SearchPanel from './panels/search.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme
  },
  createSelector
)

export default function PanelBar() {
  const {
    backgroundTheme,
    borderTheme
  } = useSelector(themeStates)

  const {
    togglePanel,
    setIsSearchFormValidationEnabled
  } = useContext(SaleAndRentalListingsContext)

  const onSearchIconButtonClick = (_event) => {
    _event.preventDefault()
    setIsSearchFormValidationEnabled(false)
    togglePanel(panelNameConstant.search)
  }

  const onFilterIconButtonClick = (_event) => {
    _event.preventDefault()
    setIsSearchFormValidationEnabled(false)
    togglePanel(panelNameConstant.filter)
  }

  return <section className={stringUtility.merge([
    'sticky top-19 lg:top-20 z-40',
    backgroundTheme.primaryColor
  ])}>
    <div className={stringUtility.merge([
      'border p-4 rounded-t-big-1',
      'flex justify-end gap-4 items-center',
      borderTheme.secondaryColor300
    ])}>
      <IconButton
        ariaLabel={'Search icon button'}
        onClick={onSearchIconButtonClick}
        className={'wh-normal'}>
        <HugeiconsIcon icon={Search01Icon} />
      </IconButton>
      <IconButton
        ariaLabel={'Filter icon button'}
        onClick={onFilterIconButtonClick}
        className={'wh-normal'}>
        <HugeiconsIcon icon={PreferenceHorizontalIcon} />
      </IconButton>
    </div>
    <SearchPanel
      className={stringUtility.merge([
        'hidden absolute inset-x-0'
      ])} />
    <FilterPanel
      className={'hidden absolute inset-x-0'} />
  </section>
}
