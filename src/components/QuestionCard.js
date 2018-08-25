import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Card, Typography, Divider} from '@material-ui/core'
import QuestionOption from './QuestionOption'
import {connect} from 'react-redux'
import UserAvatar from './UserAvatar'
import QuestionResultChart from './QuestionResultChart'
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
    answerStat: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 20
    },
    navLink: {
        textDecoration: 'none'
    }
})

class QuestionCard extends React.Component {
    optionPercentage = (favouredCount, unfavouredCount) => {
        return (favouredCount / (favouredCount + unfavouredCount)) * 100
    }

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

    submitAnswer = (answer) => {
        console.log("handleSubmitAnswer()")
        // Let's dispatch an action to save answer.
        const {dispatch, authedUser, cardQuestion, history} = this.props
        dispatch(handleSaveQuestionAnswer(authedUser, cardQuestion.id, answer, () => {
            history.push(`/questions/${cardQuestion.id}`)
        }))
    }

    showInAnsweredMode = () => {
        const {classes, cardQuestion, users, authedUser} = this.props
        const author = users[cardQuestion.author]
        const option1Percentage = this.optionPercentage(cardQuestion.optionOne.votes.length, cardQuestion.optionTwo.votes.length)
        const option2Percentage = this.optionPercentage(cardQuestion.optionTwo.votes.length, cardQuestion.optionOne.votes.length)
        return (
            <Card className={classes.questionCard}>
                <div className={classes.row}>
                    <Typography variant='title' color="textSecondary">
                        {author.name + " asks"}
                    </Typography>
                    <UserAvatar showBig='false' avatarURL={author.avatarURL}/>
                </div>
                <Divider className={classes.topDivider}/>
                <div className={classes.row}>
                    <div className={classes.answerStat}>
                        <QuestionResultChart
                            option1Percentage={option1Percentage}
                            option2Percentage={option2Percentage}/>
                        <Typography
                            variant='subheading'
                            style={{textAlign:'center', color:'#d16161', marginTop: 10}}>
                            Option A: {cardQuestion.optionOne.votes.length} votes
                        </Typography>
                        <Divider className={classes.topDivider}/>
                        <Typography
                            variant='subheading'
                            style={{textAlign:'center', color:'#619bd1', marginTop: 10}}>
                            Option B: {cardQuestion.optionTwo.votes.length} votes
                        </Typography>
                    </div>
                    
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
                                isFirstOption='true'
                                optionText={cardQuestion.optionOne.text}/>
                            <QuestionOption
                                showAsSelected={this.getUserSelectedOption(cardQuestion, authedUser) === 'optionTwo' ? 'true' : 'false'}
                                optionText={cardQuestion.optionTwo.text}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    showInUnansweredMode = () => {
        const {classes, cardQuestion, users} = this.props
        const author = users[cardQuestion.author]
        return (
            <Card className={classes.questionCard}>
                <Typography variant='title' color="textSecondary">
                    {author.name + " asks"}
                </Typography>
                <Divider className={classes.topDivider}/>
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
                            <QuestionOption isFirstOption='true' optionText={cardQuestion.optionOne.text} handleSubmitAnswer={this.submitAnswer}/>
                            <QuestionOption optionText={cardQuestion.optionTwo.text} handleSubmitAnswer={this.submitAnswer}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

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
    classes: PropTypes.object.isRequired
};

const mapStateToProps = ({authedUser, users}) => ({authedUser, users})

export default withRouter(withStyles(styles)(connect(mapStateToProps)(QuestionCard)))