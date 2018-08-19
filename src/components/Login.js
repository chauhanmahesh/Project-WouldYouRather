import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {Card, CardMedia, FormControl, NativeSelect, InputLabel, Avatar, CircularProgress, Button} from '@material-ui/core';
import classNames from 'classnames';
import {relative} from 'upath';
import {NavLink} from 'react-router-dom';

const styles = theme => ({
    login: {
        position: relative,
        display: 'flex',
        justifyContent: 'center'
    },
    loginCard: {
        width: '30%',
        marginTop: 200
    },
    loginHeader: {
        height: 150,
        paddingBottom: 20
    },
    button: {
        margin: theme.spacing.unit,
        maxWidth: '70%',
        marginLeft: 0,
        marginTop: 10,
        marginBottom: 50
    },
    progress: {
        marginLeft: '50%',
        marginBottom: 50
    },
    row: {
        display: 'flex',
        justifyContent: 'center'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 220
    },
    avatar: {
        margin: 10
    },
    bigAvatar: {
        width: 60,
        height: 60
    }
});

class Login extends React.Component {
    state = {
        currentUser: 'tylermcginnis'
    };

    handleSelectedUserChange = currentUser => event => {
        console.log("handleSelectedUserChange : " + event.target.value)
        this.setState({[currentUser]: event.target.value});
    };

    render() {
        const {classes, users} = this.props;
        const {currentUser} = this.state;
        let userKeys = Object.keys(users);

        return (
            <div className={classes.login}>
                <Card className={classes.loginCard}>
                    <CardMedia className={classes.loginHeader} image="headerBackground.png">
                        <div className="LoginHeaderTitle">
                            Would You Rather?
                        </div>
                    </CardMedia>

                    {userKeys.length === 0
                        ? (<CircularProgress color='secondary' className={classes.progress}/>)
                        : (
                            <div className={classes.row}>
                                <Avatar
                                    src={users[currentUser].avatarURL}
                                    className={classNames(classes.avatar, classes.bigAvatar)}/>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Select user</InputLabel>
                                    <NativeSelect
                                        value={this.state.currentUser}
                                        onChange={this.handleSelectedUserChange('currentUser')}>
                                        {userKeys.map(userId => (
                                            <option key={userId} value={userId}>{userId}</option>
                                        ))}
                                    </NativeSelect>
                                    <Button variant="contained" color="secondary" className={classes.button}>
                                        <NavLink to='/dashboard' style={{textDecoration: 'none', color: 'white'}}>Login</NavLink>
                                    </Button>
                                </FormControl>
                            </div>
                        )
}
                </Card>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

// Grab data from Redux store as props
const mapStateToProps = ({users}) => ({users});

export default withStyles(styles)(connect(mapStateToProps)(Login));