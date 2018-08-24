import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import QuestionCards from './QuestionCards';
import {connect} from 'react-redux';

const styles = {
    root: {
        flexGrow: 1
    },
    navigation: {
        backgroundColor: "#8a8a8a"
    },
    tabLabel: {
        fontSize: 18,
        textTransform: 'initial'
    },
};

class QuestionTypeNavigation extends React.Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    showUnansweredQuestions = (questions, authedUser) => {
        // Let's filter the questions which we need. Here we just need unanswered
        // questions by authedUser.
        const answerKeys = Object.keys(authedUser.answers)
        const questionValues = Object.values(questions)
        let unansweredQuestions = questionValues.filter((question) => !answerKeys.includes(Object.assign(question).id))
        return (<QuestionCards questions={unansweredQuestions}/>)
    }

    showAnsweredQuestions = (questions, authedUser) => {
        // Let's filter the questions which we need. Here we just need answered
        // questions by authedUser.
        const answerKeys = Object.keys(authedUser.answers)
        const questionValues = Object.values(questions)
        let answeredQuestions = questionValues.filter((question) => answerKeys.includes(Object.assign(question).id))
        return (<QuestionCards questions={answeredQuestions}/>)
    }

    render() {
        const {classes, questions, authedUser} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.navigation}>
                    <Tabs value={value} onChange={this.handleChange} indicatorColor="primary">
                        <Tab label={<span className={classes.tabLabel}>Unanswered</span>}/>
                        <Tab label={<span className={classes.tabLabel}>Answered</span>}/>
                    </Tabs>
                </AppBar>
                {value === 0 && this.showUnansweredQuestions(questions, authedUser)}
                {value === 1 && this.showAnsweredQuestions(questions, authedUser)}
            </div>
        );
    }
}

QuestionTypeNavigation.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = ({questions, authedUser}) => ({questions, authedUser});

export default withStyles(styles)(connect(mapStateToProps)(QuestionTypeNavigation));