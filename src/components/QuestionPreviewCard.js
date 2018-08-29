import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Card, Typography, Divider} from '@material-ui/core'
import QuestionOption from './QuestionOption'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import UserAvatar from './UserAvatar'

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
    navLink: {
        textDecoration: 'none'
    },
    secondOptionPlaceholderContainer: {
        width: 150,
        height: 150,
        marginLeft: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const QuestionPreviewCard = (props) => {
    const {classes, cardQuestion, users} = props
    const author = users[cardQuestion.author]
    const questionCreationTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(cardQuestion.timestamp)
    return (
        <Link to={'/questions/'+cardQuestion.id} className={classes.navLink}>
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
                        <Typography variant='subheading' color="primary" style={{marginTop: 20,marginBottom: 20}}>
                            Would you rather?
                        </Typography>
                        <div className={classes.row}>
                            <QuestionOption color='#d16161' optionText={cardQuestion.optionOne.text}/>
                            <div className={classes.emptySpace}/>
                            <div className={classes.secondOptionPlaceholderContainer}>
                                <Typography variant='display3' color="textSecondary">
                                    OR?
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

QuestionPreviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardQuestion: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
};

// Grab data from Redux store as props
const mapStateToProps = ({users, questions}, {cardQuestionId}) => {
    const cardQuestion = questions[cardQuestionId]
    return {
        users,
        cardQuestion
    }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(QuestionPreviewCard)))