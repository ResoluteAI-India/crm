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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useFirebase} from "../context/Firebase"; 
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { rowSelectionStateInitializer } from '@mui/x-data-grid/internals';
// import Updateuser from './Updateuser';
// import Adduser from './Adduser';
// import Displayuser from './Displayuser';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid red',
  boxShadow: 24,
  p: 4,
};


export default function Userslist() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(5);
  const [rows, setRows] = useState([]);
  const firebase = useFirebase()
  const empCollectionRef = collection(firebase.db, "dashboard");


  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [displayopen, setDisplayOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  
  const handledisplayOpen = () => setDisplayOpen(true);
  const handledisplayClose = () => setDisplayOpen(false);

  useEffect(() => {
    getUsers();
  },[]);

  const getUsers = async () => {
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

  const deleteUser = (id) => {
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
    const userDoc = doc(firebase.db, "user",id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
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

const [formid, setFormid] = useState("");
const updateUser = (id,name,designation,email,updated_by) =>{
const data = {
  id:id,
  name:name,
  designation:designation,
  email:email,
  updated_by:updated_by
}
setFormid(data)
handleEditOpen()
}


const [dformid, setDformid] = useState("");
const displayUser = (id,name,designation,email,updated_by) =>{
  const ddata = {
    id:id,
    name:name,
    designation:designation,
    email:email,
    updated_by:updated_by
  }
  setDformid(ddata)
  handledisplayOpen()
  
}
  return (
    <>
     <div >
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         {/* <Adduser closeEvent={handleClose}/> */}
        </Box>
      </Modal>
      <Modal
        open={editopen}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         {/* <Updateuser closeEvent={handleEditClose} fid={formid}/> */}
        </Box>
      </Modal>
    </div>
    
    <div>
      <Modal
        open={displayopen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         {/* <Displayuser closeEvent={handledisplayClose} dfid={dformid}/> */}
        </Box>
      </Modal>
    </div>
   { rows.length > 0 && 
    <Paper sx={{ width: '100%', overflow: 'hidden' }} >
       {/* <Box height={20} />""
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Users" />
              )}
            />
            <Typography 
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
        
        <Button variant="contained" color="error" onClick={handleOpen} style={{backgroundColor:"red"}}>
        Add User
      </Button>
          </Stack>
          <Box height={10} /> */}
      <TableContainer sx={{ maxHeight: 350,marginTop:"20px" }}>
        <Table stickyHeader aria-label="sticky table" >
         <TableHead >
         <TableRow  >
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2"}}>
              <b>Project Number</b> 
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>Project Name</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>Responsible Team</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
               <b>Created On</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px" , backgroundColor:"#E5E4E2"}}>
                <b>Closing Date</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
                <b>Status</b>
             </TableCell>
             {/* <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#d3d3d3" }}>
              <b>Action</b>
             </TableCell> */}
         </TableRow>
       </TableHead>
       <TableBody>
         {rows
           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
           .map((row) => {
             return (
               <TableRow hover role="checkbox" tabIndex={-1} >
                     <TableCell  align="left" >
                      {row.project_number}
                     </TableCell>
                     <TableCell align="left" >
                      {row.project_name}
                     </TableCell>
                     <TableCell  align="left" >
                      {row.responsible_team}
                     </TableCell>
                     <TableCell align="left">
                      {row.created_on}
                     </TableCell>
                     <TableCell align="left">
                     {row.closing_date}
                    </TableCell>
                    <TableCell align="left">
                    {row.status}
                   </TableCell>
              
                        {/* <TableCell align="left" >
                          <Stack spacing={2} direction="row">
                          <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "red",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                            //   onClick={() => updateUser(row.id,row.name,row.designation,row.email,row.updated_by)}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "red",
                                cursor: "pointer",
                              }}
                            //   onClick={() => {deleteUser(row.id);}}
                            />
                             <VisibilityIcon  
                              style={{
                                fontSize: "20px",
                                color: "red",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                            //   onClick={() => displayUser(row.id,row.name,row.designation,row.email,row.updated_by)}
                            />
                          </Stack>
                        </TableCell> */}
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
