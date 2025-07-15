import {HugeiconsIcon} from '@hugeicons/react'
import {FilterIcon, Search01Icon} from '@hugeicons-pro/core-solid-rounded'
import {useCallback, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import iconConstant from '../../../../constants/icon.jsx'
import panelNameConstant from '../../../../constants/pages/sale-and-rental-listings/panel-name.jsx'
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

  const panelRef = useRef(null)
  const searchPanelRef = useRef(null)
  const filterPanelRef = useRef(null)

  const [activePanelName, setActivePanelName] = useState(undefined)
  const [shouldValidateSearchPanel, setShouldValidateSearchPanel] = useState(false)

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
    setShouldValidateSearchPanel(false)
    togglePanel(panelNameConstant.search)
  }

  const onFilterIconButtonClick = (_event) => {
    _event.preventDefault()
    setShouldValidateSearchPanel(false)
    togglePanel(panelNameConstant.filter)
  }

  const onSearchPanelFormSubmit = (_event) => {
    _event.preventDefault()

    if (!_event.target.checkValidity()) {
      setShouldValidateSearchPanel(true)
      return
    }

    setShouldValidateSearchPanel(false)

    const formData = new FormData(_event.target)
    const data = Object.fromEntries(formData.entries())
    console.log('TODO:', data)

    // Hide the search panel by toggling the class name
    togglePanel(panelNameConstant.search)
  }

  return <section
    ref={panelRef}
    className={stringUtility.merge([
      'relative z-1',
      backgroundTheme.primaryColor
    ])}>
    <div className={stringUtility.merge([
      'border p-4 rounded-t-lg',
      'flex justify-end gap-x-4 items-center',
      borderTheme.secondaryColor300
    ])}>
      <IconButton
        ariaLabel={'Search icon button'}
        onClick={onSearchIconButtonClick}
        className={'wh-normal cursor-pointer'}>
        <HugeiconsIcon icon={Search01Icon} size={iconConstant.defaultSize} />
      </IconButton>
      <IconButton
        ariaLabel={'Filter icon button'}
        onClick={onFilterIconButtonClick}
        className={'wh-normal cursor-pointer'}>
        <HugeiconsIcon icon={FilterIcon} size={iconConstant.defaultSize} />
      </IconButton>
    </div>
    <SearchPanel
      ref={searchPanelRef}
      shouldValidateForm={shouldValidateSearchPanel}
      onFormSubmit={onSearchPanelFormSubmit}
      className={stringUtility.merge([
        'hidden absolute inset-x-0'
      ])} />
    <FilterPanel
      ref={filterPanelRef}
      className={'hidden absolute inset-x-0'} />
  </section>
}
