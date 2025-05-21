import {useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import saleAndRentalListingsApi from '../../../../apis/sale-and-rental-listings.js'
import pageMetadataConstant from '../../../../constants/metadata/page.jsx'
import panelNameConstant from '../../../../constants/pages/sale-and-rental-listings/panel-name.jsx'
import valueBoxConstant from '../../../../constants/pages/sale-and-rental-listings/value-box.jsx'
import projectConstant from '../../../../constants/project.jsx'
import stringUtility from '../../../../utilities/string.jsx'
import Blog from '../../../blog.jsx'
import SaleAndRentalListingsContext from '../../../../contexts/sale-and-rental-listings.jsx'
import PanelBar from './panel-bar.jsx'

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
  loaderData
}) {
  const {
    backgroundTheme,
    borderTheme,
    textTheme
  } = useSelector(themeStates)

  const searchPanelRef = useRef(null)
  const filterPanelRef = useRef(null)

  const [listings, setListings] = useState(loaderData)
  const [activePanelName, setActivePanelName] = useState(undefined)
  const [isSearchFormValidationEnabled, setIsSearchFormValidationEnabled]
      = useState(false)

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

  const hidePanelByName = (_panelName) => {
    const panelElement = getPanelByName(_panelName)

    if (!panelElement.classList.contains('hidden')) {
      panelElement.classList.toggle('hidden')
      setActivePanelName(undefined)
    }
  }

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

  const onContentContainerClick = () => {
    Object.values(panelNameConstant).forEach((_panelName) => {
      hidePanelByName(_panelName)
    })
    setIsSearchFormValidationEnabled(false)
  }

  const renderValueBoxBackgroundColorById = (_id) => {
    switch (_id) {
    case valueBoxConstant.bestDeal.id:
      return backgroundTheme.valid600
    case valueBoxConstant.medianPrice.id:
      return backgroundTheme.warning400
    default: // 'mostExpensive'
      return backgroundTheme.invalid600
    }
  }

  return <Blog
    dateCreated={projectConstant.saleAndRentalListings.dateCreated}
    title={projectConstant.saleAndRentalListings.title}
    contentClassName={stringUtility.merge([
      'relative',
      borderTheme.secondaryColor300
    ])}>
    <section
      className={stringUtility.merge([
        'mt-12 relative'
      ])}>
      <SaleAndRentalListingsContext.Provider
        value={{
          listings, setListings,
          searchPanelRef, filterPanelRef,
          isSearchFormValidationEnabled, setIsSearchFormValidationEnabled,
          togglePanel
        }}>
        <PanelBar />
        <section
          className={stringUtility.merge([
            'p-4 border border-t-0 flex flex-col gap-4',
            backgroundTheme.primaryColor
          ])}
          onClick={onContentContainerClick}>
          {/* Value boxes */}
          <div className={'flex flex-col md:flex-row gap-4'}>
            {valueBoxConstant.allValueBoxes.map(
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
              })}
          </div>
          <div className={'flex flex-col lg:flex-row content-gap'}>
            <div className={'basis-1/2'}>test</div>
          </div>
        </section>
      </SaleAndRentalListingsContext.Provider>
    </section>
  </Blog>
}
