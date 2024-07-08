import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import Autocomplete from '@mui/material/Autocomplete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirebase } from '../../context/Firebase';
import { useNavigate } from "react-router-dom"
import dayjs from 'dayjs';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  width: '53ch',
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  

});

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

export default function Addpage() {
  let date = new Date();

  const navigate = useNavigate();

    const [rows, setRows] = useState([]);
      
  const firebase = useFirebase()
   const empCollectionRef = collection(firebase.db, "Project");

    const getUsers = async () => {
      const data = await getDocs(empCollectionRef);
      setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

          const[clientoptions,setClientoptions] = useState("")

          const empCollectionRefclient = collection(firebase.db, "Client");
        
          const getUsersclient = async () => {
            const data = await getDocs(empCollectionRefclient);
            setClientoptions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
            let jac = Array.from(clientoptions)
            const pac = jac.map(client => client.client_name)

          useEffect(() => {
            getUsers();
            getUsersclient();
          },[]); 
        
      const[project_name,setProject_name] = useState("")
      const[client_name,setClient_name] = useState("")
      const[description,setDescription] = useState("")
      const[status,setStatus] = useState("")

         const[agreement_start_date,setAgreement_start_date] = useState(dayjs(date))
          let formatstartdate = agreement_start_date.toDate()
          let formatstartdatefinal = formatstartdate.toDateString();
           let stringstartdate = formatstartdatefinal.toString();
      
          const[agreement_end_date,setAgreement_end_date] = useState(dayjs(date))
          let formatenddate = agreement_end_date.toDate()
          let formatenddatefinal = formatenddate.toDateString();
          let stringenddate = formatenddatefinal.toString()

        
          const handleProject_name = (event) =>{
            setProject_name(event.target.value)
          }
          
          const handleDescription = (event) =>{
            setDescription(event.target.value)
          }
         const handleStatus = (event) =>{
              setStatus(event.target.value)
          }
      
        
          const createProject = async() =>{
             await addDoc(empCollectionRef,{
              project_name:project_name,
              client_name:client_name,
              agreement_start_date:stringstartdate,
              agreement_end_date:stringenddate,
              description:description,
              status:status
             })
             getUsers()
             Swal.fire("Your file has been Saved")
      
          }
      
  return (
    <>
    <Typography variant="h4" component="div" style={{marginLeft:"-810px",marginBottom:"10px"}}>
         <b>Add Project</b>
        </Typography>
    <Card sx={{ Width: "40%" ,marginTop:"45px"}}>
         <Typography variant="h5" component="div" style={{marginLeft:"-830px"}}>
        Project Details
        </Typography>
      <CardContent>
      <Box
      component="form"
      sx={{'& > :not(style)': { m: 2, width: '53ch' },}}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" value={project_name}  required label="Project Name" variant="outlined" style={{marginLeft:"-500px"}} onChange={handleProject_name} />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
       options={pac}
      style={{width: '50ch',marginLeft:"535px",marginTop:"-70px",width: '53ch'}}
        renderInput={(params) => <TextField {...params} label="Client Name" />}
        onChange={(event,value)=>setClient_name(value)}
        />
      <div className="date" >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{marginTop:"10px",marginLeft:"-260px"}}>
        <DatePicker label="Agreement start date"  sx={{width: '53ch'}}
           value={agreement_start_date} onChange={(newValue) => setAgreement_start_date(newValue)}/>
      </DemoContainer>
    </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{marginTop:"-64px",marginLeft:"260px",marginRight:"-275px"}}>
        <DatePicker label="Agreement end date" sx={{width: '53ch'}}
         value={agreement_end_date} onChange={(newValue) => setAgreement_end_date(newValue)}/>
      </DemoContainer>
    </LocalizationProvider>
      </div>
    
      <TextField id="outlined-basic"  required value={description} label="Description" variant="outlined" style={{ m: 2, width: '111ch',height:"13ch", marginTop:"10px",marginLeft:"20px"}} onChange={handleDescription}/>
      <TextField id="outlined-basic"  required value={status} label="Status" variant="outlined" style={{ m: 2, marginTop:"-50px",marginLeft:"0px",marginRight:"510px"}} onChange={handleStatus} />
    </Box>
      </CardContent>
    </Card>

    <Card sx={{ Width: "40%" ,marginTop:"45px"}}>
         <Typography variant="h5" component="div" style={{marginLeft:"-840px"}}>
         Project Attachments
        </Typography>
      <CardContent>
    <Button  style={{width: '60ch',marginLeft:"-10px",backgroundColor:'#FA2609'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload SOW
      <VisuallyHiddenInput type="file" />
    </Button> 
    
    <Button  style={{width: '60ch',marginLeft:"60px",marginTop:"0px",backgroundColor:'#FA2609'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload SD
      <VisuallyHiddenInput type="file" />
    </Button> 

    <Button  style={{width: '60ch',marginLeft:"-10px",marginTop:"30px",backgroundColor:'#FA2609'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
    Upload BRD
      <VisuallyHiddenInput type="file" />
    </Button> 
    
    <Button  style={{width: '60ch',marginLeft:"60px",marginTop:"30px",backgroundColor:'#FA2609'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload SOP
      <VisuallyHiddenInput type="file" />
    </Button> 
    
      </CardContent>
    </Card>
    <Card sx={{ Width: "40%" ,marginTop:"45px"}}>
         <Typography variant="h5" component="div" style={{marginLeft:"-840px"}}>
         Status Report 
        </Typography>
      <CardContent>
    <Button  style={{width: '60ch',marginLeft:"-540px",backgroundColor:'#FA2609'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload Report
      <VisuallyHiddenInput type="file" />
    </Button> 
      </CardContent>
    </Card>

    <Button  style={{width:'60ch',marginLeft:"60px",marginTop:"30px",backgroundColor:'#FA2609'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      onClick={createProject}
    >
      Save 
    </Button> 
    </>
  );
}