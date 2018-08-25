import {RECEIVE_USERS} from '../actions/users'
import {ADD_QUESTION, SAVE_QUESTION_ANSWER} from '../actions/questions'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case SAVE_QUESTION_ANSWER:
            const {authedUser, qid, answer} = action.answerInfo
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
        case ADD_QUESTION:
            const {id, author} = action.formattedQuestion
            const questionUser = state[author]
            return {
                ...state,
                [author]: {
                    ...questionUser,
                    questions: questionUser.questions.concat([id])
                }
            }
        default:
            return state
    }
}