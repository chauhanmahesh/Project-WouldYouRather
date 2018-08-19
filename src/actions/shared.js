import {_getQuestions} from "../utils/_DATA";
import {_getUsers} from "../utils/_DATA";
import {receiveUsers} from '../actions/users';
import {receiveQuestions} from '../actions/questions';

export function handleInitialData() {
    return (dispatch) => {
        return Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
        })
    }
}