import * as React from 'react';
import { useState,useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
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
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from '@mui/material/Modal';
import Addclient from './Addclient';
import Editclient from './Editclient';
import Displayclient from './Displayclient';
import VisibilityIcon from '@mui/icons-material/Visibility';



const style = {
  position: 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:500,
  bgcolor: 'background.paper',
  border: '1px solid red',
  boxShadow: 24,
  p: 4,
};



export default function Clienttable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);


  const firebase = useFirebase()

  const empCollectionRef = collection(firebase.db, "clients");

  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [displayopen, setDisplayOpen] = useState(false);
  const [view, setView] = useState({ edit: false, view: false });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handledisplayOpen = () => setDisplayOpen(true);
  const handledisplayClose = () => setDisplayOpen(false);

  useEffect(() => {
    getUsers();
  }, []);

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
    const userDoc = doc(firebase.db, "clients", id);
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
  const [formid, setFormid] = useState();

  const editClient = (id,name,address,spoc,number) =>{
  const data = {
    id:id,
    name:name,
    address:address,
    spoc:spoc,
    number:number
  }
  setFormid(data)
  handleEditOpen()
  }

  const [dformid, setDformid] = useState("");
const displayClient = (id,name,address,spoc,number) =>{
  const ddata = {
    id:id,
    name:name,
    address:address,
    spoc:spoc,
    number:number
  }
  setDformid(ddata)
  handledisplayOpen()
  
}

  return (
    <>
     <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Addclient closeEvent={handleClose} />
        </Box>

      </Modal>
    </div>

    <div >
      <Modal
        open={editopen}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <Editclient closeEvent={handleEditClose} formid={formid}/>
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
         <Displayclient closeEvent={handledisplayClose} dfid={dformid}/>
        </Box>
      </Modal>
    </div>

    <Paper sx={{ width: '80%', overflow: 'hidden', marginTop:"5%"}}>
    <Typography
    gutterBottom
    variant="h5"
    component="div"
    sx={{ padding: "-20px",marginRight:"920px"}}
  >
    Clients
  </Typography>
  <Divider />
  <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Products" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button style={{backgroundColor:"red"}} variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
              Add
            </Button>
          </Stack>
          <Box height={10} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
             
                <TableCell   align="left" 
                  style={{ minWidth:"100px" }}
                >
                  Client Name
                 
                </TableCell>
                <TableCell   align="left" 
                  style={{ minWidth:"100px" }}
                >
                 Client Address
                 
                </TableCell>
                <TableCell   align="left" 
                  style={{ minWidth:"100px" }}
                >
                  Spoc
                 
                </TableCell>
                <TableCell   align="left" 
                  style={{ minWidth:"100px" }}
                >
                  Contact Number
                 
                </TableCell>
                  <TableCell   align="left" 
                  style={{ minWidth:"100px" }}
                >
                  Action
                 
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell key={row.id} align="left">
                          {row.name}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.address}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.spoc}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.number}
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "red",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() => editClient(row.id,row.name,row.address,row.spoc,row.number)}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "red",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                             <VisibilityIcon  
                              style={{
                                fontSize: "20px",
                                color: "red",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() => displayClient(row.id,row.name,row.address,row.spoc,row.number)}
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}
