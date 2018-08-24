import React from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

const RouteDecider = ({ component: Component, authedUser, ...rest }) => (
  <Route {...rest} render={(props) => (
    // Let's check if the user is authenticated or not. if not we will redirect user to login else to the right
    // component
    authedUser !== null
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const mapStateToProps = ({authedUser}) => ({authedUser});

export default withRouter(connect(mapStateToProps)(RouteDecider));