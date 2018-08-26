import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Paper, Typography} from '@material-ui/core'
import {withRouter} from 'react-router-dom'
import {ic_navigate_before} from 'react-icons-kit/md/ic_navigate_before'
import Icon from 'react-icons-kit'

const styles = theme => ({
    root: {
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center'
    },
    invalidPageCard: {
        width: '30%',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

class InvalidPage extends React.Component {
    navigateBackToHome = () => {
        const {history} = this.props
        history.push('/')
    }
    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <div style={{ color: 'black', right:20, position: "relative" }} onClick={() => this.navigateBackToHome()}>
                    <Icon size={40} icon={ic_navigate_before}/>
                </div>
                <Paper className={classes.invalidPageCard}>
                    <Typography variant='display4' color="textSecondary">
                        404
                    </Typography>
                    <Typography variant='title' color="textSecondary">
                        Page not found
                    </Typography>
                </Paper>
            </div>
        )
    }
}

InvalidPage.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(InvalidPage))