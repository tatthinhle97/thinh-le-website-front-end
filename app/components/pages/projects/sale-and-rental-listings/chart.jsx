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
import stringUtility from '../../../../utilities/string.jsx'

const themeStates = createStructuredSelector(
  {
    colorTheme: (_state) => _state.colorTheme
  },
  createSelector
)

const AveragePriceByListingTypeChart = memo(({
  locationDtos = []
}) => {
  const {
    colorTheme
  } = useSelector(themeStates)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkSize = () => setIsSmallScreen(window.innerWidth < 1024)
    checkSize() // run once
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  const getAveragePrices = (_listingDtos) => {
    const grouped = {}

    _listingDtos.forEach(({price, listingType}) => {
      if (!grouped[listingType]) {
        grouped[listingType] = {total: 0, count: 0}
      }

      if (price && price !== 0) {
        grouped[listingType].total += price
        grouped[listingType].count += 1
      }
    })

    return Object.entries(grouped).map(
      ([listingType, {total, count}]) => ({
        listingType,
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
        fill={colorTheme.secondaryColor}>
        {stringUtility.formatMoneyWithSuffix(value)}
      </Text>
    )
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        margin={{left: 16, bottom: isSmallScreen ? 80 : 0, top: isSmallScreen ? 16 : 0}}
        data={averagePriceData}>
        <XAxis
          dataKey='listingType'
          angle={isSmallScreen ? -45 : 0}
          textAnchor={isSmallScreen ? 'end' : 'middle'}
          tick={{fill: colorTheme.secondaryColor}}>
        </XAxis>
        <YAxis
          dataKey='averagePrice'
          tick={{fill: colorTheme.secondaryColor}}
          tickFormatter={(value) => stringUtility.formatMoneyWithSuffix(value)}>
        </YAxis>
        <Bar
          dataKey='averagePrice'
          fill={colorTheme.accentColor700}
          label={<CustomLabel />} />
      </BarChart>
    </ResponsiveContainer>
  )
})

export default AveragePriceByListingTypeChart
