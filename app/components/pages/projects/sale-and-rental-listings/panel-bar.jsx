import {HugeiconsIcon} from '@hugeicons/react'
import {Search01Icon} from '@hugeicons-pro/core-solid-rounded'
import {FilterIcon} from '@hugeicons-pro/core-stroke-rounded'
import {useCallback, useContext, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import iconConstant from '../../../../constants/icon.jsx'
import panelNameConstant from '../../../../constants/pages/sale-and-rental-listings/panel-name.jsx'
import {SaleAndRentalListingsContext} from '../../../../contexts/sale-and-rental-listings.jsx'
import stringUtility from '../../../../utilities/string.jsx'
import IconButton from '../../../buttons/icon.jsx'
import FilterPanel from './panels/filter.jsx'
import SearchPanel from './panels/search.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme,
    textTheme: (_state) => _state.textTheme
  },
  createSelector
)

export default function PanelBar() {
  const {
    backgroundTheme,
    borderTheme,
    textTheme
  } = useSelector(themeStates)

  const saleAndRentalListingsContext = useContext(SaleAndRentalListingsContext)

  const panelRef = useRef(null)
  const searchPanelRef = useRef(null)
  const filterPanelRef = useRef(null)

  const [activePanelName, setActivePanelName] = useState(undefined)

  const getPanelByName = (_panelName) => {
    switch (_panelName) {
    case panelNameConstant.search:
      return searchPanelRef.current
    default: // 'filter'
      return filterPanelRef.current
    }
  }

  const showPanelByName = (_panelName) => {
    const panelElement = getPanelByName(_panelName)

    if (panelElement.classList.contains('hidden')) {
      panelElement.classList.toggle('hidden')
      setActivePanelName(_panelName)
    }
  }

  const hidePanelByName = useCallback((_panelName) => {
    const panelElement = getPanelByName(_panelName)

    if (!panelElement.classList.contains('hidden')) {
      panelElement.classList.toggle('hidden')
      setActivePanelName(undefined)
    }
  }, [])

  const togglePanel = (_panelName) => {
    if (activePanelName) {
      if (activePanelName === _panelName) {
        hidePanelByName(activePanelName)
      } else {
        hidePanelByName(activePanelName)
        showPanelByName(_panelName)
      }
    } else {
      showPanelByName(_panelName)
    }
  }

  const onSearchIconButtonClick = (_event) => {
    _event.preventDefault()
    togglePanel(panelNameConstant.search)
  }

  const onFilterIconButtonClick = (_event) => {
    _event.preventDefault()
    togglePanel(panelNameConstant.filter)
  }

  return <section
    ref={panelRef}
    className={stringUtility.merge([
      'relative z-1'
    ])}>
    <div className={stringUtility.merge([
      'border p-4 rounded-t-lg',
      'flex justify-end gap-x-4 items-center',
      backgroundTheme.secondaryColor,
      borderTheme.secondaryColor
    ])}>
      <IconButton
        ariaLabel={'Search icon button'}
        onClick={onSearchIconButtonClick}
        className={`cursor-pointer ${textTheme.primaryColor}`}>
        <HugeiconsIcon icon={Search01Icon} size={iconConstant.defaultSize} />
      </IconButton>
      <IconButton
        ariaLabel={'Filter icon button'}
        onClick={onFilterIconButtonClick}
        className={`cursor-pointer ${textTheme.primaryColor}`}>
        <HugeiconsIcon icon={FilterIcon} size={iconConstant.defaultSize} />
      </IconButton>
    </div>
    <SaleAndRentalListingsContext.Provider value={{
      ...saleAndRentalListingsContext,
      activePanelName,
      togglePanel
    }}>
      <SearchPanel
        ref={searchPanelRef}
        className={stringUtility.merge([
          'hidden absolute inset-x-0'
        ])} />
      <FilterPanel
        ref={filterPanelRef}
        className={'hidden absolute inset-x-0'} />
    </SaleAndRentalListingsContext.Provider>
  </section>
}
