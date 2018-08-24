import {SET_AUTHED_USER, UNSET_AUTHED_USER} from '../actions/authedUser'
import {SAVE_QUESTION_ANSWER} from '../actions/answers'

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.user
        case UNSET_AUTHED_USER:
            return null
        case SAVE_QUESTION_ANSWER:
            const {authedUser, qid, answer} = action.answerInfo
            console.log("SAVE_QUESTION_ANSWER authedUser : " + authedUser + " qid : " + qid + " answer : " + answer)
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [qid]: answer
                }
            }
        default:
            return state
    }
}