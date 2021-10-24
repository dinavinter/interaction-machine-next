import {
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  withStyles
} from '@material-ui/core'
import * as React from 'react'
import {InteractionRecord} from "../InteractionTemplate";

export interface  Subscription {
  name: string
  subscribed: boolean
}

 

export interface InteractionListProps {
  interactions: InteractionRecord[]
}

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  })
)(TableRow)

export const InteractionList: React.FC<InteractionListProps> = ({ interactions }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        {/*<TableHead>*/}
        {/*  <TableRow>*/}
        {/*    <TableCell>Email</TableCell>*/}
        {/*    <TableCell align='right'>Updated</TableCell>*/}
        {/*  </TableRow>*/}
        {/*</TableHead>*/}
        <TableBody>
          {interactions.map(row => (
            <StyledTableRow key={row.id}>
              <TableCell component='th' scope='row'>
                {row.uid}
              </TableCell>
              {row.phonenumber && <TableCell component='th' scope='row'>
                {row.phonenumber}
              </TableCell>}
              {row.email && <TableCell component='th' scope='row'>
                {row.email}
              </TableCell>}
              <TableCell component='th' scope='row'>
                {row.firstname}
              </TableCell>
              <TableCell align='right'>{new Date(row.updated).toISOString()}</TableCell>
            </StyledTableRow>
              
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
