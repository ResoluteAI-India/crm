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
  updateDoc,
  doc
} from "firebase/firestore";
import {useFirebase} from "../context/Firebase"; 
import VisibilityIcon from '@mui/icons-material/Visibility';



export default function Displayclient({closeEvent,dfid}) {

  const[id,setId] = useState("")
    const[name,setName] = useState("")
    const[address,setAddress] = useState("")
    const[spoc,setSpoc] = useState("")
    const[number,setNumber] = useState("")

    const [rows, setRows] = useState([]);


  useEffect(() => {
    setId(dfid.id)
    setName(dfid.name)
    setAddress(dfid.address)
    setSpoc(dfid.spoc)
    setNumber(dfid.number)
  },[]); 

  
    const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const firebase = useFirebase()
    const empCollectionRef = collection(firebase.db, "clients");

    const getUsers = async () => {
      const data = await getDocs(empCollectionRef);
      setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };


    const handleId = (event) =>{
      setId(dfid.id)
  }
    const handleName = (event) =>{
        setName(event.target.value)
    }
    const handleAddress = (event) =>{
        setAddress(event.target.value)
    }
    const handleSpoc = (event) =>{
        setSpoc(event.target.value)
    }
  
    const handleNumber = (event) =>{
        setNumber(event.target.value)
    }


  return (
    <>
    <IconButton style={{positon:"absolute",top:"-30px", right:"-320px"}}
      onClick={closeEvent}>
        <CloseIcon style={{color:"red"}}/>
    </IconButton>
    <Box height={5}/>
   
    <Grid container xs={12}>
     <TextField id="name" value={name} onChange={handleName} disabled style={{marginBottom:"3px",fontWeight:"1400"}} label="Name" variant="outlined" size='small' sx={{minWidth:"100%"}} />
    </Grid>
    <Grid container xs={12}>
     <TextField id="designation" value={address} onChange={handleAddress} disabled style={{marginBottom:"3px",fontWeight:"1400"}} label="Address" variant="outlined" size='small' sx={{minWidth:"100%"}} />
    </Grid>
    <Grid container xs={12}>
     <TextField id="email" value={spoc} onChange={handleSpoc} disabled style={{marginBottom:"3px",fontWeight:"1400"}} label="Spoc" variant="outlined" size='small' sx={{minWidth:"100%"}}/>
    </Grid>
    <Grid container xs={12}>
     <TextField id="updated_by" value={number} onChange={handleNumber} disabled style={{marginBottom:"3px",fontWeight:"1400"}} label="Number" variant="outlined" size='small' sx={{minWidth:"100%"}} />
    </Grid>
    </>
  )
}