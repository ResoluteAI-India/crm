import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import {useFirebase} from "../context/Firebase";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Autocomplete from '@mui/material/Autocomplete';




export default function Addproject({closeEvent}) {
  const [rows, setRows] = useState([]);    
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getUsers();
    getUsersclient()
  },[]); 

  let date = new Date();
  
    const[pname,setPname] = useState("")
    const[cname,setCname] = useState("")

    const firebase = useFirebase()

    const empCollectionRef = collection(firebase.db, "projects");
  
      const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };


      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);


    const[startdate,setStartdate] = useState(dayjs(date))
   
    let formatstartdate = startdate.toDate()
   
    let formatstartdatefinal = formatstartdate.toDateString();
   
    let stringstartdate = formatstartdatefinal.toString()
  
    // console.log(typeof(stringstartdate))

    const[enddate,setEnddate] = useState(dayjs(date))
    let formatenddate = enddate.toDate()
    let formatenddatefinal = formatenddate.toDateString();
    let stringenddate = formatenddatefinal.toString()

   
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

    const createProject = async() =>{
       await addDoc(empCollectionRef,{
        pname:pname,
        cname:cname,
        startdate:stringstartdate,
        enddate:stringenddate
       })
       
       handleClose();
       Swal.fire("submitted","Your file has been submitted","success")
       setTimeout(()=>{
        window.location.reload();
       },4000)
       getUsers()
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
    Add Project
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
     {/* <TextField id="outlined-basic" value={cname} onChange={handleCname} style={{marginBottom:"3px"}} label="Client Name " variant="outlined" size='small' sx={{minWidth:"100%"}} /> */}
     <Autocomplete
     id="combo-box-demo"
      options={pac}
      sx={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Client Name" />}
      onChange={(event,value)=>setCname(value)}
      style={{marginBottom:"3px"}} label="Client Name" variant="outlined" size='small' freeSolo
    /> 
    </Grid>
    <Grid container xs={12}>
     {/* <TextField id="outlined-basic" value={startdate} onChange={handleStartdate} style={{marginBottom:"3px"}} label="Start Date" variant="outlined" size='small' sx={{minWidth:"100%"}} /> */}
     {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Start Date"
          value={startdate}
          onChange={(newValue) => setStartdate(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider> */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer  sx={{minWidth:"100%"}}  components={['DateTimePicker', 'DateTimePicker']}>
        <DateTimePicker
          label="Start date"
          value={startdate}
          onChange={(newValue) => setStartdate(newValue)}
          format='MM/DD/YYYY'
         
        />
      </DemoContainer>
    </LocalizationProvider>
   </Grid>
    <Grid container xs={12}>
     {/* <TextField id="outlined-basic" value={enddate} onChange={handleEnddate} style={{marginBottom:"3px"}} label="End Date" variant="outlined" size='small' sx={{minWidth:"100%"}} /> */}
     {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="End Date"
          value={enddate}
          onChange={(newValue) => setEnddate(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider> */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer  sx={{minWidth:"100%"}} components={['DateTimePicker', 'DateTimePicker']}>
        <DateTimePicker
          label="End date"
          value={enddate}
          onChange={(newValue) => setEnddate(newValue)}
           format='MM/DD/YYYY'
        />
      </DemoContainer>
    </LocalizationProvider>
    </Grid>
    <Box sx={{m:2}}/>
    <Grid container xs={12}>
    <Button variant="contained"  color="error"  onClick={createProject} style={{backgroundColor:"red",marginLeft:"120px"}}>
        Submit
      </Button>
    </Grid>
    </>
  )
}