import React from 'react'
import { Grid } from '@material-ui/core'

import useStyles from './styles'

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'
import {} from '@material-ui/styles'

const Mainchart = () => {
  const classes = useStyles()
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ]
  // const functionOne = () => (
  //  {

  //  })

  return (
    <Grid item xs={12} className={classes.chartStyle}>
      <LineChart
        width={600}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 0
        }}
      >
        <CartesianGrid
          strokeDasharray='3 3'
          vertical={false}
          horizontal={false}
          stroke='#aab8c2'
        />
        <XAxis dataKey='name' stroke='#ccc' />
        <YAxis stroke='#ccc' />

        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Line
          type='monotone'
          dataKey='pv'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
        <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
      </LineChart>
    </Grid>
  )
}

export default Mainchart
