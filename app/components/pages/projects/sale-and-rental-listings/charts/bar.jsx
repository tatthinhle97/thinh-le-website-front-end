import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const CustomTooltip = ({active, payload, label}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'white',
          border: '1px solid #ccc',
          padding: '10px'
        }}>
        <p>{label}</p>
        <p>Average Price: $ {payload[0].value.toLocaleString()}</p>
      </div>
    )
  }

  return null
}

export default function AveragePriceByListingTypeBarChart({data}) {
  return (
    <ResponsiveContainer width='100%' height={'100%'}>
      <BarChart data={data}>
        <XAxis dataKey='listingType' />
        <YAxis tickFormatter={(value) => `$ ${value.toLocaleString()}`} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey='averagePrice' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  )
}
