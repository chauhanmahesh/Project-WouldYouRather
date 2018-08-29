import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import QuestionCard from './QuestionCard'
import {withRouter, Redirect} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {ic_navigate_before} from 'react-icons-kit/md/ic_navigate_before'
import Icon from 'react-icons-kit'
import { Grow, Card, Typography } from '@material-ui/core';
import QuestionResultChart from './QuestionResultChart'

const styles = theme => ({
    root: {
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    row: {
        display: 'flex',
        alignItems: 'center'
    },
    statCard: {
        width: 490,
        marginTop: 10,
        padding: 20
    },
    answerStat: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

class QuestionDetail extends React.Component {
    /**
     * @description Navigates user to home page.
     */
    navigateBackToHome = () => {
        const {history} = this.props
        // Let's navigate to home page.
        history.push('/')
    }

    /**
     * @description Checks if this question is answered by authed user or not.
     */
    isAnsweredByAuthedUser = () => {
        const {cardQuestion, authedUser} = this.props
        const allAnswerKeys = Object.keys(authedUser.answers)
        return allAnswerKeys.includes(cardQuestion.id)
    }

    /**
     * @description Returns the option percentage.
     * @param {int} favouredCount no of votes in favour.
     * @param {int} unfavouredCount no of votes which are not in favour.
     * @returns {int} option percentage in terms of favour.
     */
    optionPercentage = (favouredCount, unfavouredCount) => {
        let percentage = (favouredCount / (favouredCount + unfavouredCount)) * 100
        return percentage
    }

    /**
     * @description Renders answer stats. This will be called only if the question is in answered mode.
     * @param {object} cardQuestion For the stats
     * @param {object} classes For styling
     */
    renderStats = (cardQuestion, classes) => {
        const option1Percentage = this.optionPercentage(cardQuestion.optionOne.votes.length, cardQuestion.optionTwo.votes.length)
        const option2Percentage = this.optionPercentage(cardQuestion.optionTwo.votes.length, cardQuestion.optionOne.votes.length)
        return (
            <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
                <Card className={classes.statCard}>
                    <div className={classes.answerStat}>
                        <QuestionResultChart option1Percentage={option1Percentage} 
                                option2Percentage={option2Percentage}/>
                        <div className={classes.row}>
                            <div className={classes.column}>
                                <Typography variant='title' style={{textAlign:'center', color:'#d16161', marginTop: 10}}>
                                    Option A
                                </Typography>
                                <Typography variant='subheading' style={{textAlign:'center', color:'#d16161', marginTop: 10}}>
                                    {cardQuestion.optionOne.votes.length} votes ({parseFloat(option1Percentage).toFixed(2)}%)
                                </Typography>
                            </div>
                            <div style={{width: 20}}/>
                            <div className={classes.column}>
                                <Typography variant='title' style={{textAlign:'center', color:'#619bd1', marginTop: 10}}>
                                    Option B
                                </Typography>
                                <Typography variant='subheading' style={{textAlign:'center', color:'#619bd1', marginTop: 10}}>
                                    {cardQuestion.optionTwo.votes.length} votes ({parseFloat(option2Percentage).toFixed(2)}%)
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Card>
            </Grow>
        )
    }

    render() {
        const {cardQuestion, classes} = this.props
        if(cardQuestion === undefined) {
            return (<Redirect to='/invalid'/>)
        } else {
        return (
            <div className={classes.root}>
                <div style={{ color: 'black', right:20, position: "relative" }} onClick={() => this.navigateBackToHome()}>
                    <Icon size={40} icon={ic_navigate_before}/>
                </div>
                <div className={classes.column}>
                    <QuestionCard cardQuestionId={cardQuestion.id}/>
                    {
                        this.isAnsweredByAuthedUser() && this.renderStats(cardQuestion, classes)
                    }
                </div>
            </div>
        )
    }
    }
}

QuestionDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired
}

// Grab data from Redux store as props
const mapStateToProps = ({authedUser, questions}, props) => {
    const {questionId} = props.match.params
    const cardQuestion = questions[questionId]
    return {authedUser, cardQuestion}
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(QuestionDetail)))