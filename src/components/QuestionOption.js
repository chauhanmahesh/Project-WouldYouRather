import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Button, Typography} from '@material-ui/core'
import {heart} from 'react-icons-kit/fa/heart'
import Icon from 'react-icons-kit'

const styles = {
    optionCard: {
        textTransform: 'none',
        width: 150,
        minHeight: 150
    },
    optionText: {
        color: 'white',
        margin: 5,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
    }
}

/**
 * @description We use this stateless functional component in 3 modes.
 * 1. In Preview mode : There it's not clickable and used to display the optionText. 
 *    Hence optionId, handleSubmitAnswer and showAsSelected will not be present in props.
 * 2. In Non-Answered mode: There it will be clickable and user can click on it to choose this option.
 *    We need to notificy parent component using handleSubmitAnswer.
 * 3. In Answered model (selected or non selected): It will not be clickable but will show an icon (Heart) if this option is the 
 *    selected one by authed user.
 * @param {object} props 
 */
const QuestionOption = (props) => {
    const {showAsSelected, optionText, optionId, classes, color, handleSubmitAnswer} = props
    // We will not get optionId, handleSubmitAnswer and showAsSelected when they are in preview mode.
    const isDisabled = handleSubmitAnswer === undefined
    return (
        <Button disabled={isDisabled} className={classes.optionCard} style={{background:color}} onClick={() => handleSubmitAnswer(optionId)}>
                {
                    showAsSelected === 'true' && (<div style={{ color: 'yellow', zIndex: 1, top: 5, left:5, position: "absolute" }}>
                        <Icon size={25} icon={heart}/>
                    </div>)
                }
            <Typography className={classes.optionText} variant='title'>
                {optionText}
            </Typography>
        </Button>
    )
}

QuestionOption.propTypes = {
    classes: PropTypes.object.isRequired,
    optionText: PropTypes.string.isRequired,
    optionId: PropTypes.string,
    color: PropTypes.string.isRequired,
    handleSubmitAnswer: PropTypes.func
}

export default withStyles(styles)(QuestionOption)