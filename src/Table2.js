import React from 'react'
import {sortAscData, prettyStats2} from './util';
import numeral from "numeral";
import './Table.css'    

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 18,
    },
  }))(TableCell);

  
const StyledTableRow = withStyles((theme) => ({
root: {
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
},
}))(TableRow);

const useStyles = makeStyles({
    table: {
      minWidth: 100,
    },
  });
    

  
export default function BasicTable({countries}) {
    const classes = useStyles();

    return (
      <TableContainer className='table' component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className='sike'>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell align="right">
                Cases
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map(({country, cases}) => ( 
              <TableRow key={country}>
                <TableCell component="th" scope="row">
                  {country}
                </TableCell>
                <TableCell align="right"><strong>{numeral(cases).format("0,0")}</strong></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }





/* function Table({countries}) {
    return (
        <div className='table'>
            {countries.map(({country, cases}) => (                
                <tr>
                    <td>{country}</td>
                    <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
            ))}
            
        </div>
    )
}
 */
/* WITHOUT DESTRUCTURING

function Table({countries}) {
    return (
        <div className='table'>
            {countries.map(country => (                
                <tr>
                    <td>{country.country}</td>
                    <td><strong>{country.cases}</strong></td>
                </tr>
            ))}
            
        </div>
    )
}

*/
