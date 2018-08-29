import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import QuestionPreviewCards from './QuestionPreviewCards'
import {connect} from 'react-redux'

const styles = {
    root: {
        flexGrow: 1
    },
    navigation: {
        backgroundColor: "#8a8a8a"
    },
    tabLabel: {
        fontSize: 18,
        textTransform: 'initial'
    },
}

class QuestionTypeNavigation extends React.Component {
    state = {
        value: 0
    }

    /**
     * @description Handles tab change and update the state.
     */
    handleChange = (event, value) => {
        this.setState({value});
    }

    /**
     * @description Render list of unanswered questions.
     * @param {object} questions : List of questions to render.
     * @param {object} authedUser : Current logged in user.
     */
    showUnansweredQuestions = (questions, authedUser) => {
        // Let's filter the questions which we need. Here we just need unanswered
        // questions by authedUser.
        const authedUseranswerKeys = Object.keys(authedUser.answers)
        const questionKeys = Object.keys(questions)
        let unansweredQuestionKeys = questionKeys.filter((questionKey) => !authedUseranswerKeys.includes(questionKey))
        // Let's sort them now and just send questionIds to preview cards component.
        const sortedQuestionIds = unansweredQuestionKeys.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        return (<QuestionPreviewCards questionIds={sortedQuestionIds}/>)
    }

    /**
     * @description Render list of answered questions.
     * @param {object} questions : List of questions to render.
     * @param {object} authedUser : Current logged in user.
     */
    showAnsweredQuestions = (questions, authedUser) => {
        // Let's filter the questions which we need. Here we just need answered
        // questions by authedUser.
        const authedUseranswerKeys = Object.keys(authedUser.answers)
        const questionKeys = Object.keys(questions)
        let answeredQuestionKeys = questionKeys.filter((questionKey) => authedUseranswerKeys.includes(questionKey))
        // Let's sort them now and just send questionIds to preview cards component.
        const sortedQuestionIds = answeredQuestionKeys.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        return (<QuestionPreviewCards questionIds={sortedQuestionIds}/>)
    }

    render() {
        const {classes, questions, authedUser} = this.props
        const {value} = this.state

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.navigation}>
                    <Tabs value={value} onChange={this.handleChange} indicatorColor="primary">
                        <Tab label={<span className={classes.tabLabel}>Unanswered</span>}/>
                        <Tab label={<span className={classes.tabLabel}>Answered</span>}/>
                    </Tabs>
                </AppBar>
                {value === 0 && this.showUnansweredQuestions(questions, authedUser)}
                {value === 1 && this.showAnsweredQuestions(questions, authedUser)}
            </div>
        )
    }
}

QuestionTypeNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,
    authedUser: PropTypes.object.isRequired
}

// Grab data from Redux store as props
const mapStateToProps = ({questions, authedUser}) => ({questions, authedUser})

export default withStyles(styles)(connect(mapStateToProps)(QuestionTypeNavigation))