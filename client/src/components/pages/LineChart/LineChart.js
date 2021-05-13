import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import _ from 'lodash'
import { toJS } from 'mobx'
import { MoodModel } from '../../../models'
import {
  Badge, Spinner, Text,
} from '../../atoms'
import feelings from '../../../common/feelings.json'
import {
  LineChartStyle,
} from './LineChartStyle'

const LineChart = () => { // TODO: refactor this gathered on the knee component
  useEffect(() => {
    MoodModel.getMoods()
  }, [])
  const { moods } = MoodModel

  // const positiveFeelingsIds = feelings.positive.map(({ id }) => id)
  // const negativeFeelingsIds = feelings.negative.map(({ id }) => id)

  // <Spinner
  //   style={{
  //     paddingTop: '200px',
  //   }}
  // />
  console.log(moods?.map(({ createDateTime, moodLevel }) => ({ timestamp: Math.floor(new Date(createDateTime).getTime() / 1000), level: moodLevel })).reverse())
  const moodsGroupedByDates = _.groupBy(moods, mood => new Date(mood.createDateTime)
    .toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })
    .split('/')
    .reverse()
    .join('.'))
  const moodsAveregedByDates = {}

  Object.entries(moodsGroupedByDates).forEach(([date, dateMoods]) => {
    moodsAveregedByDates[date] = dateMoods
      .map(({ moodLevel }) => moodLevel)
      .reduce((partial_sum, a) => partial_sum + a, 0) / dateMoods.length
  })
  console.log(Object.entries(moodsAveregedByDates))
  const categories = Object.entries(moodsAveregedByDates).map(([date]) => date).reverse()
  const data = Object.entries(moodsAveregedByDates).map(([, moodLevel]) => moodLevel).reverse()
  // const categories = moods?.map(({ createDateTime }) => new Date(createDateTime)
  //   .toLocaleString('en-GB', {
  //     day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric',
  //   })).reverse()
  // const data = moods?.map(({ moodLevel }) => moodLevel).reverse()

  const options = {
    chart: {
      id: 'line-chart',
    },
    xaxis: {
      categories,
    },
    yaxis: {
      decimalsInFloat: 0,
    },
    // stroke: {
    //   show: true,
    //   curve: 'smooth',
    //   // lineCap: 'butt',
    //   colors: ['#F44336'],
    //   width: 2,
    //   dashArray: 0,
    // },
  }
  const series = [{
    name: 'moods',
    data,
  }]

  return (
    <LineChartStyle>
      <Chart options={options} series={series} type="heatmap" width={1200} height={320} />
    </LineChartStyle>
  )
}

LineChart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(observer(LineChart))
