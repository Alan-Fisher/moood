import React, { useEffect } from 'react'
import {
  Router, Switch, Route, Redirect, withRouter,
} from 'react-router-dom'
import { observer } from 'mobx-react'
import history from './history'
import {
  Create, Timeline, Settings, Stats, Login,
} from './components/pages'
import { AppStyle, AppBodyStyle, WorkaroundWrapperStyle } from './AppStyle'
import { MenuBar } from './components/molecules'
import { IntroWithLogo } from './components/organisms'

let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)
window.initialVh = vh

const Routes = withRouter(() => (
  <>
    {!['/intro', '/login'].includes(history.location.pathname)
      && <MenuBar history={history} />}
    <WorkaroundWrapperStyle>
      <AppBodyStyle id="appBody">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create" component={Create} />
          <Route path="/timeline" component={Timeline} />
          <Route path="/stats" component={Stats} />
          <Route path="/settings" component={Settings} />
          <Route path="/intro" component={IntroWithLogo} />
          <Redirect from="/" to="/create" />
        </Switch>
      </AppBodyStyle>
    </WorkaroundWrapperStyle>
  </>
))

const App = () => {
  useEffect(() => {
    window.addEventListener('resize', updateVerticalHeight)

    return () => {
      window.removeEventListener('resize', updateVerticalHeight)
    }
  }, [])

  const updateVerticalHeight = () => { // TODO: rethink with a fresh look
    const { innerHeight, orientation, initialVh } = window
    vh = [90, -90, undefined].includes(orientation) ? innerHeight * 0.01 : initialVh
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  return (
    <AppStyle>
      <Router history={history}>
        <Routes />
      </Router>
    </AppStyle>
  )
}

export default observer(App)
