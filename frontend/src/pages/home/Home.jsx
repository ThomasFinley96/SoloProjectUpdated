import Navbar from "../../components/navbar/Navbar"
import { getUserOrders, deleteOrder } from "../../features/order/orderSlice"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import * as constants from "../../assets/constants"
import "./home.css"

const headers = [
  { id: 'no', label: 'No', minWidth: 100 },
  { id: 'method', label: 'Method', minWidth: 170 },
  {
    id: 'size',
    label: 'Size',
    minWidth: 170,
  },
  {
    id: 'cheese',
    label: 'Cheese',
    minWidth: 170,
  },
  {
    id: 'sauce',
    label: 'Sauce',
    minWidth: 170,
  },
  {
    id: 'favourites',
    label: 'Stromboli',
    minWidth: 170,
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
  },
  {
    id: 'action',
    label: 'Action',
  },
];

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orders } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.currentUser)
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getUserOrders(user.id))
  }, [dispatch])

  const handleEdit = (order) => {
    navigate(`/edit/${order._id}`)
  }
  
  const handleDelete = (order) => {    
    dispatch(deleteOrder(order._id))
    setTimeout(() => {
      dispatch(getUserOrders(user.id))
    }, [500]);
  }

  const count = orders? orders.length : 0 

  return (
    <>
      <Navbar count={count} />
      <section className="home-container">
        <div className="home">
          <h2>Order List</h2>  
          <button className="new-order-btn" onClick={() => navigate('/create')}>New Order</button>
          <Paper>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableCell
                        key={header.id}
                        align={header.align}
                        style={{ minWidth: header.minWidth }}
                      >
                        {header.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => {
                    return (
                      <TableRow hover key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {constants.value2lable(constants.METHODS_TYPES, order.method)}
                        </TableCell>
                        <TableCell>
                          {constants.value2lable(constants.SIZES_TYPES, order.size)}
                        </TableCell>
                        <TableCell>
                          {constants.value2lable(constants.CHEESES_TYPES, order.cheese)}
                        </TableCell>
                        <TableCell>
                          {constants.value2lable(constants.SAUCES_TYPES, order.sauce)}
                        </TableCell>
                        <TableCell>
                          {constants.value2lable(constants.STROMBOLI_TYPES, order.favourites)}
                        </TableCell>
                        <TableCell>
                          {order.price}
                        </TableCell>
                        <TableCell className="action">
                          <button className="edit-btn" onClick={() => handleEdit(order)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDelete(order)}>Delete</button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </section>
    </>
  )
}

export default Home