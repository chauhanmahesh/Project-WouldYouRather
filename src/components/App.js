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
import RouteDecider from './RouteDecider'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'

class App extends React.Component {

    /**
     * @description Lifecycle events just called after component is inserted into DOM. We will fetch initial data here which we 
     * need for the application like users and questions.
     */
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
                    {/** Navigation component to make sure we will display Navigation Bar always*/}
                    <Navigation/>
                    {/** Let's render different components based on the path.*/}
                    <Switch>
                        <Route exact path='/login' component={Login}/>
                        <RouteDecider exact path='/' component={QuestionTypeNavigation}/>
                        <RouteDecider exact path='/questions/:questionId' component={QuestionDetail}/>
                        <RouteDecider exact path='/add' component={NewQuestion}/>
                        <RouteDecider exact path='/leaderboard' component={Leaderboard}/>
                        <Route component={InvalidPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect()(App)