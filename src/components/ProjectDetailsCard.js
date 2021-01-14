import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
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


function ProjectDetailsCard(props) {
    const classes = useStyles()

    const [projects, setProjects] = useState([]);

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
                    <TableBody>
                        {projects.map((row) => (
                            <TableRow key={row}>
                                {console.log('row: ', row)}
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.score}</TableCell>
                                <TableCell align="right">{row.durationInDays}</TableCell>
                                <TableCell align="right">{row.bugsCount}</TableCell>
                                <TableCell align="right">{row.madeDadeline.toString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
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
