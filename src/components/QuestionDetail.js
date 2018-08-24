import React from 'react'
import {connect} from 'react-redux'
import QuestionCard from './QuestionCard'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center'
    }
});

class QuestionDetail extends React.Component {
    render() {
        const {question, classes} = this.props
        return (
            <div className={classes.root}>
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
};

export default withRouter(withStyles(styles)(connect(mapStateToProps)(QuestionDetail)));