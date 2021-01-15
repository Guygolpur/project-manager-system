import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'

const RedTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: '#f2c1bd',
    },
}))(TableCell)

function TableRedCell(props) {
    return (
        <>
            <>
                <RedTableRow padding="checkbox" />
            </>
            {Object.entries(props.row).map(([keyName, keyValue], index) => {
                switch (index) {
                    case 0:
                        return <RedTableRow component="th" id={props.id} scope="row" padding="none">
                            {keyValue}
                        </RedTableRow>
                    case 5:
                        return (<RedTableRow align="right">{keyValue.toString()}</RedTableRow>)
                    default:
                        return (<RedTableRow align="right">{keyValue}</RedTableRow>)
                }
            })}
        </>
    )
}

export default TableRedCell