import {_saveQuestion, _saveQuestionAnswer} from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function receiveQuestions(questions) {
    return {type: RECEIVE_QUESTIONS, questions}
}

export function addQuestion(formattedQuestion) {
    return {type: ADD_QUESTION, formattedQuestion}
}

export function saveQuestionAnswer(answerInfo) {
    return {type: SAVE_QUESTION_ANSWER, answerInfo}
}

export function handleSaveQuestionAnswer(authedUser, questionId, answer) {
    return (dispatch) => {
        return _saveQuestionAnswer({authedUser : authedUser.id, qid: questionId, answer: answer}).then(() => {
            dispatch(saveQuestionAnswer({authedUser : authedUser.id, qid: questionId, answer: answer}))
        })
    }
}

export function handleSaveQuestion(author, optionOneText, optionTwoText, callback) {
    return (dispatch) => {
        return _saveQuestion({optionOneText, optionTwoText, author}).then((formattedQuestion) => {
            dispatch(addQuestion(formattedQuestion))
            callback()
        })
    }
}