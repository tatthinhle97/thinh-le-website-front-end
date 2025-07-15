import {
  Bar,
  BarChart,
  CartesianGrid, Cell, Pie, PieChart,
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

export default function DonutChart({data}) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='count'>
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={'#0088FE'} />
          ))}
          <Tooltip />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
