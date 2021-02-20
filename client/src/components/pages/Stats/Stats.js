import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { faChartBar, faTags } from '@fortawesome/free-solid-svg-icons'
import { StatsStyle, MenuStyle } from './StatsStyle'
import { TagsStats, TimelineStats } from '../../organisms'
import { Icon } from '../../atoms'
import { MoodModel } from '../../../models'

const Stats = () => { // TODO: refactor this gathered on the knee component
  useEffect(() => {
    MoodModel.getMoods()
  }, [])

  const [statsType, setStatsType] = useState('timeline')

  const renderStats = () => {
    switch (statsType) {
      case 'timeline':
        return <TimelineStats />
      case 'tags':
        return <TagsStats />
      default:
        return <TimelineStats />
    }
  }

  return (
    <StatsStyle>
      <MenuStyle>
        <Icon
          onClick={() => setStatsType('timeline')}
          margin="0 5px"
          icon={faChartBar}
          color={statsType === 'tags' && '#DDD'}
          size="20px"
          inline
          pointer
        />
        <Icon
          onClick={() => setStatsType('tags')}
          margin="0 5px"
          icon={faTags}
          color={statsType === 'timeline' && '#DDD'}
          size="20px"
          inline
          pointer
        />
      </MenuStyle>
      {renderStats()}
    </StatsStyle>
  )
}

Stats.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(observer(Stats))
