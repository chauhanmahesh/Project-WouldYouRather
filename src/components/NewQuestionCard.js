import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Card, Typography, Divider, Button} from '@material-ui/core'
import {connect} from 'react-redux'
import UserAvatar from './UserAvatar'
import {withRouter} from 'react-router-dom'
import { handleSaveQuestion } from '../actions/questions'
import classNames from 'classnames'

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
    questionOptionInput: {
        width: 200,
        height: 120,
        fontSize: 20,
        padding: 10,
        resize: 'none'
    },
    optionA: {
        color: '#d16161'
    },
    optionB : {
        color: '#619bd1'
    },
    button: {
        marginTop: 10
    },
})

class NewQuestionCard extends React.Component {
    state = {
        optionA: '',
        optionB: ''
    }

    handleOptionAChange = event => {
        this.setState({
            optionA: event.target.value
        })
    }

    handleOptionBChange = event => {
        this.setState({
            optionB: event.target.value
        })
    }

    submitQuestion = (author, optionA, optionB) => {
        // Let's dispatch an action to save answer.
        const {dispatch, history} = this.props
        dispatch(handleSaveQuestion(author, this.state.optionA, this.state.optionB, () => {
            history.push('/')
        }))
    }

    render() {
        const {classes, authedUser} = this.props
        const enableSubmit = this.state.optionA.trim().length > 0 && this.state.optionB.trim().length > 0
        return (
            <Card className={classes.questionCard}>
                <Typography variant='title' color="textSecondary">
                    {authedUser.name + " asks"}
                </Typography>
                <Divider className={classes.topDivider}/>
                <div className={classes.row}>
                    <UserAvatar showBig='true' avatarURL={authedUser.avatarURL}/>
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
                            <textarea className={classNames(classes.questionOptionInput, classes.optionA)} placeholder='Type option A' onChange={this.handleOptionAChange} autoFocus/>
                            <textarea className={classNames(classes.questionOptionInput, classes.optionB)} placeholder='Type option B' style={{marginLeft: 10}} onChange={this.handleOptionBChange}/>
                        </div>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.submitQuestion(authedUser.id, "Test", "Test2")}
                            disabled={!enableSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Card>
        )
    }
}

NewQuestionCard.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = ({authedUser}) => ({authedUser})

export default withRouter(withStyles(styles)(connect(mapStateToProps)(NewQuestionCard)))