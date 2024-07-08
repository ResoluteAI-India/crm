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
  doc, collectionGroup, query, where
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from "react-router-dom"


export default function Projecttable({clientname}) {
  
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

 const filteredrows = rows.filter(row => row.client_name == clientname)
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>

   { filteredrows.length > 0 && 
    <Paper sx={{ width: '90%', overflow: 'hidden',marginTop:"30px" }} >
       <Box height={20} />
      <TableContainer sx={{ maxHeight: 350,marginTop:"-18px" }}>
        <Table stickyHeader aria-label="sticky table" >
         <TableHead >
         <TableRow  >
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2"}}>
              <b>Client ID</b> 
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>Project Name</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>Client Name</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>description</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>Agreement Start Date</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>Agreement End Date</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>Status</b>
             </TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {filteredrows
           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
           .map((row) => {
             return (
               <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                     <TableCell  align="left" >
                      {row.id}
                     </TableCell>
                     <TableCell align="left" >
                      {row.project_name}
                     </TableCell>
                     <TableCell  align="left" >
                      {row.client_name}
                     </TableCell>
                     <TableCell align="left">
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
