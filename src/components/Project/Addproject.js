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
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

export default function Addproject() {
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
      <TextField id="outlined-basic"  required label="Project Name" variant="outlined" style={{marginLeft:"-500px"}} />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
      // options={top100Films}
      style={{width: '50ch',marginLeft:"535px",marginTop:"-70px",width: '53ch'}}
        renderInput={(params) => <TextField {...params} label="Client Name" />}
      />
      <div className="date" >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{marginTop:"10px",marginLeft:"-260px"}}>
        <DatePicker label="Agreement start date"  sx={{width: '53ch'}} />
      </DemoContainer>
    </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{marginTop:"-64px",marginLeft:"260px",marginRight:"-275px"}}>
        <DatePicker label="Agreement end date" sx={{width: '53ch'}} />
      </DemoContainer>
    </LocalizationProvider>
      </div>
    
      <TextField id="outlined-basic"  required label="Description" variant="outlined" sx={{'& > :not(style)':  { m: 2, width: '111ch',height:"13ch", marginTop:"0px",marginLeft:"-10px"},}}/>
      <TextField id="outlined-basic"  required label="Status" variant="outlined" sx={{'& > :not(style)': { m: 2, marginTop:"145px",marginLeft:"-515px",marginRight:"510px"},}} />
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
    >
      Save 
    </Button> 
    </>
  );
}