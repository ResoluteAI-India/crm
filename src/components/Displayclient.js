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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


export default function Displayuser({closeEvent,dfid}) {

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

  return (
    <>
     <IconButton style={{positon:"absolute",top:"-30px", right:"-270px"}}
      onClick={closeEvent}>
        <CloseIcon style={{color:"red"}}/>
    </IconButton>
    <Box height={5}/>


   <center>
    <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
         Client Details
        </Typography>
    </center>
    <Card sx={{ minWidth: 295,minHeight:220 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
         Client Name: {name}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
         Client Address:{address}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
         SPOC:{spoc}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
         Phone Number:{number}      
        </Typography>
      </CardContent>
    </Card>
    </>
  )
}
