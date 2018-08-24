import {_saveQuestionAnswer} from '../utils/_DATA'

export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function saveQuestionAnswer(answerInfo) {
    return {type: SAVE_QUESTION_ANSWER, answerInfo}
}

export function handleSaveQuestionAnswer(authedUser, questionId, answer, callback) {
    return (dispatch) => {
        return _saveQuestionAnswer({authedUser : authedUser.id, qid: questionId, answer: answer}).then(() => {
            dispatch(saveQuestionAnswer({authedUser : authedUser.id, qid: questionId, answer: answer}))
            callback()
        })
    }
}