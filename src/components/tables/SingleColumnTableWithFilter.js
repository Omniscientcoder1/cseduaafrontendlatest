import React, { useState, useEffect, useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import FilterBuilder from './FilterBuilder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import Loader from '../container/Loader';
import './table-pagination.css';
import { useNavigate } from 'react-router';
import { roles } from 'src/constants/options';
import { AuthContext } from 'src/context/AuthContext';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    margin: '10px',
    padding: '1rem',
  },
});

const SingleColumnTableWithFilter = ({ columns, fetchData, filterFields }) => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  const handleFilterSubmit = (data) => {
    console.log(data);
    fetch(data);
  };

  const fetch = async (data) => {
    try {
      setLoading(true);
      const res = await fetchData({ page_size: rowsPerPage, page: page + 1, ...data });
      setTableData(res.results);
      setCount(res.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [rowsPerPage, page]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <TableContainer component={Paper}>
      <Loader isLoading={loading}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filters" id="filters">
            <Typography>Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {filterFields && (
              <FilterBuilder filterFields={filterFields} handleFilterSubmit={handleFilterSubmit} />
            )}
          </AccordionDetails>
        </Accordion>
        <Card>
          <CardContent>
            <Table className={classes.table}>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Card className={classes.root}>
                        <CardContent className="m-0 w-100">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <Avatar
                                src={row.profile_picture || ProfileImg}
                                alt={row.profile_picture || ProfileImg}
                                sx={{
                                  width: 48,
                                  height: 48,
                                }}
                              />
                              <div style={{ marginLeft: 12 }}>
                                <div className="d-flex align-items-center">
                                  <Typography variant="h5" component="h2">
                                    {row.first_name
                                      ? row.first_name + ' ' + row.last_name
                                      : 'Unnamed'}
                                  </Typography>
                                  <div style={{ height: '100%', width: '15px' }}></div>
                                  {row.role !== 'None' && (
                                    <div
                                      style={{
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        padding: '5px 10px',
                                        textAlign: 'center',
                                        backgroundColor: '#f0f0f0',
                                      }}
                                    >
                                      {roles.find((role) => role.value === row.role)?.name}
                                    </div>
                                  )}
                                  <div style={{ width: '10px' }}></div>
                                  {row.membership !== 'None' && (
                                    <div
                                      style={{
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        padding: '5px 10px',
                                        textAlign: 'center',
                                        backgroundColor: '#f0f0f0',
                                      }}
                                    >
                                      {row.membership + ' Member'}
                                    </div>
                                  )}
                                </div>
                                <Typography color="textSecondary">{row.email_address}</Typography>
                                <Typography variant="body2" component="p">
                                  {row.batch_number ?? 'Unknown'} Batch
                                </Typography>
                              </div>
                            </div>
                            {!userData?.is_pending && (
                              <Button
                                className={classes.button}
                                onClick={() => navigate(`${row.username}`)}
                                variant="contained"
                                color="primary"
                              >
                                View Details
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="table-pagination"
        />
      </Loader>
    </TableContainer>
  );
};

export default SingleColumnTableWithFilter;
