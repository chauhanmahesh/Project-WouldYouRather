import React from 'react';
import Navigation from './Navigation';
import {connect} from 'react-redux'
import QuestionCards from './QuestionCards';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Navigation currentPage='dashboard'/>
                <QuestionCards/>
            </div>
        )
    }
}

const mapStateToProps = ({questions}) => ({questions});

export default connect(mapStateToProps)(Dashboard);