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
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const API_BASE_URL = 'https://private-052d6-testapi4528.apiary-mock.com/info'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'score', numeric: true, disablePadding: false, label: 'Score' },
    { id: 'durationInDays', numeric: true, disablePadding: false, label: 'Duration' },
    { id: 'bugsCount', numeric: true, disablePadding: false, label: 'Bugs' },
    { id: 'madeDadeline', numeric: false, disablePadding: false, label: 'Made on dadeline' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" />
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}))

const GreenTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: '#bce3cb',
    },
}))(TableCell);

const RedTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: '#f2c1bd',
    },
}))(TableCell)

function ProjectsDetailsTable(props) {
    const classes = useStyles();
    const [projects, setProjects] = useState([])
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('score');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        axios.get(API_BASE_URL, {
            headers: {
                'Authorization': `Bearer ${props.auth.user.token}`
            }
        })
            .then(function (response) {
                if (response.status === 201) {
                    console.log('201')
                    console.log('response.data: ', response.data)
                    setProjects(response.data)
                    console.log('projects: ', projects.length)
                    console.log('projects: ', projects)
                } else {
                }
            })
            .catch(function (error) {
                console.log(error)
            })

    }, [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, projects.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={projects.length}
                        />
                        {stableSort(projects, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableBody>
                                        {row.score > 90 || row.score < 70 ?
                                            <>
                                                {row.score < 70 ?
                                                    <>
                                                        <TableRow
                                                            hover
                                                            tabIndex={-1}
                                                            key={row.id}
                                                        >
                                                            <RedTableRow padding="checkbox" />
                                                            <RedTableRow component="th" id={labelId} scope="row" padding="none">
                                                                {row.id}
                                                            </RedTableRow>
                                                            <RedTableRow align="right">{row.name}</RedTableRow>
                                                            <RedTableRow align="right">{row.score}</RedTableRow>
                                                            <RedTableRow align="right">{row.durationInDays}</RedTableRow>
                                                            <RedTableRow align="right">{row.bugsCount}</RedTableRow>
                                                            <RedTableRow align="right">{row.madeDadeline.toString()}</RedTableRow>
                                                        </TableRow>
                                                        {emptyRows > 0 && (
                                                            <TableRow style={{ height: (53) * emptyRows }}>
                                                                <RedTableRow colSpan={6} />
                                                            </TableRow>
                                                        )}</>
                                                    : <>
                                                        <TableRow
                                                            hover
                                                            tabIndex={-1}
                                                            key={row.id}
                                                        >
                                                            <GreenTableRow padding="checkbox" />
                                                            <GreenTableRow component="th" id={labelId} scope="row" padding="none">
                                                                {row.id}
                                                            </GreenTableRow>
                                                            <GreenTableRow align="right">{row.name}</GreenTableRow>
                                                            <GreenTableRow align="right">{row.score}</GreenTableRow>
                                                            <GreenTableRow align="right">{row.durationInDays}</GreenTableRow>
                                                            <GreenTableRow align="right">{row.bugsCount}</GreenTableRow>
                                                            <GreenTableRow align="right">{row.madeDadeline.toString()}</GreenTableRow>
                                                        </TableRow>
                                                        {emptyRows > 0 && (
                                                            <TableRow style={{ height: (53) * emptyRows }}>
                                                                <GreenTableRow colSpan={6} />
                                                            </TableRow>
                                                        )}
                                                    </>

                                                }
                                            </>
                                            :
                                            <>
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={row.id}
                                                >
                                                    <TableCell padding="checkbox" />
                                                    <TableCell component="th" id={labelId} scope="row" padding="none">
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell align="right">{row.name}</TableCell>
                                                    <TableCell align="right">{row.score}</TableCell>
                                                    <TableCell align="right">{row.durationInDays}</TableCell>
                                                    <TableCell align="right">{row.bugsCount}</TableCell>
                                                    <TableCell align="right">{row.madeDadeline.toString()}</TableCell>
                                                </TableRow>
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: (53) * emptyRows }}>
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )}
                                            </>}
                                    </TableBody>
                                );
                            })}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={projects.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ProjectsDetailsTable)
