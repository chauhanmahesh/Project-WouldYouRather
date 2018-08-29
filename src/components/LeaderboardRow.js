import React from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {TableRow, Typography, Avatar, TableCell} from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '70%',
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center'
    },
    table: {
        alignItems: 'center'
    },
    tableRow: {
        marginTop: 10,
        marginBottom: 10,
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default
        }
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
    },
    score: {
        background: '#d16161',
        width: 40,
        height: 40,
        alignItems: 'center'
    },
    scoreLabel: {
        align: "center",
        color: "white"
    }
});

const LeaderboardRow = (props) => {
    const {leaderboardData, classes} = props
    return (
        <TableRow className={classes.tableRow}>
            <TableCell>
                <div className={classes.row}>
                    <Avatar src={leaderboardData.avatarURL} width='50' height='50'/>
                    <Typography variant='subheading' color="textSecondary" align="center" style={{marginLeft: 20}}>
                        {leaderboardData.name}
                    </Typography>
                </div>
            </TableCell>
            <TableCell><Typography variant='subheading' color="textSecondary" align="center">
                            {leaderboardData.totalQuestionsCreated}
                        </Typography></TableCell>
            <TableCell><Typography variant='subheading' color="textSecondary" align="center">
                            {leaderboardData.totalAnswers}
                        </Typography></TableCell>
            <TableCell>
                <div className={classes.column}>
                    <Avatar className={classes.score}>
                        <Typography variant='subheading' className={classes.scoreLabel}>
                            {leaderboardData.score}
                        </Typography>
                    </Avatar>
                </div>
            </TableCell>
        </TableRow>
    )
}

LeaderboardRow.propTypes = {
    classes: PropTypes.object.isRequired,
    leaderboardData: PropTypes.object.isRequired
}

export default withStyles(styles)(LeaderboardRow)