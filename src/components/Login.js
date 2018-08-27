import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {
    Card,
    FormControl,
    NativeSelect,
    InputLabel,
    CircularProgress,
    Button,
    Typography,
    Divider
} from '@material-ui/core'
import {relative} from 'upath'
import {setAuthedUser} from '../actions/authedUser'
import UserAvatar from './UserAvatar'
import {Redirect} from 'react-router-dom'

const styles = theme => ({
    root: {
        position: relative,
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center'
    },
    loginCard: {
        minWidth: '30%',
        padding: 20
    },
    topDivider: {
        marginTop: 10
    },
    button: {
        marginTop: 10
    },
    progress: {
        margin: 50
    },
    column: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    formControl: {
        marginTop: theme.spacing.unit,
        minWidth: '50%'
    }
})

class Login extends React.Component {
    state = {
        // State for the currentUser which is selected in the dropdown to login. This
        // stores the user :id
        currentUser: '',
        // State to check if we have to redirect to the original page or not. This should be true if we have to 
        // redirect user to a specific page after login else by default it will open '/' (Home page)
        redirect: 'false'
    }

    /**
     * @description Lifecycle events just called after component is inserted into DOM. Let's prepare the state.
     * We are handling specially in the case when user comes back to Login screen after logging out.
     */
    componentDidMount() {
        let userKeys = Object.keys(this.props.users)
            let isInitialDataLoaded = userKeys.length > 0
            // If the data is already loaded, let's set the currentUser to the first one.
            if (isInitialDataLoaded === true) {
                this.updateState(this.props.users[userKeys[0]])
            }
    }

    /**
     * @description Lifecycle events which is just called before receiving new set of props. Let's prepare the state.
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.users !== nextProps.users) {
            let userKeys = Object.keys(nextProps.users)
            let isInitialDataLoaded = userKeys.length > 0
            // If the data is already loaded, let's set the currentUser to the first one.
            if (isInitialDataLoaded === true) {
                this.updateState(nextProps.users[userKeys[0]])
            }
        }
    }

    /**
     * @description Handles selected user change.
     * @param {Object} users - All users.
     */
    handleSelectedUserChange = users => event => {
        this.updateState(users[event.target.value])
    }

    /**
     * @description Handles login.
     * Let's dispatch 'setAuthedUser' action and also move to home screen.
     */
    handleLogin = (referrer) => {
        // Let's dispatch action to set authedUser.
        this.props.dispatch(setAuthedUser(this.state.currentUser))
        // Let's see if we have redirect user to any specific page.
        if(referrer !== undefined) {
            // Let's make sure to redirect user to right page after login.
            this.setState(() => ({redirect: 'true'}))
        } else {
            // If there was no referrer, let's move to home screen.
            this.props.history.replace('/')
        }
    }

    /**
     * @description Updates state.
     */
    updateState = user => {
        this.setState(() => ({currentUser: user}))
    }

    render() {
        const {classes, users} = this.props
        const {currentUser, redirect} = this.state
        // Let's get the referrer(if any)
        let referrer = this.props.location.state !== undefined && 
            this.props.location.state.referrer

        // Let's check if we have to redirect, based on the state value 'redirect'
        if(redirect === 'true') {
            // Let's get the path to redirect. If nothing is specified then let's redirect to Home.
            let pathToRedirect = referrer !== undefined ? referrer.pathname : '/'
            return <Redirect to={pathToRedirect}/>
        }

        let userKeys = Object.keys(users)
        // Check if we got the list of users.
        let isInitialDataLoaded = userKeys.length > 0
        return (
            <div className={classes.root}>
                <Card className={classes.loginCard}>
                    <Typography variant='title' color="textSecondary">
                        Would You Rather?
                    </Typography>
                    <Divider className={classes.topDivider}/> {
                        !isInitialDataLoaded ? (
                            <div className={classes.column}><CircularProgress color='secondary' className={classes.progress}/></div>
                        ) : (
                            <div className={classes.column}>
                                <UserAvatar showBig='true' avatarURL={currentUser.avatarURL}/>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Select user</InputLabel>
                                    <NativeSelect
                                        value={currentUser.id}
                                        onChange={this.handleSelectedUserChange(users)}>
                                        {userKeys.map(userId => (
                                            <option key={userId} value={userId}>{userId}</option>
                                        ))}
                                    </NativeSelect>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={() => this.handleLogin(referrer)}>
                                        Login
                                    </Button>
                                </FormControl>
                            </div>
                        )
                    }
                </Card>
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

// Grab data from Redux store as props
const mapStateToProps = ({users}) => ({users})

export default withStyles(styles)(connect(mapStateToProps)(Login))