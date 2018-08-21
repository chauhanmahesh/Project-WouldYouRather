import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {
    AppBar,
    Typography,
    Button
} from '@material-ui/core';
import {connect} from 'react-redux';
import {unsetAuthedUser} from '../actions/authedUser';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import QuestionTypeNavigation from './QuestionTypeNavigation';
import UserAvatar from './UserAvatar';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    navigation: {
        background: '#103F57',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        color: "#FEDABB",
        marginRight: 20
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightMedium,
        marginRight: theme.spacing.unit * 4,
        '&:hover': {
          color: '#40a9ff',
          opacity: 1,
        },
        '&$tabSelected': {
          color: '#1890ff',
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          color: '#40a9ff',
        },
    },
    menuItemTitle: {
        color: 'white'
    }
});

class Navigation extends React.Component {
    state = {
        currentTab: 0
    };

    handleLogout = event => {
        event.preventDefault()
        console.log("handleLogout")
        // Let's dispatch action to set authedUser.
        this
            .props
            .dispatch(unsetAuthedUser)
    }

    handleTabChange = (event, currentTab) => {
        this.setState({currentTab});
    };

    render() {
        const {classes, authedUser} = this.props;
        const {currentTab} = this.state
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.navigation}>
                    <Typography variant="title" className={classes.title}>
                        Would You Rather?
                    </Typography>
                    <Tabs value={currentTab} onChange={this.handleTabChange}>
                        <Tab label="Questions" className={classes.tabRoot} />
                        <Tab label="New Question" className={classes.tabRoot}/>
                        <Tab label="Leaderboard" className={classes.tabRoot}/>
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
                {currentTab === 0 && <QuestionTypeNavigation/>}
            </div>
        ) 
    }         
}
        
Navigation.propTypes = {
    classes : PropTypes.object.isRequired
}; 

// Grab data from Redux store as props 
const mapStateToProps = ({authedUser}) => ({authedUser})

export default withStyles(styles)(connect(mapStateToProps)(Navigation))