import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import {relative} from 'upath';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    questionCard: {
        margin: 20,
        padding: 20
    },
    topDivider: {
        marginTop: 10
    },
    row: {
        display: 'flex',
        marginTop: 20,
        justifyContent: 'center'
    },
    column: {
        display: 'no-flex',
        justifyContent: 'center',
        marginLeft: 20
    },
    optionFirstCard: {
        textTransform: 'none',
        width: 150,
        minHeight: 150,
        background: '#d16161'
    },
    optionSecondCard: {
        textTransform: 'none',
        width: 150,
        minHeight: 150,
        marginLeft: 10,
        background: '#619bd1'
    },
    optionText: {
        color: 'white',
        margin: 5,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
    },
    avatar: {
        margin: 10
    },
    bigAvatar: {
        width: 100,
        height: 100
    }
});

class QuestionCard extends React.Component {
    render() {
        const {classes, cardQuestion, author} = this.props;
        return (
            <Card className={classes.questionCard}>
                <Typography variant='title' color="textSecondary">
                    {author.name} asks
                </Typography>
                <Divider className={classes.topDivider}/>
                <div className={classes.row}>
                    <Avatar
                        src={author.avatarURL}
                        className={classNames(classes.avatar, classes.bigAvatar)}/>
                    <div className={classes.column}>
                        <Typography variant='subheading' color="primary">
                            Would you rather?
                        </Typography>
                        <div className={classes.row}>
                            <Button className={classes.optionFirstCard}>
                                <Typography className={classes.optionText} variant='title'>
                                    {cardQuestion.optionOne.text}
                                </Typography>
                            </Button>
                            <Button className={classes.optionSecondCard}>
                                <Typography className={classes.optionText} variant='title'>
                                    {cardQuestion.optionTwo.text}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

QuestionCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuestionCard);