import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const API_BASE_URL = 'https://private-052d6-testapi4528.apiary-mock.com/info'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

const GreenTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: '#bce3cb',
    },
}))(TableCell);

const RedTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: '#f2c1bd',
    },
}))(TableCell);


function ProjectDetailsCard(props) {
    const classes = useStyles()

    const [projects, setProjects] = useState([])

    useEffect(() => {
        axios.get(API_BASE_URL, {
            headers: {
                'Authorization': `Bearer ${props.auth.user.token}`
            }
        })
            .then(function (response) {
                if (response.status === 201) {
                    console.log('201')
                    setProjects(response.data)
                } else {
                }
            })
            .catch(function (error) {
                console.log(error)
            })

    }, [])

    return (
        <div className="App-home">
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">name</TableCell>
                            <TableCell align="right">score</TableCell>
                            <TableCell align="right">durationInDays</TableCell>
                            <TableCell align="right">bugsCount</TableCell>
                            <TableCell align="right">madeDadeline</TableCell>
                        </TableRow>
                    </TableHead>
                    {projects.map((row) => (
                        <TableBody>
                            {row.score > 90 || row.score < 70 ?
                                <>
                                    {row.score < 70 ?
                                        <>
                                            <RedTableRow align="right">{row.id}</RedTableRow>
                                            <RedTableRow align="right">{row.name}</RedTableRow>
                                            <RedTableRow align="right">{row.score}</RedTableRow>
                                            <RedTableRow align="right">{row.durationInDays}</RedTableRow>
                                            <RedTableRow align="right">{row.bugsCount}</RedTableRow>
                                            <RedTableRow align="right">{row.madeDadeline.toString()}</RedTableRow>
                                        </> :
                                        <>
                                            <GreenTableRow align="right">{row.id}</GreenTableRow>
                                            <GreenTableRow align="right">{row.name}</GreenTableRow>
                                            <GreenTableRow align="right">{row.score}</GreenTableRow>
                                            <GreenTableRow align="right">{row.durationInDays}</GreenTableRow>
                                            <GreenTableRow align="right">{row.bugsCount}</GreenTableRow>
                                            <GreenTableRow align="right">{row.madeDadeline.toString()}</GreenTableRow>
                                        </>
                                    }

                                </>
                                :
                                <TableRow key={row}>
                                    <TableCell align="right">{row.id}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.score}</TableCell>
                                    <TableCell align="right">{row.durationInDays}</TableCell>
                                    <TableCell align="right">{row.bugsCount}</TableCell>
                                    <TableCell align="right">{row.madeDadeline.toString()}</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ProjectDetailsCard)
