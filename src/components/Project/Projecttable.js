import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useFirebase} from "../../context/Firebase"; 
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from "react-router-dom"


export default function Projectable() {
  
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(5);
  const [rows, setRows] = useState([]);
  const firebase = useFirebase()
 
  useEffect(() => {
    getUsers();
  },[]);

  const getUsers = async () => {
    const empCollectionRef = collection(firebase.db, "Project");
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  

  const deleteClient = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };
  const deleteApi = async (id) => {
    const userDoc = doc(firebase.db, "Client",id);
    await deleteDoc(userDoc);
    Swal.fire("Your file has been deleted.");
    getUsers();

  };

  
  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      getUsers();
    }
  };


  return (
    <>
    <Stack direction="row" spacing={2} className="my-2 mb-2" style={{marginLeft:"55px"}}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              style={{marginTop:"50px"}}
              sx={{ width: 200}}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.project_name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Client" />
              )}
            />
            <Typography 
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
            </Typography>
    </Stack>

   { rows.length > 0 && 
    <Paper sx={{ width: '90%', overflow: 'hidden',marginTop:"30px" }} >
       <Box height={20} />
      <TableContainer sx={{ maxHeight: 350,marginTop:"-18px" }}>
        <Table stickyHeader aria-label="sticky table" >
         <TableHead >
         <TableRow >
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#EEEEEE"}}>
              <b>Project Name</b> 
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#EEEEEE" }}>
             <b>Client Name</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#EEEEEE" }}>
             <b>description</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#EEEEEE" }}>
             <b>Agreement Start Date</b>
             </TableCell>
              <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#EEEEEE" }}>
             <b>Agreement End Date</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#EEEEEE" }}>
             <b>Status</b>
             </TableCell>
           
         </TableRow>
       </TableHead>
       <TableBody>
         {rows
           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
           .map((row) => {
             return (
               <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                     <TableCell  align="left" >
                      {row.project_name}
                     </TableCell>
                     <TableCell align="left" >
                      {row.client_name}
                     </TableCell>
                     <TableCell  align="left" >
                      {row.description}
                     </TableCell>
                     <TableCell align="left">
                      {row.agreement_start_date}
                     </TableCell>
                     <TableCell align="left">
                      {row.agreement_end_date}
                     </TableCell>
                     <TableCell align="left">
                      {row.status}
                     </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10,20]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
}
    </>
  );
}
