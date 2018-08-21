import React from 'react';
import {Avatar} from '@material-ui/core';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
    avatar: {
        marginLeft: 10,
        marginRight: 10
    },
    bigAvatar: {
        width: 100,
        height: 100
    }
});

const UserAvatar = (props) => {
    const {showBig, classes, avatarURL} = props
    return showBig === 'true'
        ? (<Avatar src={avatarURL} className={classNames(classes.avatar, classes.bigAvatar)}/>)
        : (<Avatar src={avatarURL} className={classes.avatar}/>)
}

UserAvatar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserAvatar);