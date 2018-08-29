import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import QuestionPreviewCard from './QuestionPreviewCard'
import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center'
    }
})

const QuestionPreviewCards = (props) => {
    const {questionIds, classes} = props
    if (questionIds.length === 0) {
        return (
            <div className={classes.root}>
                <Typography variant='title' color="textSecondary">
                    Sorry, no questions to show :'(
                </Typography>
            </div>
        )
    }
    return (
        <Grid container className={classes.root} spacing={16}>
            {
                questionIds.map((questionId) => (
                    <Grid item key={questionId}>
                        <QuestionPreviewCard key={questionId} cardQuestionId={questionId}/>
                    </Grid>)
                )
            }
        </Grid>
    )
}

QuestionPreviewCards.propTypes = {
    classes: PropTypes.object.isRequired,
    authedUser: PropTypes.object.isRequired,
    questionIds: PropTypes.array.isRequired
};

// Grab data from Redux store as props
const mapStateToProps = ({authedUser}) => ({authedUser})

export default withStyles(styles)(connect(mapStateToProps)(QuestionPreviewCards))