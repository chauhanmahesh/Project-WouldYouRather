import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Card, Typography, Divider} from '@material-ui/core'
import QuestionOption from './QuestionOption'
import {connect} from 'react-redux'
import UserAvatar from './UserAvatar'
import {withRouter} from 'react-router-dom'
import { handleSaveQuestionAnswer } from '../actions/questions'

const styles = theme => ({
    questionCard: {
        padding: 20
    },
    topDivider: {
        marginTop: 10
    },
    row: {
        display: 'flex',
        alignItems: 'center'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 20
    },
    emptySpace: {
        width: 10
    }
})

class QuestionCard extends React.Component {
    /**
     * @description Returns  a option which authedUser selected for the passed question.
     * @param {Object} Question for which we want to check whether the authedUser has given any answer or not.
     * @param {Object} authedUser
     * @returns {string} 'optionOne', 'optionTwo' or ''.
     */
    getUserSelectedOption = (cardQuestion, authedUser) => {
        let answerKeys = Object.keys(authedUser.answers)
        if (answerKeys.includes(cardQuestion.id)) {
            return authedUser.answers[cardQuestion.id]
        } else {
            return ''
        }
    }

    /**
     * @description Submits the answer for the question.
     * Dispatches an action to submit the answer. Once done, moves to question detail page.
     * @param {string} answer 'optionA' or 'optionB'
     */
    submitAnswer = (answer) => {
        console.log("handleSubmitAnswer()")
        // Let's dispatch an action to save answer.
        const {dispatch, authedUser, cardQuestion} = this.props
        dispatch(handleSaveQuestionAnswer(authedUser, cardQuestion.id, answer))
    }

    /**
     * @description Renders the question in the answer mode.
     */
    showInAnsweredMode = () => {
        const {classes, cardQuestion, users, authedUser} = this.props
        const author = users[cardQuestion.author]
        const questionCreationTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(cardQuestion.timestamp)
        return (
            <Card className={classes.questionCard}>
                <div className={classes.row}>
                    <Typography variant='title' color="textSecondary">
                        {author.name + " asks"}
                    </Typography>
                </div>
                <Divider className={classes.topDivider}/>
                <Typography variant='subheading' color="textSecondary" style={{textAlign: 'right'}}>
                    {questionCreationTime}
                </Typography>
                <div className={classes.row}>
                    <UserAvatar showBig='true' avatarURL={author.avatarURL}/>
                    <div className={classes.column}>
                        <Typography
                            variant='subheading'
                            color="primary"
                            style={{
                            marginTop: 20,
                            marginBottom: 20
                        }}>
                            Would you rather?
                        </Typography>
                        <div className={classes.row}>
                            <QuestionOption
                                showAsSelected={this.getUserSelectedOption(cardQuestion, authedUser) === 'optionOne' ? 'true' : 'false'}
                                optionId='optionOne' color='#d16161' optionText={cardQuestion.optionOne.text}/>
                            <div className={classes.emptySpace}/>
                            <QuestionOption
                                showAsSelected={this.getUserSelectedOption(cardQuestion, authedUser) === 'optionTwo' ? 'true' : 'false'}
                                optionId='optionTwo' color='#619bd1' optionText={cardQuestion.optionTwo.text}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    /**
     * @description Renders the question in the unanswer mode.
     */
    showInUnansweredMode = () => {
        const {classes, cardQuestion, users} = this.props
        const author = users[cardQuestion.author]
        const questionCreationTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(cardQuestion.timestamp)
        return (
            <Card className={classes.questionCard}>
                <Typography variant='title' color="textSecondary">
                    {author.name + " asks"}
                </Typography>
                <Divider className={classes.topDivider}/>
                <Typography variant='subheading' color="textSecondary" style={{textAlign: 'right'}}>
                    {questionCreationTime}
                </Typography>
                <div className={classes.row}>
                    <UserAvatar showBig='true' avatarURL={author.avatarURL}/>
                    <div className={classes.column}>
                        <Typography
                            variant='subheading'
                            color="primary"
                            style={{
                            marginTop: 20,
                            marginBottom: 20
                        }}>
                            Would you rather?
                        </Typography>
                        <div className={classes.row}>
                            <QuestionOption optionId='optionOne' color='#d16161' optionText={cardQuestion.optionOne.text} handleSubmitAnswer={this.submitAnswer}/>
                            <div className={classes.emptySpace}/>
                            <QuestionOption optionId='optionTwo' color='#619bd1' optionText={cardQuestion.optionTwo.text} handleSubmitAnswer={this.submitAnswer}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    /**
     * @description Checks if this question is answered by authed user or not.
     */
    isAnsweredByAuthedUser = () => {
        const {cardQuestion, authedUser} = this.props
        const allAnswerKeys = Object.keys(authedUser.answers)
        const questionId = Object
            .assign(cardQuestion)
            .id
        return allAnswerKeys.includes(questionId)
    }

    render() {
        // Let's check if this question is answered by authedUser or not.
        const isAnswered = this.isAnsweredByAuthedUser()
        return isAnswered
            ? (this.showInAnsweredMode())
            : (this.showInUnansweredMode())
    }
}

QuestionCard.propTypes = {
    classes: PropTypes.object.isRequired,
    authedUser: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    cardQuestion: PropTypes.object.isRequired
};

// Grab data from Redux store as props
const mapStateToProps = ({authedUser, users, questions}, {cardQuestionId}) => {
    const cardQuestion = questions[cardQuestionId]
    return {
        authedUser, 
        users,
        cardQuestion
    }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(QuestionCard)))