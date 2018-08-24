import {RECEIVE_USERS} from '../actions/users'
import {SAVE_QUESTION_ANSWER} from '../actions/answers';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case SAVE_QUESTION_ANSWER:
            const {authedUser, qid, answer} = action.answerInfo
            console.log("SAVE_QUESTION_ANSWER authedUser : " + authedUser + " qid : " + qid + " answer : " + answer)
            const user = state[authedUser]
            return {
                ...state,
                [authedUser]: {
                    ...user,
                    answers: {
                        ...user.answers,
                        [qid]: answer
                    }
                }
            }
        default:
            return state
    }
}