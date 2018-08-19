import {combineReducers} from 'redux'
import authedUser from './authedUser'
import answer from './answer'
import users from './users'
import questions from './questions'

export default combineReducers({authedUser, users, questions, answer})