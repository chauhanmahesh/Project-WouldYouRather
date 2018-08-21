import React from 'react';
import {connect} from 'react-redux';
import QuestionCard from './QuestionCard';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center'
    }
});

class QuestionCards extends React.Component {
    render() {
        const {questions, users, classes} = this.props
        const questionKeys = Object.keys(questions)
        if (questionKeys.length === 0) {
            return (
                <div className={classes.root}>
                    <Typography variant='title' color="textSecondary">
                        Sorry, no questions to show :'(
                    </Typography>
                </div>
            )
        }
        return (
            <Grid container className={classes.root} spacing={16}>
                {questionKeys.map((questionKey) => (
                    <Grid item key={questionKey}>
                        <QuestionCard
                            key={questionKey}
                            cardQuestion={questions[questionKey]}
                            author={users[questions[questionKey].author]}/>
                    </Grid>
                ))
}
            </Grid>
        )
    }
}

const mapStateToProps = ({authedUser, users}) => ({authedUser, users});

export default withStyles(styles)(connect(mapStateToProps)(QuestionCards));