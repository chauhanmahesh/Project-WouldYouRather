import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Card, Typography, Divider} from '@material-ui/core'
import QuestionOption from './QuestionOption'
import {connect} from 'react-redux'
import UserAvatar from './UserAvatar'
import QuestionResultChart from './QuestionResultChart'

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
    }
});

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

    showInAnsweredMode = (classes, author, cardQuestion, authedUser) => {
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
                    <QuestionResultChart
                        option1Percentage={option1Percentage}
                        option2Percentage={option2Percentage}/>
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

    showInUnansweredMode = (classes, author, cardQuestion) => {
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
                            <QuestionOption isFirstOption='true' optionText={cardQuestion.optionOne.text}/>
                            <QuestionOption optionText={cardQuestion.optionTwo.text}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    isAnsweredByAuthedUser = (question, authedUser) => {
        const allAnswerKeys = Object.keys(authedUser.answers)
        const questionId = Object
            .assign(question)
            .id
        return allAnswerKeys.includes(questionId)
    }

    render() {
        const {classes, cardQuestion, author, authedUser} = this.props;
        console.log("Question : " + cardQuestion.id + " & user answer : " + this.getUserSelectedOption(cardQuestion, authedUser))
        // Let's check if this question is answered by authedUser or not.
        const isAnswered = this.isAnsweredByAuthedUser(cardQuestion, authedUser)
        return isAnswered
            ? (this.showInAnsweredMode(classes, author, cardQuestion, authedUser))
            : (this.showInUnansweredMode(classes, author, cardQuestion))
    }
}

QuestionCard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = ({authedUser}) => ({authedUser});

export default withStyles(styles)(connect(mapStateToProps)(QuestionCard));