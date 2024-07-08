import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Switchtable from './Switchtable';
import client1 from "./client1.jpg";
import { useState,useEffect } from 'react';

import { useFirebase } from '../../context/Firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { useLocation } from 'react-router-dom';




export default function Dispalypage () {
  const theme = useTheme();

  const location = useLocation();
  const clientdata = location.state

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const[id,setId] = useState("")
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
  const[agreement_start_date,setAgreement_start_date]  = useState("")
  const[agreement_end_date,setAgreement_end_date]  = useState("")
  const[spocfield,setSpocfield] = useState([])


 useEffect(() => {
    setId(clientdata.id)
    setClient_name(clientdata.client_name)
    setIndustry_type(clientdata.industry_type)
    setEmail(clientdata.email)
    setPhone(clientdata.phone)
    setAddress(clientdata.address)
    setComment(clientdata.comment)
    setService_type(clientdata.service_type)
    setCore_skills(clientdata.core_skills)
    setPayment_terms(clientdata.payment_terms)
    setBank_name(clientdata.bank_name)
    setAccount_holder_name(clientdata.account_holder_name)
    setAccount_number(clientdata.account_number)
    setBranch_name(clientdata.branch_name)
    setIfsc_code(clientdata.ifsc_code)
    setAgreement_start_date(clientdata.agreement_start_date)
    setAgreement_end_date(clientdata.agreement_end_date)
    setSpocfield(clientdata.spoc)
     
    },[]); 
    
  
  return (
    <>
    <div>
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 145 }}
        image={client1}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography style={{marginLeft:"90%"}} component="div" variant="h5">
            TCS
          </Typography>
          <Typography  style={{marginLeft:"70%",width:"100%"}}
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <b>Client Name:</b>{client_name}
          </Typography>
          <Typography  style={{marginLeft:"91%",width:"100%"}}
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <b>Email Address:</b>{email}
          </Typography>
          <Typography  style={{marginLeft:"73%",width:"100%"}}
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <b>Phone Number:</b>{phone}
          </Typography>
        </CardContent>
       
      </Box>
    </Card>

    <Card sx={{ minWidth: 275,marginTop:"1px"}}>
      <CardContent>
        <Typography  style={{ marginRight:"80%"}}variant="h5" component="div">
          Client Information
        </Typography>
        <br />
        <div style={{ display: 'flex', justifyContent:"space-between" }}>
        <div>
            <Typography style={{marginLeft:"-5%"}} variant="body2">
              <b>Basic Details: </b>
            </Typography>
           
            <Typography style={{marginLeft:"-3%"}} variant="body2">
              Client Name: {client_name}
            </Typography>
            <Typography  style={{marginLeft:"-16%"}} variant="body2">
              Industry Type :{industry_type}
            </Typography>
            <Typography style={{marginLeft:"6%",width:"100%"}} variant="body2">
             Email:{email}
            </Typography>
            <Typography style={{marginLeft:"-3%"}} variant="body2">
              Phone Number: {phone}
            </Typography>
            <Typography  style={{marginLeft:"-16%"}} variant="body2">
              Address  :{address}
            </Typography>
            <Typography style={{marginLeft:"6%",width:"100%"}} variant="body2">
             Comment:{comment}
            </Typography>
          </div>
          <div>
            <Typography style={{marginLeft:"-5%"}} variant="body2">
              <b>Preferences: </b>
              
            </Typography>
           
            <Typography style={{marginLeft:"-3%"}} variant="body2">
              Service Type : {service_type}
            </Typography>
            <Typography  style={{marginLeft:"-16%"}} variant="body2">
              Core Skills :{core_skills}
            </Typography>
            <Typography style={{marginLeft:"6%",width:"100%"}} variant="body2">
              Payment terms:{payment_terms}
            </Typography>
          </div>
        
          <div>
            <Typography style={{marginRight:"150px"}} variant="body2">
              <b>Bank Details: </b>
            </Typography>
           
            <Typography style={{marginRight:"160px"}} variant="body2">
              Bank Name: {bank_name}
            </Typography>
            <Typography style={{marginRight:"90px"}} variant="body2">
              Account Holder Name: {account_holder_name}
            </Typography>
            <Typography style={{marginRight:"125px"}} variant="body2">
              Account Number: {account_number}
            </Typography>
            <Typography style={{marginRight:"125px"}} variant="body2">
              Branch Name: {  branch_name}
            </Typography>
          
            <Typography style={{marginRight:"160px"}} variant="body2">
              IFSC Code: {ifsc_code}
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent:"space-between" }}>
         
          <div>
            <Typography style={{marginLeft:"-5%",marginTop:"20px"}} variant="body2">
              <b>Agreement Tenuree: </b>
              
            </Typography>
           
            <Typography style={{marginLeft:"-1%"}} variant="body2">
              Agreement Start Date : {agreement_start_date}
            </Typography>
            <Typography  style={{marginLeft:"-2%"}} variant="body2">
            Agreement End Date :{agreement_end_date}
            </Typography>
            
          </div>

          <div>
            <Typography style={{marginRight:"150px",marginTop:"10px"}} variant="body2">
              <b>Spoc Details: </b>
            </Typography>
           
            <Typography style={{marginRight:"160px"}} variant="body2">
              Full Name: {spocfield.spoc_name}
            </Typography>
            <Typography style={{marginRight:"150px"}} variant="body2">
              Designation: {spocfield.spoc_designation}
            </Typography>
            <Typography style={{marginRight:"125px"}} variant="body2">
              Phone Number: {spocfield.spoc_number}
            </Typography>
            <Typography style={{marginRight:"170px"}} variant="body2">
              Email ID: {spocfield.spoc_email}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>

<br/>

<Switchtable clientname={clientdata.client_name}/>
    </>

  );
}