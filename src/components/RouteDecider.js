import React from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const RouteDecider = ({ component: Component, authedUser, ...rest }) => (
  <Route {...rest} render={(props) => (
    // Let's check if the user is authenticated or not. if not we will redirect user to login else to the right
    // component. Also we pass extra information to Login page which is referrer. So if user tries to access leaderboard
    // directly then we will open leaderboard after login.
    authedUser !== null
      ? <Component {...props} />
      : <Redirect to={{pathname: '/login', state: { referrer: props.location }}} />
  )} />
)

// Grab data from Redux store as props
const mapStateToProps = ({authedUser}) => ({authedUser})

export default withRouter(connect(mapStateToProps)(RouteDecider))