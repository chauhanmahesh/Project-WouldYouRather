import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {AppBar, Typography, Button} from '@material-ui/core'
import {connect} from 'react-redux'
import {unsetAuthedUser} from '../actions/authedUser'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import UserAvatar from './UserAvatar'
import {withRouter, Link} from 'react-router-dom'
import { handleInitialData } from '../actions/shared'

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    navigation: {
        background: '#46CDA8',
        minHeight: 45,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20
    },
    title: {
        color: "white",
        marginRight: 20
    },
    tabLabel: {
        fontSize: 18,
        textTransform: 'initial'
    },
    menuItemTitle: {
        color: 'white'
    }
})

class Navigation extends React.Component {
    state = {
        currentTab: 0
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location !== nextProps.location) {
            const {pathname} = nextProps.location
            // Let's map pathname to tab.
            // '/' maps to 0 (Questions)
            // '/add' maps to 1 (New Question)
            // '/leaderboard' maps to 2 (Leaderboard)
            const index = this.getTabIndexForPath(pathname)
            this.setState({
                currentTab: index
            })
        }
    }

    getTabIndexForPath(pathname) {
        // Let's map pathname to tab.
        // '/' maps to 0 (Questions)
        // '/add' maps to 1 (New Question)
        // '/leaderboard' maps to 2 (Leaderboard)
        switch(pathname) {
            case '/add':
                return 1
            case '/leaderboard':
                return 2
            case '/':
            default:
                return 0 
        }
    }

    handleLogout = event => {
        event.preventDefault()
        console.log("handleLogout")
        // Let's dispatch action to set authedUser.
        this.props.dispatch(unsetAuthedUser())
        // Let's move back to login page.
        this
            .props
            .history
            .replace('/login')
        // Also let's dispatch an action to fetch the initial data again.
        this.props.dispatch(handleInitialData())
    }

    handleTabChange = (event, currentTab) => {
        event.preventDefault()
        this.setState({currentTab})
    };

    renderAppBarWhenLoggedIn = (classes, currentTab, authedUser) => {
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.navigation}>
                    <Typography variant="title" className={classes.title}>
                        Would You Rather?
                    </Typography>
                    <Tabs value={currentTab} onChange={this.handleTabChange} indicatorColor="primary">
                        <Tab label={<span className={classes.tabLabel}>Questions</span>} component={Link} to="/"/>
                        <Tab label={<span className={classes.tabLabel}>Add Question</span>} component={Link} to="/add"/>
                        <Tab label={<span className={classes.tabLabel}>Leaderboard</span>} component={Link} to="/leaderboard"/>
                    </Tabs>
                    <div style={{
                        flex: 1
                    }}/>
                    <Typography variant="subheading" className={classes.menuItemTitle}>
                        {authedUser.name}
                    </Typography>
                    <UserAvatar showBig='false' avatarURL={authedUser.avatarURL}/>
                    <Button variant="contained" color="secondary" onClick={this.handleLogout}>
                        Logout
                    </Button>
                </AppBar>
            </div>
        )
    }

    renderAppBarWhenLoggedOut = (classes) => {
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.navigation}>
                    <Typography variant="title" className={classes.title}>
                        Would You Rather?
                    </Typography>
                </AppBar>
            </div>
        )
    }

    render() {
        const {classes, authedUser} = this.props;
        const {currentTab} = this.state
        console.log("authedUser on Navigation : " + authedUser + " currentTab : " + currentTab)
        const isLoggedIn = authedUser !== null
        console.log("authedUser on Navigation : " + authedUser + " isLoggedIn : " + isLoggedIn)
        return isLoggedIn
            ? (this.renderAppBarWhenLoggedIn(classes, currentTab, authedUser))
            : (this.renderAppBarWhenLoggedOut(classes))
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired
};

// Grab data from Redux store as props
const mapStateToProps = ({authedUser}) => ({authedUser})

export default withRouter(withStyles(styles)(connect(mapStateToProps)(Navigation)))