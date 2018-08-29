import React from 'react'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import NewQuestionCard from './NewQuestionCard'
import PropTypes from 'prop-types'

const styles = theme => ({
    root: {
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center'
    }
});

const NewQuestion = (props) => {
    const {classes} = props
    return (
        <div className={classes.root}>
            <NewQuestionCard/>
        </div>
    )
}

NewQuestion.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(NewQuestion))