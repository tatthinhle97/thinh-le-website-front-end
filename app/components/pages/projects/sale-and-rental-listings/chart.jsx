import React, {memo, PureComponent, useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
import {
  Bar,
  BarChart,
  Label,
  ResponsiveContainer,
  Text, Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import {createSelector, createStructuredSelector} from 'reselect'

const themeStates = createStructuredSelector(
  {
    colorTheme: (_state) => _state.colorTheme
  },
  createSelector
)

const AveragePriceByPropertyTypeChart = memo(({
  locationDtos = []
}) => {
  const {
    colorTheme
  } = useSelector(themeStates)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkSize = () => setIsSmallScreen(window.innerWidth < 640)
    checkSize() // run once
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  const getAveragePrices = (_listingDtos) => {
    const grouped = {}

    _listingDtos.forEach(({price, propertyType}) => {
      if (!grouped[propertyType]) {
        grouped[propertyType] = {total: 0, count: 0}
      }

      if (price && price !== 0) {
        grouped[propertyType].total += price
        grouped[propertyType].count += 1
      }
    })

    return Object.entries(grouped).map(
      ([propertyType, {total, count}]) => ({
        propertyType,
        averagePrice: Math.round(total / count)
      }))
  }

  const averagePriceData = getAveragePrices(locationDtos)

  const CustomLabel = ({x, y, width, value}) => {
    return (
      <Text
        x={x + width / 2}
        y={y - 10}
        textAnchor='middle'
        fill={colorTheme.secondaryColor600}
        className={'small-text'}>
        {`$${value.toLocaleString()}`}
      </Text>
    )
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart data={averagePriceData} margin={{top: 22, left: 32, bottom: 22}}>
        <XAxis
          dataKey='propertyType'
          angle={isSmallScreen ? -45 : 0}
          textAnchor={isSmallScreen ? 'end' : 'middle'}
          className={'small-text'}
          height={isSmallScreen ? 82 : 24}
          tick={{fill: colorTheme.secondaryColor600}}>
          <Label
            value='Property Type'
            offset={-18}
            position='insideBottom'
            className={'normal-text'}
            fill={colorTheme.secondaryColor} />
        </XAxis>
        <YAxis
          dataKey='averagePrice'
          className={'small-text'}
          tick={{fill: colorTheme.secondaryColor600}}
          tickFormatter={(value) => `$${value.toLocaleString()}`}>
          <Label
            value='Average Price'
            offset={-24}
            angle={-90}
            position='insideLeft'
            className={'normal-text'}
            fill={colorTheme.secondaryColor} />
        </YAxis>
        <Bar
          dataKey='averagePrice'
          fill={colorTheme.accentColor700}
          label={<CustomLabel />} />
      </BarChart>
    </ResponsiveContainer>
  )
})

export default AveragePriceByPropertyTypeChart
