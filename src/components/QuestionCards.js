import React from 'react';
import {connect} from 'react-redux';
import QuestionCard from './QuestionCard';

class QuestionCards extends React.Component {
    render() {
        const {questions, users} = this.props
        const questionKeys = Object.keys(questions)
        if (questionKeys.lenth == 0) {
            return (
                <div></div>
            )
        }
        return (
            <ol className="questions-grid">
                {questionKeys.map((questionKey) => (<QuestionCard
                    key={questionKey}
                    cardQuestion={questions[questionKey]}
                    author={users[questions[questionKey].author]}/>))}
            </ol>
        )
    }
}

const mapStateToProps = ({questions, users}) => ({questions, users});

export default connect(mapStateToProps)(QuestionCards);