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


export default function Logtable() {
  
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(5);
  const [rows, setRows] = useState([]);
  const firebase = useFirebase()
 
  useEffect(() => {
    getUsers();
  },[]);

  const getUsers = async () => {
    const empCollectionRef = collection(firebase.db, "Client");
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


  const clientDisplay = (id,client_name,industry_type,email,phone,address,comment,service_type,core_skills,payment_terms,bank_name,account_holder_name,account_number,branch_name,ifsc_code,agreement_start_date,agreement_end_date,spoc) =>{
  navigate("/displayclient" ,{state:{id,client_name,industry_type,email,phone,address,comment,service_type,core_skills,payment_terms,bank_name,account_holder_name,account_number,branch_name,ifsc_code,agreement_start_date,agreement_end_date,spoc}}) 
}

  return (
    <>
    
    <Stack direction="row" spacing={2} className="my-2 mb-2" style={{marginLeft:"55px"}}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 200}}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.client_name || ""}
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
         <TableRow  >
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2"}}>
              <b>Client ID</b> 
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>Client Name</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>Email</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>Number</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
              <b>Action</b>
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
                      {row.id}
                     </TableCell>
                     <TableCell align="left" >
                      {row.client_name}
                     </TableCell>
                     <TableCell  align="left" >
                      {row.email}
                     </TableCell>
                     <TableCell align="left">
                      {row.phone}
                     </TableCell>
                        <TableCell align="left" >
                          <Stack spacing={2} direction="row">
                            <OpenInNewIcon  
                              style={{
                                fontSize: "20px",
                                color: "red",
                                cursor: "pointer",
                                marginTop:"-20px",
                              }}
                              className="cursor-pointer"
                            onClick={() => clientDisplay(row.id,row.client_name,row.industry_type,row.email,row.phone,row.address,row.comment,row.service_type,row.core_skills,row.payment_terms,row.bank_name,row.account_holder_name,row.account_number,row.branch_name,row.ifsc_code,row.agreement_start_date,row.agreement_end_date,row.spoc)}
                            />
                          </Stack>
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
