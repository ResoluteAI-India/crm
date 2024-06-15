import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from "sweetalert2";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import {useFirebase} from "../context/Firebase"; 

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function Editproject({closeEvent,formid}) {

  let date = new Date();

  const[id,setId] = useState("")
  const[pname,setPname] = useState("")
  const[cname,setCname] = useState("")

  const[startdate,setStartdate] = useState(dayjs(date))
    let formatstartdate = startdate.toDate()
    let formatstartdatefinal = formatstartdate.toDateString();
    let stringstartdate = formatstartdatefinal.toString()

   const[enddate,setEnddate] = useState(dayjs(date))
    let formatenddate = enddate.toDate()
    let formatenddatefinal = formatenddate.toDateString();
    let stringenddate = formatenddatefinal.toString()

    const [rows, setRows] = useState([]);


  useEffect(() => {
    setId(formid.id)
    setPname(formid.pname)
    setCname(formid.cname)
    // setStartdate(formid.startdate)
    // setEnddate(formid.enddate)
        getUsersclient()

  },[]); 


    const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const firebase = useFirebase()
    const empCollectionRef = collection(firebase.db, "projects");

    const getUsers = async () => {
      const data = await getDocs(empCollectionRef);
      setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };


    
    
    const handlePname = (event) =>{
      setPname(event.target.value)
  }
  // const handleCname = (event) =>{
  //     setCname(event.target.value)
  // }

  // const handleStartdate = (event) =>{
  //     setStartdate(event.target.value)
  // }
  // const handleEnddate = (event) =>{
  //     setEnddate(event.target.value)
  // }


    const editProject = async() =>{
     const userDoc = doc(firebase.db,"projects",formid.id)
     const updatedDoc = {
      pname:pname,
      cname:cname,
      startdate:stringstartdate,
      enddate:stringenddate
       }
       await updateDoc(userDoc,updatedDoc)
       getUsers()
       handleClose();
       Swal.fire("updated","Your file has been updated","success")
    }

    const[clientname,setClientname] = useState("")

    const empCollectionRefclient = collection(firebase.db, "clients");
  
    const getUsersclient = async () => {
      const data = await getDocs(empCollectionRefclient);
      setClientname(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
let jac = Array.from(clientname)
const pac = jac.map(client => client.name)

  return (
    <>
    <Box sx={{m:1}}/>
    <Typography variant="h5"  align="center" >
    Edit Client
    </Typography>
    <IconButton style={{positon:"absolute",top:"-70px", right:"-320px"}}
      onClick={closeEvent}>
        <CloseIcon style={{color:"red"}}/>
    </IconButton>
    <Box height={5}/>
    <Grid container xs={12}>
     <TextField id="outlined-basic" value={pname} onChange={handlePname} style={{marginBottom:"3px"}} label="Project Name" variant="outlined" size='small' sx={{minWidth:"100%"}} />
    </Grid>
    <Grid container xs={12}>
     {/* <TextField id="outlined-basic" value={cname} onChange={handleCname} style={{marginBottom:"3px"}} label="Client Name" variant="outlined" size='small' sx={{minWidth:"100%"}} /> */}
     <Autocomplete
     id="combo-box-demo"
      options={pac}
      sx={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Client name" />}
      value={cname}
      onChange={(event,value)=>setCname(value)}
      style={{marginBottom:"3px"}} label="Client Name" variant="outlined" size='small' freeSolo
    /> 
    </Grid>
    <Grid container xs={12}>
     {/* <TextField id="outlined-basic" value={startdate} onChange={handleStartdate} style={{marginBottom:"3px"}} label="Start Date" variant="outlined" size='small' sx={{minWidth:"100%"}} /> */}
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer  sx={{minWidth:"100%"}}  components={['DateTimePicker', 'DateTimePicker']}>
        <DateTimePicker
          label="Start date"
          value={startdate}
          onChange={(newValue) => setStartdate(newValue)}
         
        />
      </DemoContainer>
    </LocalizationProvider>
    </Grid>
    <Grid container xs={12}>
     {/* <TextField id="outlined-basic" value={enddate} onChange={handleEnddate} style={{marginBottom:"3px"}} label="End date" variant="outlined" size='small' sx={{minWidth:"100%"}} /> */}
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer  sx={{minWidth:"100%"}} components={['DateTimePicker', 'DateTimePicker']}>
        <DateTimePicker
          label="End date"
          value={enddate}
          onChange={(newValue) => setEnddate(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
    </Grid>
    <Box sx={{m:2}}/>
    <Grid container xs={12}>
    <Button variant="contained"  color="error"  onClick={editProject} style={{backgroundColor:"red",marginLeft:"120px"}}>
        Submit
      </Button>
    </Grid>
    </>
  )
}
