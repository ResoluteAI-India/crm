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




export default function Displayproject({closeEvent,dfid}) {

  const[id,setId] = useState("")
  const[pname,setPname] = useState("")
  const[cname,setCname] = useState("")
  const[startdate,setStartdate] = useState("")
  const[enddate,setEnddate] = useState("")


    const [rows, setRows] = useState([]);


  useEffect(() => {
    setId(dfid.id)
    setPname(dfid.pname)
    setCname(dfid.cname)
    setStartdate(dfid.startdate)
    setEnddate(dfid.enddate)
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


  return (
    <>
    <IconButton style={{positon:"absolute",top:"-30px", right:"-270px"}}
      onClick={closeEvent}>
        <CloseIcon style={{color:"red"}}/>
    </IconButton>
    <Box height={5}/>
    <center>
    <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
         Project Details
        </Typography>
    </center>
    <Card sx={{ minWidth: 295,minHeight:220 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
         Project Name: {pname}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
         Client Name:{cname}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
         Start Date:{startdate}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
         End Date:{enddate}      
        </Typography>
      </CardContent>
    </Card>
    </>
  )
}