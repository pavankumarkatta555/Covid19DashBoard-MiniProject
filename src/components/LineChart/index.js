import {LineChart, XAxis, YAxis, Tooltip, Line} from 'recharts'
import './index.css'

const strokeColoursList = [
  '#FF073A',
  '#007BFF',
  '#27A243',
  '#6C757D',
  '#9673B9',
]

const LineChartUsingData = props => {
  const {chartData, indexNo} = props
  const data = chartData[indexNo]
  const strokeColor = strokeColoursList[indexNo]

  let lineChartBg
  let lineChartName

  if (indexNo === 0) {
    lineChartBg = 'confirmed'
    lineChartName = 'Confirmed'
  } else if (indexNo === 1) {
    lineChartBg = 'active'
    lineChartName = 'Active'
  } else if (indexNo === 2) {
    lineChartBg = 'recovered'
    lineChartName = 'Recovered'
  } else if (indexNo === 3) {
    lineChartBg = 'deceased'
    lineChartName = 'Deceased'
  } else if (indexNo === 4) {
    lineChartBg = 'tested'
    lineChartName = 'Tested'
  }

  return (
    <>
      <div className={`line-chart-container ${lineChartBg}`}>
        <p className="line-chart-name">{lineChartName}</p>
        <LineChart width={330} height={190} data={data}>
          <XAxis
            dataKey="date"
            tick={{stroke: strokeColor, strokeWidth: 1}}
            tickLine={{stroke: strokeColor}}
            axisLine={{stroke: strokeColor}}
          />
          <YAxis
            tick={{stroke: strokeColor, strokeWidth: 1}}
            tickLine={{stroke: strokeColor}}
            axisLine={{stroke: strokeColor}}
          />
          <Tooltip
            cursor={{fill: strokeColor, stroke: strokeColor, strokeWidth: 2}}
          />
          <Line
            type="monotone"
            dataKey="cases"
            stroke={strokeColor}
            tick={{stroke: strokeColor, strokeWidth: 2}}
            dot={{fill: strokeColor, stroke: strokeColor, strokeWidth: 2}}
          />
        </LineChart>
      </div>
      <div className={`line-chart-lg-container ${lineChartBg}`}>
        <p className="line-chart-name">{lineChartName}</p>
        <LineChart
          width={1020}
          height={240}
          data={data}
          margin={{top: 0, right: 32, left: 32, bottom: 0}}
        >
          <XAxis
            dataKey="date"
            tick={{stroke: strokeColor, strokeWidth: 1}}
            tickLine={{stroke: strokeColor}}
            axisLine={{stroke: strokeColor}}
          />
          <YAxis
            tick={{stroke: strokeColor, strokeWidth: 1}}
            tickLine={{stroke: strokeColor}}
            axisLine={{stroke: strokeColor}}
          />
          <Tooltip
            cursor={{fill: strokeColor, stroke: strokeColor, strokeWidth: 2}}
          />
          <Line
            type="monotone"
            dataKey="cases"
            stroke={strokeColor}
            tick={{stroke: strokeColor, strokeWidth: 2}}
            dot={{fill: strokeColor, stroke: strokeColor, strokeWidth: 2}}
          />
        </LineChart>
      </div>
    </>
  )
}

export default LineChartUsingData
