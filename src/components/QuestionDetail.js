import React from 'react'
import {connect} from 'react-redux'
import QuestionCard from './QuestionCard'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {ic_navigate_before} from 'react-icons-kit/md/ic_navigate_before'
import Icon from 'react-icons-kit'

const styles = theme => ({
    root: {
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center'
    }
})

class QuestionDetail extends React.Component {
    navigateBackToHome = () => {
        const {history} = this.props
        history.push('/')
    }
    render() {
        const {question, classes} = this.props
        return (
            <div className={classes.root}>
                <div style={{ color: 'black', right:20, position: "relative" }} onClick={() => this.navigateBackToHome()}>
                    <Icon size={40} icon={ic_navigate_before}/>
                </div>
                <QuestionCard key={question.id} cardQuestion={question}/>
            </div>
        )
    }
}

const mapStateToProps = ({
    questions
}, props) => {
    const {questionId} = props.match.params
    const question = questions[questionId]
    return {question}
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(QuestionDetail)))