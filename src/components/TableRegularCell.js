import React from 'react'
import TableCell from '@material-ui/core/TableCell'

function TableRegularCell(props) {
    return (
        <>
            <>
                <TableCell padding="checkbox" />
            </>
            {Object.entries(props.row).map(([keyName, keyValue], index) => {
                switch (index) {
                    case 0:
                        return <TableCell component="th" id={props.id} scope="row" padding="none">
                            {keyValue}
                        </TableCell>
                    case 5:
                        return (<TableCell align="right">{keyValue.toString()}</TableCell>)
                    default:
                        return (<TableCell align="right">{keyValue}</TableCell>)
                }
            })}
        </>
    )
}

export default TableRegularCell