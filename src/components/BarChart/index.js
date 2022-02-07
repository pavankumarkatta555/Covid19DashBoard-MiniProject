import {XAxis, Tooltip, BarChart, Bar} from 'recharts'

import './index.css'

const BarChartUsingData = props => {
  const {barChartData} = props

  return (
    <>
      <div className="sm-bar-chart">
        <BarChart width={420} height={200} data={barChartData}>
          <XAxis dataKey="date" />
          <Tooltip />
          <Bar
            dataKey="cases"
            fill="#9A0E31"
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
      </div>
      <div className="lg-bar-chart">
        <BarChart width={1300} height={450} data={barChartData}>
          <XAxis dataKey="date" />
          <Tooltip />
          <Bar
            dataKey="cases"
            fill="#9A0E31"
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
      </div>
    </>
  )
}

export default BarChartUsingData
