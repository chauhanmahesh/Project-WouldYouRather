import React from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/shared';
import {Route, Switch, BrowserRouter} from 'react-router-dom'

class App extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(handleInitialData())
    }

    render() {
        return (
            <BrowserRouter>
                <div>

                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route exact path='/dashboard' component={Dashboard}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect()(App)