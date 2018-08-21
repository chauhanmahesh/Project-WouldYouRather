import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core'

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
};

const QuestionOption = (props) => {
    const {showAsSelected, optionText, classes, isFirstOption} = props
    const backgroundColor = isFirstOption === 'true' ? '#d16161' : '#619bd1'
    const leftMargin = isFirstOption === 'true' ? 0 : 10
    return (
        <Button className={classes.optionCard} style={{background:backgroundColor, marginLeft: leftMargin}}>
            {
                showAsSelected === 'true' && (<img
                    alt=''
                    src='yourAnswer.svg'
                    style={{
                    width: 38,
                    height: 25,
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    position: "absolute"
                }}/>)
            }
            <Typography className={classes.optionText} variant='title'>
                {optionText}
            </Typography>
        </Button>
    )
}

QuestionOption.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuestionOption);