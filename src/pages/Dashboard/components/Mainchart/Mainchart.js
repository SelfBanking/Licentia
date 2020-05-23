import React, {useState} from 'react'
import {Grid} from '@material-ui/core'

import useStyles from './styles'

import {LineChart, Line} from 'recharts'
import {} from '@material-ui/styles'

const Mainchart = () => {
  const {classes, innerWidth, data} = useMainChartLogic()

  // console.log(window.innerWidth)
  return (
    <Grid item xs={12} className={classes.chartStyle}>
      <LineChart width={innerWidth} height={300} data={data}>
        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="uv" stroke="#3335a8" strokeWidth={2} />
      </LineChart>
    </Grid>
  )
}

function useMainChartLogic() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth * 0.7)
  const classes = useStyles()

  window.addEventListener('resize', event =>
    setInnerWidth(event.target.innerWidth * 0.7)
  )

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

  return {classes, data, innerWidth}
}

export default Mainchart
