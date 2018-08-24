import {RECEIVE_QUESTIONS, ADD_QUESTION} from '../actions/questions'
import {SAVE_QUESTION_ANSWER} from '../actions/answers'

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return state.concat([action.question])
        case SAVE_QUESTION_ANSWER:
            const {authedUser, qid, answer} = action.answerInfo
            console.log("SAVE_QUESTION_ANSWER authedUser : " + authedUser + " qid : " + qid + " answer : " + answer)
            const question = state[qid]
            return {
                ...state,
                [qid]: {
                    ...question,
                    [answer]: {
                        ...question[answer],
                        votes: [...question[answer].votes, authedUser]
                    }
                }
            }
        default:
            return state
    }
}