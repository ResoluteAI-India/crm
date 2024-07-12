import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { useFirebase } from '../../context/Firebase';
import { useNavigate } from "react-router-dom"
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from "@mui/material/Stack";
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';



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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
  
export default function Addpage() {
  let date = new Date();

  const [rows, setRows] = useState([]);

  const navigate = useNavigate();
  const firebase = useFirebase()
  const empCollectionRef = collection(firebase.db, "Client");

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  },[]); 

  const service_type_values = ["Permanent","Contract to hire","Permanent + C2H"]
  const payment_terms_values = ["15 Days","30 Days","45 Days","60 Days"]
  const core_skills_values=["java","reactjs","python","javascript"]

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const[client_name,setClient_name] = useState("")
  const[industry_type,setIndustry_type] = useState("")
  const[email,setEmail] = useState("")
  const[phone,setPhone] = useState("")
  const[address,setAddress] = useState("")
  const[comment,setComment] = useState("")
  const[service_type,setService_type] = useState("")
  const[core_skills,setCore_skills] = useState("")
  const[payment_terms,setPayment_terms] = useState("")
  const[bank_name,setBank_name] = useState("")
  const[account_holder_name,setAccount_holder_name] = useState("")
  const[account_number,setAccount_number] = useState("")
  const[branch_name,setBranch_name] = useState("")
  const[ifsc_code,setIfsc_code] = useState("")


  const[agreement_start_date,setAgreement_start_date]  = useState(dayjs(date))
  let formastarttdate = agreement_start_date.toDate()
  let formatstartdatefinal = formastarttdate.toDateString();
  let stringstartdate = formatstartdatefinal.toString();

  const[agreement_end_date,setAgreement_end_date]  = useState(dayjs(date))
  let formatenddate = agreement_end_date.toDate()
  let formatenddatefinal = formatenddate.toDateString();
  let stringenddate = formatenddatefinal.toString();

  const handleClient_name = (event) =>{
    setClient_name(event.target.value)
  }
  const handleIndustry_type = (event) =>{
    setIndustry_type(event.target.value)
  }
  const handleEmail = (event) =>{
    setEmail(event.target.value)
  }
  const handlePhone = (event) =>{
    setPhone(event.target.value)
  }
  const handleAddress = (event) =>{
    setAddress(event.target.value)
  }
  const handleComment = (event) =>{
    setComment(event.target.value)
  }
 
  const handleBank_name = (event) =>{
    setBank_name(event.target.value)
  }
  const handleAccount_holder_name = (event) =>{
    setAccount_holder_name(event.target.value)
  }
  const handleAccount_number = (event) =>{
    setAccount_number(event.target.value)
  }
  const handleBranch_name = (event) =>{
    setBranch_name(event.target.value)
  }
  const handleIfsc_code = (event) =>{
    setIfsc_code(event.target.value)
  }


  const[spocfield,setSpocfield] = useState([{full_name:"",designation:"",spoc_number:"",spoc_email:""}])
 
 const handleClick = () =>{
  setSpocfield([...spocfield,{full_name:"",designation:"",spoc_number:"",spoc_email:""}])
 }
 const handleChange = (e,i) =>{
   const{name,value} = e.target;
   const list = [...spocfield];
   list[i][name] = value;
   setSpocfield(list)
 }

 
 const handleremove = (index) =>{
  const list = [...spocfield];
  list.splice(index,1)
  setSpocfield(list)

 }
 

