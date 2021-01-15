import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'

const GreenTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: '#bce3cb',
    },
}))(TableCell)

function TableGreenCell(props) {
    return (
        <>
            <>
                <GreenTableRow padding="checkbox" />
            </>
            {Object.entries(props.row).map(([keyName, keyValue], index) => {
                switch (index) {
                    case 0:
                        return <GreenTableRow component="th" id={props.id} scope="row" padding="none">
                            {keyValue}
                        </GreenTableRow>
                    case 5:
                        return (<GreenTableRow align="right">{keyValue.toString()}</GreenTableRow>)
                    default:
                        return (<GreenTableRow align="right">{keyValue}</GreenTableRow>)
                }
            })}
        </>
    )
}

export default TableGreenCell