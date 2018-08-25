import React from 'react'
import Login from './Login'
import QuestionTypeNavigation from './QuestionTypeNavigation'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Navigation from './Navigation'
import InvalidPage from './InvalidPage'
import QuestionDetail from './QuestionDetail'
import Test2 from './Test2'
import RouteDecider from './RouteDecider'
import NewQuestion from './NewQuestion'

class App extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(handleInitialData())
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    {/** To use page wise default, let's use CssBaseline**/}
                    <CssBaseline/>
                    <Navigation/>
                    <Switch>
                        <Route exact path='/login' component={Login}/>
                        <RouteDecider exact path='/' component={QuestionTypeNavigation}/>
                        <RouteDecider exact path='/questions/:questionId' component={QuestionDetail}/>
                        <RouteDecider exact path='/add' component={NewQuestion}/>
                        <RouteDecider exact path='/leaderboard' component={Test2}/>
                        <Route component={InvalidPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect()(App)