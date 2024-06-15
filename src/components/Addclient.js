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




export default function Addclient({closeEvent}) {


  useEffect(() => {
    getUsers();
  },[]); 

  
    const[name,setName] = useState("")
    const[address,setAddress] = useState("")
    const[spoc,setSpoc] = useState("")
    const[number,setNumber] = useState("")
    const [rows, setRows] = useState([]);
    
    const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const firebase = useFirebase()
  const empCollectionRef = collection(firebase.db, "clients");

    const getUsers = async () => {
      const data = await getDocs(empCollectionRef);
      setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

   
    const handleName = (event) =>{
        setName(event.target.value)
    }
    const handleAddress = (event) =>{
        setAddress(event.target.value)
    }
    const handleSpoc= (event) =>{
        setSpoc(event.target.value)
    }

    const handleNumber= (event) =>{
        setNumber(event.target.value)
    }

    const createClient= async() =>{
       await addDoc(empCollectionRef,{
        name:name,
       address:address,
       spoc:spoc,
       number:number
       })
       getUsers()
       handleClose();
       Swal.fire("submitted","Your file has been submitted","success")
    }
  return (
    <>
    <Box sx={{m:1}}/>
    <Typography variant="h5"  align="center" >
    Add Client
    </Typography>
    <IconButton style={{positon:"absolute",top:"-70px", right:"-320px"}}
      onClick={closeEvent}>
        <CloseIcon style={{color:"red"}}/>
    </IconButton>
    <Box height={5}/>
    <Grid container xs={12}>
     <TextField id="outlined-basic" value={name} onChange={handleName} style={{marginBottom:"3px"}} label="Name" variant="outlined" size='small' sx={{minWidth:"100%"}} />
    </Grid>
    <Grid container xs={12}>
     <TextField id="outlined-basic" value={address} onChange={handleAddress} style={{marginBottom:"3px"}} label="Address" variant="outlined" size='small' sx={{minWidth:"100%"}} />
    </Grid>
    <Grid container xs={12}>
     <TextField id="outlined-basic" value={spoc} onChange={handleSpoc} style={{marginBottom:"3px"}} label="Spoc" variant="outlined" size='small' sx={{minWidth:"100%"}} />
    </Grid>
    <Grid container xs={12}>
     <TextField id="outlined-basic" value={number} onChange={handleNumber} style={{marginBottom:"3px"}} label="Number" variant="outlined" size='small' sx={{minWidth:"100%"}} />
    </Grid>
    <Box sx={{m:2}}/>
    <Grid container xs={12}>
    <Button variant="contained"  color="error"  onClick={createClient} style={{backgroundColor:"red",marginLeft:"120px"}}>
        Submit
      </Button>
    </Grid>
    </>
  )
}