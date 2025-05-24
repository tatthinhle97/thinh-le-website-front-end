import noUiSlider from 'nouislider'
import {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import renderUtility from '../../utilities/render.jsx'
import stringUtility from '../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    backgroundTheme: (_state) => _state.backgroundTheme,
    borderTheme: (_state) => _state.borderTheme
  },
  createSelector
)

export default function RangeSlider({
  label,
  min = 0,
  max = 100,
  behaviour = 'drag-tap',
  step,
  toValue,
  fromValue,
  onChange,
  containerClassName,
  tooltipClassName
}) {
  const {
    backgroundTheme,
    borderTheme
  } = useSelector(themeStates)

  const rangeSliderRef = useRef(null)
  const rangeSliderContainerRef = useRef(null)

  useEffect(() => {
    const rangeSliderElement = rangeSliderRef.current

    if (!rangeSliderElement) {
      return
    }

    /* Create the range slider */
    noUiSlider.create(rangeSliderElement, {
      start: [min, max],
      behaviour: behaviour,
      step: step,
      connect: [false, true, false],
      tooltips: true,
      range: {
        'min': min,
        'max': max
      },
      format: {
        // 'to': how the value is displayed
        to: toValue,
        // 'from': how to convert a formatted input value back to the slider's
        // internal numerical representation
        from: fromValue
      },
      cssPrefix: '', // defaults to 'noUi-',
      cssClasses: {
        target: stringUtility.merge([
          'noUi-target rounded-full border',
          borderTheme.secondaryColor300
        ]),
        base: 'noUi-base w-full h-full relative z-1',
        connects: stringUtility.merge([
          'noUi-connects w-full h-full relative z-0 overflow-hidden',
          'rounded-full'
        ]),
        connect: stringUtility.merge([
          'noUi-connect will-change-transform absolute z-1 top-0 right-0',
          'w-full h-full origin-top-left',
          backgroundTheme.accentColor700
        ]),
        origin: stringUtility.merge([
          'noUi-origin will-change-transform absolute z-1 top-0 right-0',
          'w-full h-full origin-top-left h-0'
        ]),
        textDirectionRtl: 'noUi-txt-dir-rtl',
        horizontal: 'noUi-horizontal h-2',
        vertical: 'noUi-vertical',
        handle: stringUtility.merge([
          'noUi-handle backface-hidden absolute rounded-full cursor-pointer',
          'h-3 lg:h-4 w-3 lg:w-4 transition-range-slider-handle box-content',
          // top = (height - horizontal height) / 2
          '-top-1.75 lg:-top-2.5',
          // right = width / 2
          '-right-2.5 lg:-right-3.25 border-4 lg:border-5',
          backgroundTheme.primaryColor,
          borderTheme.secondaryColor300,
          borderTheme.active.accentColor700,
          borderTheme.hover.accentColor700
        ]),
        touchArea: 'noUi-touch-area',
        tap: 'noUi-state-tap',
        drag: 'noUi-state-drag',
        draggable: 'cursor-ew-resize',
        active: 'noUi-active',
        pips: 'noUi-pips',
        value: 'noUi-value',
        valueSub: 'noUi-value-sub',
        marker: 'noUi-marker',
        markerSub: 'noUi-marker-sub',
        markerLarge: 'noUi-marker-large',
        pipsHorizontal: 'noUi-pips-horizontal',
        valueHorizontal: 'noUi-value-horizontal',
        rtl: 'noUi-rtl',
        markerHorizontal: 'noUi-marker-horizontal',
        pipsVertical: 'noUi-pips-vertical',
        valueVertical: 'noUi-value-vertical',
        markerVertical: 'noUi-marker-vertical',
        tooltip: stringUtility.merge([
          'noUi-tooltip absolute py-0.5 px-1 border rounded-small-1',
          'text-center whitespace-nowrap -translate-x-1/2 left-1/2',
          'bottom-5 lg:bottom-6.25',
          borderTheme.secondaryColor300,
          tooltipClassName
        ])
      }
    })

    /* Create on change event */
    rangeSliderElement.noUiSlider.on('change', onChange)

    /* Set the padding x for rangeSliderContainerRef */
    const tooltipElements = rangeSliderElement.querySelectorAll('.noUi-tooltip')
    let maxTooltipElementWidth = 0

    tooltipElements.forEach((_tooltipElement) => {
      const tooltipElementWidth = _tooltipElement.getBoundingClientRect().width

      if (tooltipElementWidth > maxTooltipElementWidth) {
        maxTooltipElementWidth = tooltipElementWidth
      }
    })

    // Apply the padding to left and right only
    rangeSliderContainerRef.current.style.paddingLeft
        = `${maxTooltipElementWidth / 2}px`
    rangeSliderContainerRef.current.style.paddingRight
        = `${maxTooltipElementWidth / 2}px`

    return () => {
      rangeSliderElement.noUiSlider.destroy()
    }
  }, [
    backgroundTheme.accentColor700,
    backgroundTheme.primaryColor,
    behaviour,
    borderTheme.accentColor700,
    borderTheme.active.accentColor700,
    borderTheme.hover.accentColor700,
    borderTheme.secondaryColor300,
    fromValue, max, min, onChange, step, toValue, tooltipClassName]
  )

  return <div className={stringUtility.merge([
    containerClassName
  ])}>
    {renderUtility.renderIfTrue(label, <label
      className={'font-medium'}>
      {label}
    </label>)}
    <div
      ref={rangeSliderContainerRef}
      className={stringUtility.merge([
        label ? 'mt-2' : '',
        'pb-1.5 lg:pb-2.25 pt-9 lg:pt-10.75'
      ])}>
      <div
        ref={rangeSliderRef}></div>
    </div>
  </div>
}
