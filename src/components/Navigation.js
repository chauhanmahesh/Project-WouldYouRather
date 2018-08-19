import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, MenuItem, Avatar, Button} from '@material-ui/core';
import classNames from 'classnames';
import {connect} from 'react-redux';

const styles = {
    root: {
        flexGrow: 1,
        width: '100%'
    },
    navigation: {
        background: '#103F57'
    },
    title: {
        color: "#FEDABB"
    },
    avatar: {
        margin: 10
    },
    smallAvatar: {
        width: 35,
        height: 35
    },
    menuItem: {
        marginLeft: 20
    },
    menuItemTitle: {
        color: 'white'
    }
};

class Navigation extends React.Component {
    render() {
        const {classes, users, currentPage} = this.props;
        //console.log("Dashboard users : " + Object.keys(users))
        let authedUser = "sarahedo";
        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.navigation}>
                    <Toolbar>
                        <Typography variant="title" className={classes.title}>
                            Would You Rather?
                        </Typography>
                        <MenuItem
                            className={classes.menuItem}
                            style={{
                            background: currentPage === 'dashboard'
                                ? "black"
                                : "transparent"
                        }}>
                            <Typography variant="subheading" className={classes.menuItemTitle}>
                                Dashboard
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            className={classes.menuItem}
                            style={{
                            background: currentPage === 'newQuestion'
                                ? "black"
                                : "transparent"
                        }}>
                            <Typography variant="subheading" className={classes.menuItemTitle}>
                                New Question
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            className={classes.menuItem}
                            style={{
                            background: currentPage === 'leaderboard'
                                ? "black"
                                : "transparent"
                        }}>
                            <Typography variant="subheading" className={classes.menuItemTitle}>
                                Leaderboard
                            </Typography>
                        </MenuItem>
                        {/** To push avatar and logout on the right**/}
                        <div style={{
                            flex: 1
                        }}/>
                        <Avatar
                            src=''
                            className={classNames(classes.avatar, classes.smallAvatar)}/>
                        <Button variant="contained" color="secondary">
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    currentPage: PropTypes.string.isRequired
};

// Grab data from Redux store as props
const mapStateToProps = ({users, authedUser}) => ({users, authedUser});

export default withStyles(styles)(connect(mapStateToProps)(Navigation));
