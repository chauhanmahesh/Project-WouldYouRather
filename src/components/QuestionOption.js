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

class QuestionOption extends React.Component {
    render() {
        const {showAsSelected, optionText, classes, isFirstOption, handleSubmitAnswer} = this.props
        const backgroundColor = isFirstOption === 'true' ? '#d16161' : '#619bd1'
        const leftMargin = isFirstOption === 'true' ? 0 : 10
        const isDisabled = handleSubmitAnswer === undefined
        return (
        <Button disabled={isDisabled} className={classes.optionCard} style={{background:backgroundColor, marginLeft: leftMargin}} onClick={() => handleSubmitAnswer(isFirstOption ? 'optionOne' : 'optionTwo')}>
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
}

QuestionOption.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(QuestionOption)