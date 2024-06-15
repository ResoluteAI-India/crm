import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add'; 
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { rowSelectionStateInitializer } from '@mui/x-data-grid/internals';
import DeleteIcon from '@mui/icons-material/Delete';
import Addclient from './Addclient';
import Editclient from './Editclient';
import Displayclient from './Displayclient';

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

export default function Dummy() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(5);
  const [rows, setRows] = useState([]);
  const firebase = useFirebase()
  
  const empCollectionRef = collection(firebase.db, "clients");


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
    const userDoc = doc(firebase.db, "clients",id);
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
  console.log(data)
  setFormid(data)
  handleEditOpen()
  }

  const [dformid, setDformid] = useState("");
const displayClient = (id,name,address,spoc,number) =>{
  console.log(id,name,address,spoc,number)
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

const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 180,
      editable: true,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 180,
      editable: true,
    },
    {
      field: 'spoc',
      headerName: 'Spoc',
      width: 180,
      editable: true,
    },
    {
      field: 'number',
      headerName: 'Number',
      width: 180,
      editable: true,
    },
    {
      field: "action",
      marginLeft:"50px",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            pt: "10%",
            marginLeft:"-50px"
          }}
        >
                         <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "red",
                                cursor: "pointer",
                                marginTop:"-20px"
                              }}
                              className="cursor-pointer"
                              onClick={() => editClient(params.id,params.name,params.address,params.spoc,params.number)}
                            />
                          <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "red",
                                cursor: "pointer",
                                marginTop:"-20px"
                              }}
                              onClick={() => {
                                deleteUser(params.id);
                              }}
                            />
                        
                              <VisibilityIcon  
                              style={{
                                fontSize: "20px",
                                color: "red",
                                cursor: "pointer",
                                marginTop:"-20px"
                              }}
                              className="cursor-pointer"
                              onClick={() => displayClient(params.id,params.name,params.address,params.spoc,params.number)}
                            />


        </Box>
      ),
    },
  ];

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

    <div>
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

    <Box sx={{ height: 400, width: '90%' ,marginTop:"20px"}}>
    <Box height={25} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 200}}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Client" style={{marginTop:"3%"}}/>
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer  components={['DateRangePicker'] } >
        <DateRangePicker  slotProps={{ textField: { size: 'small' } }} localeText={{ start: 'From', end: 'To' }}/>
      </DemoContainer>
    </LocalizationProvider>
    
    <Button variant="contained" color="error" onClick={handleOpen} style={{backgroundColor:"red",marginLeft:"300px" ,width:"150px",height:"40px",marginBottom:"-140px"}}>
    <AddIcon/> Add Client
      </Button>
      </Stack>

      <DataGrid
      item={true}
        columns={columns}
        rows={rows}
        
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </>
  );
}
