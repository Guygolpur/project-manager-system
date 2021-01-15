import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

function PersonalDetailsCard(props) {
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>
    return (
        <div className="App-card">
            {props.auth.user ?
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {props.auth.user.name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {bull} {props.auth.user.Team} {bull}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {props.auth.user.joinedAt}
                        </Typography>
                        <img src={`${props.auth.user.avatar}`} />
                    </CardContent>
                </Card>
                : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PersonalDetailsCard)
