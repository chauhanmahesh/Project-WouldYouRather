import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {TableBody, TableCell, TableHead, TableRow, Paper, Typography} from '@material-ui/core';
import {connect} from 'react-redux'
import LeaderboardRow from './LeaderboardRow'

const styles = theme => ({
    root: {
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center'
    },
    table: {
        alignItems: 'center'
    },
    tableHeader: {
        backgroundColor: '#619bd1'
    },
    headerLabel: {
        color: 'white'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    }
});

class Leaderboard extends React.Component {
    /**
     * @description Lets prepare leaderboard data to be displayed.
     * @param {Object} users - All the users to be displayed in the leaderboard.
     * @return {Object} All users sorted list (based on score) with leaderboard data.
     */
    prepareLeaderboardData = (users) => {
        const userKeys = Object.keys(users)
        // Let's prepare score for each user.
        let usersWithScore = userKeys.map((userkey) => {
            const user = users[userkey]
            const totalQuestionsCreated = user.questions.length
            const totalAnswers = Object
                .keys(user.answers)
                .length
            const score = totalQuestionsCreated + totalAnswers
            return {
                id: user.id,
                name: user.name,
                avatarURL: user.avatarURL,
                totalQuestionsCreated,
                totalAnswers,
                score
            }
        })
        // Let's sort the data before returning.
        return usersWithScore.sort((a, b) => b.score > a.score)
    }

    /**
     * @description Render's leaderboard table header.
     * @param {Object} classes - For styles.
     */
    renderTableHeader = (classes) => {
        return (
            <TableHead>
                <TableRow className={classes.tableHeader}>
                    <TableCell/>
                    <TableCell>
                        <Typography variant='subheading' className={classes.headerLabel}>
                            Questions Created
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='subheading' className={classes.headerLabel}>
                            Answers Given
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant='subheading' className={classes.headerLabel}>
                            Final Score
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
        )
    }

    render() {
        const {classes, users} = this.props
        // Let's get the leaderboard data.
        const leaderboardDataList = this.prepareLeaderboardData(users)
        return (
            <div className={classes.root}>
                <Paper >
                    <Table className={classes.table}>
                        {this.renderTableHeader(classes)}
                        <TableBody>
                            {leaderboardDataList.map(leaderboardData => (
                                <LeaderboardRow key={leaderboardData.id} leaderboardData={leaderboardData}/>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

Leaderboard.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = ({users}) => ({users})

export default withRouter(withStyles(styles)(connect(mapStateToProps)(Leaderboard)))