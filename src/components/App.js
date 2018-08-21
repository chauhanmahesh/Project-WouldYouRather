import React from 'react';
import Login from './Login';
import Home from './Home';
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/shared';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

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
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route exact path='/home' component={Home}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect()(App)