import React from 'react'
import { observer } from 'mobx-react'

import { withRouter } from 'react-router'
import { func, shape } from 'prop-types'
import { CreateStyle } from './CreateStyle'
import { MoodSettings } from '../../organisms'
import { MoodModel } from '../../../models'
import { transformDateForInput } from '../../../common/helpers'

const Create = ({ history }) => {
  const initialMoodDetails = {
    moodLevel: 1,
    feelingIds: [],
    tagIds: [],
    note: '',
    date: transformDateForInput(new Date()),
    time: new Date().toLocaleString('en', {
      hourCycle: 'h23', hour: '2-digit', minute: '2-digit',
    }),
  }

  const sendMood = (moodDetails) => {
    MoodModel.sendMood(moodDetails).then(() => history.push('/timeline'))
  }

  return (
    <CreateStyle>
      <MoodSettings
        submitMood={sendMood}
        initialMoodDetails={initialMoodDetails}
      />
    </CreateStyle>
  )
}

Create.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
}

export default withRouter(observer(Create))