const createClient = async() =>{
  await addDoc(empCollectionRef,{
    client_name:client_name,
    industry_type:industry_type,
    email:email,
    phone:phone,
    address:address,
    comment:comment,
    service_type:service_type,
    core_skills:core_skills,
    payment_terms:payment_terms,
    bank_name:bank_name,
    account_holder_name:account_holder_name,
    account_number:account_number,
    branch_name:branch_name,
    ifsc_code:ifsc_code,
    agreement_start_date:stringstartdate,
    agreement_end_date:stringenddate,
    spoc:spocfield
 
  })
  getUsers()
  Swal.fire("Your file has been Saved")

}
  return (
    <>
    <Typography variant="h4" component="div" style={{marginLeft:"-810px",marginBottom:"10px"}}>
         <b>Add Client</b>
        </Typography>
    <Card sx={{ Width: "40%" ,marginTop:"45px"}}>
         <Typography variant="h5" component="div" style={{marginLeft:"-830px"}}>
        Basic Details
        </Typography>
      <CardContent>
      <Box
      component="form"
      sx={{'& > :not(style)': { m: 2, width: '53ch' },}}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic"  required label="Client Name" variant="outlined" value={client_name} onChange={handleClient_name}/>
      <TextField id="outlined-basic"  required label="Industry Type" variant="outlined" value={industry_type} onChange={handleIndustry_type} />
      <TextField id="outlined-basic"  required label="Email Address" variant="outlined" value={email} onChange={handleEmail}/>
      <TextField id="outlined-basic"  required label="Phone" variant="outlined" value={phone} onChange={handlePhone} />
      <TextField id="outlined-basic"  required label="Address" variant="outlined" value={address} onChange={handleAddress} style={ { m: 2, width: '110ch',marginTop:"10px",marginLeft:"20px" }} />
      <TextField id="outlined-basic"  required label="Comment" variant="outlined" value={comment} onChange={handleComment} style={{ m: 2, width: '110ch', marginTop:"10px",marginLeft:"20px"}} />
    </Box>
      </CardContent>
    </Card>

    <Card sx={{ Width: "40%" ,marginTop:"45px"}}>
         <Typography variant="h5" component="div" style={{marginLeft:"-865px"}}>
         Preferences
        </Typography>
      <CardContent>
  <Autocomplete
  
  id="combo-box-demo"
options={service_type_values}
  sx={{width: '53ch',marginLeft:"-520px"}}
  renderInput={(params) => <TextField {...params} label="Service Type" />}
  onChange={(event,value)=>setService_type(value)}
/>


<Autocomplete
  id="combo-box-demo"
options={core_skills_values}
  sx={{width: '53ch',marginLeft:"495px",marginTop:"-55px"}}
  renderInput={(params) => <TextField {...params} label="Core Skills" />}
  onChange={(event,value)=>setCore_skills(value)}
/>

<Autocomplete
  
  id="combo-box-demo"
options={payment_terms_values}
  sx={{ width: '53ch',marginTop:"20px",marginLeft:"-520px" }}
  renderInput={(params) => <TextField {...params} label="Payment Terms" />}
  onChange={(event,value)=>setPayment_terms(value)}
/>
      </CardContent>
    </Card>
    <Card sx={{ Width: "40%" ,marginTop:"45px"}}>
         <Typography variant="h5" component="div" style={{marginLeft:"-865px"}}>
         Bank Details
        </Typography>
      <CardContent>
      <Box
      component="form"
      sx={{'& > :not(style)': { m: 2, width: '53ch' },}}
      noValidate
      autoComplete="off"
    >
      
      <TextField id="outlined-basic"  required label="Bank Name" value={bank_name} onChange={handleBank_name} variant="outlined"  style={{ m: 2, width: '110ch',marginTop:"10px",marginLeft:"20px" }} />
      <TextField id="outlined-basic"  required label="Account Holder Name" value={account_holder_name} onChange={handleAccount_holder_name} variant="outlined" style={{ m: 2, width: '54ch',marginLeft:"20px",marginTop:"10px" }}  />
      <TextField id="outlined-basic"  required label="Account Number " value={account_number} onChange={handleAccount_number} variant="outlined" style={{ m: 2, width: '54ch',marginTop:"10px",marginLeft:"5px" }} />
      <TextField id="outlined-basic"  required label="Branch  Name" value={branch_name} onChange={handleBranch_name} variant="outlined" style={{ m: 2, width: '54ch',marginLeft:"20px",marginTop:"10px" }}  />
      <TextField id="outlined-basic"  required label="IFSC Code " value={ifsc_code} onChange={handleIfsc_code} variant="outlined" style={{ m: 2, width: '54ch',marginTop:"10px",marginLeft:"5px" }}  />   
    </Box>
      </CardContent>
    </Card>

<Card sx={{ Width: "40%" ,marginTop:"45px"}}>
         <Typography variant="h5" component="div" style={{marginLeft:"-810px"}}>
         Agreement Tenure
        </Typography>
      <CardContent>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{marginTop:"10px",marginLeft:"10px"}}>
        <DatePicker label="Agreement start date"  sx={{width: '53ch'}}
        value={agreement_start_date} onChange={(newValue) => setAgreement_start_date(newValue)} />
      </DemoContainer>
    </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{marginTop:"-62px",marginLeft:"10px",marginLeft:"530px"}}>
        <DatePicker label="Agreement end date" sx={{width: '53ch'}} 
        value={agreement_end_date} onChange={(newValue) => setAgreement_end_date(newValue)}/>
      </DemoContainer>
    </LocalizationProvider>

      </CardContent>
    </Card>

    <Card sx={{ Width: "40%" ,marginTop:"45px",backgroundColor:"#F8C8DC"}}>
      <CardContent>
      <Typography variant="h5" component="div" style={{marginLeft:"-870px"}}>
         SPOC Details
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ Width: "40%",marginTop:"-10px"}}>
      <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} >
      <TableContainer sx={{ maxHeight: 350,width: '100%'}}>
        <Table stickyHeader aria-label="sticky table">
         <TableHead  >
         <TableRow >
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2"}}>
              <b>Full Name</b> 
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>Designation</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             <b>Mobile No</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
               <b>Email ID</b>
             </TableCell>
             <TableCell align="left" style={{ minWidth: "100px", backgroundColor:"#E5E4E2" }}>
             </TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
        {
          spocfield.map((val,i) =>
         
            <TableRow hover role="checkbox" tabIndex={-1} key={i} >
                     <TableCell  align="left" >
                     <TextField
                    id="outlined-password-input"
                    label="Full Name"
                    type="text"
                    autoComplete="current-name"
                    name='full_name'
                    onChange={(e)=>handleChange(e,i)}
                    // value={full_name}  onChange={handleFull_name}
                    />
                     </TableCell>
                     <TableCell align="left" >
                     <TextField
                    id="outlined-password-input"
                    label="Designation"
                    type="text"
                    autoComplete="current-designation"
                    name='designation'
                    onChange={(e)=>handleChange(e,i)}
                    // value={designation} onChange={handleDesignation}
                    />
                     </TableCell>
                     <TableCell  align="left" >
                     <TextField
                        id="outlined-password-input"
                        label="Mobile No"
                        type="text"
                        autoComplete="current-number"
                        name='spoc_number'

                        onChange={(e)=>handleChange(e,i)}
                        // value={spoc_number} onChange={handlespocnumber}
                        />
                     </TableCell>
                     <TableCell align="left">
                     <TextField
                        id="outlined-password-input"
                        label="Email ID"
                        type="email"
                        autoComplete="current-email"
                        name='spoc_email'
                    onChange={(e)=>handleChange(e,i)}
                        // value={spoc_email} onChange={handlespocemail}
                        />
                     </TableCell>
                    
                  <TableCell align="left" >
                  {
                  spocfield.length!==1 && 
                          <Stack spacing={2} direction="row">
                            <RemoveCircleOutlineRoundedIcon  
                              style={{
                                fontSize: "30px",
                                color: "gray",
                                cursor: "pointer"
                              }}
                              className="cursor-pointer"
                              
                              onClick={()=>handleremove(i)}
                            />
                          </Stack>
                        
                }
                     {
                  spocfield.length-1 ===i && 
                          <Stack spacing={2} direction="row">
                            <ControlPointRoundedIcon  
                              style={{
                                fontSize: "30px",
                                color: "gray",
                                cursor: "pointer"
                              }}
                              className="cursor-pointer"
                              
                              onClick={handleClick}
                            />
                          </Stack>
                        
                }     
                </TableCell>                   
                </TableRow> 
          
          
          )
        }
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
      </div>
      {/* <Spocstable/> */}
    </Card>

    <Card sx={{ Width: "40%" ,marginTop:"45px"}}>
         <Typography variant="h5" component="div" style={{marginLeft:"-840px"}}>
         Add Documents
        </Typography>
      <CardContent>
    <Button  style={{width: '60ch',marginLeft:"-20px",backgroundColor:'#F8C8DC'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload Logo
      <VisuallyHiddenInput type="file" />
    </Button> 

    <Button  style={{width: '60ch',marginLeft:"60px",backgroundColor:'#F8C8DC'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload Final Proposal
      <VisuallyHiddenInput type="file" />
    </Button> 
    
    <Button  style={{width: '60ch',marginLeft:"-20px",marginTop:"30px",backgroundColor:'#F8C8DC'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload NDA
      <VisuallyHiddenInput type="file" />
    </Button> 

    <Button  style={{width: '60ch',marginLeft:"60px",marginTop:"30px",backgroundColor:'#F8C8DC'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload MSA
      <VisuallyHiddenInput type="file" />
    </Button> 
    
      </CardContent>
    </Card>

    <Button  style={{width: '100ch',marginLeft:"60px",marginTop:"30px",backgroundColor:'#F8C8DC'}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      type='submit' onClick={createClient}
    >
      Save 
    </Button>
    </>
  );
}