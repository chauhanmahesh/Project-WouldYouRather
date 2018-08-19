import {_saveQuestionAnswer} from '../utils/_DATA'

export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function saveQuestionAnswer(answer) {
    return {type: SAVE_QUESTION_ANSWER, answer}
}

export function handleSaveQuestionAnswer() {
    return (dispatch) => {
        return _saveQuestionAnswer().then((answer) => {
            dispatch(saveQuestionAnswer(answer))
        })
    }
}