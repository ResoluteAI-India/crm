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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { rowSelectionStateInitializer } from '@mui/x-data-grid/internals';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useNavigate } from "react-router-dom"
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
 
  boxShadow: 24,
  p: 4,
};


export default function Projectdocumentstable() {
  
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(5);
  const [rows, setRows] = useState([]);
 

  

  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [displayopen, setDisplayOpen] = useState(false);

 
  
  


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  




  

  return (
    <>
     
   

    
   
    <Paper sx={{ width: '70%', overflow: 'hidden',marginTop:"1px" }} >
      
      <TableContainer sx={{ maxHeight: 350 }}>
        <Table stickyHeader aria-label="sticky table" >
         <TableHead >
         <TableRow  >
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#d3d3d3",color:"Black"}}>
              <b>Documents</b> 
             </TableCell>
             {/* <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"red" ,color:"Black"}}>
             <b>Upload NDA</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"red",color:"Black" }}>
             <b>Upload MSA</b>
             </TableCell> */}
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#d3d3d3",color:"Black" }}>
             <b>Download</b>
             </TableCell>
            
           
            
         </TableRow>
       </TableHead>
       <TableBody>
         
               
                  <TableRow hover role="checkbox" tabIndex={-1} >
                     <TableCell align="left" >
                    Status Report
                     </TableCell>
                     
                   
                        <TableCell align="left" >
                          <Stack spacing={2} direction="row">
                            < FileDownloadOutlinedIcon
                              style={{
                                fontSize: "40px",
                                color: "red",
                                cursor: "pointer",
                                marginTop:"-10px",
                                marginLeft:"9%"
                              }}
                              className="cursor-pointer"
                              // onClick={() => clientInformation(row.id,row.project_number,row.project_name,row.responsible_team,row.created_on,row.closing_date,row.status)}
                            />
                          </Stack>
                        </TableCell>
                  </TableRow>

                 
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

    </>
  );
}
