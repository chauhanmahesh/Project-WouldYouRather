import React from 'react'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import NewQuestionCard from './NewQuestionCard'

const styles = theme => ({
    root: {
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center'
    }
});

class NewQuestion extends React.Component {
    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <NewQuestionCard />
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(NewQuestion))