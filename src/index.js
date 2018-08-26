import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {Provider} from 'react-redux'
import reducer from './reducers'
import applyMiddleware from './middlewares'
import {createStore} from 'redux'

const store = createStore(reducer, applyMiddleware)

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>, 
  document.getElementById('root'))