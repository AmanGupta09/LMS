import React,{useState} from "react";
import { styled,makeStyles } from '@mui/styles';
import {Grid,TextField,Button} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { ServerURL,postDataAndImage} from "./FetchNodeServices";
import Swal from "sweetalert2";

const useStyles = makeStyles({
  
  root: {
    display:'flex',
    justifyContent:'center',
    alignContent:'center'
  },
  subdiv:{
    marginTop:30,
    width:400,
    borderRadius:8,
    background:'#dff9fb',
    display:'flex',
    alignItems:'center',
    padding:15
  },
});
const Input = styled('input')({
    display: 'none',
  });
export default function Department(props)
{ const classes=useStyles();
  const [depname,setDepName]=useState('');
  const [depicon,setDepIcon]=useState({bytes:'',file:'/depicon.png'})
  const handleSubmit=async()=>{
           var formData= new FormData()
           formData.append('departmentname',depname)
           formData.append('departmenticon',depicon.bytes)
           var result=await postDataAndImage("department/adddepartment",formData)
           console.log(result)
           if(result.result)
           {
            Swal.fire({
              title: 'LMS',
              text: 'Department Submitted......',
              imageUrl: '/lms.png',
              icon:'success',
              imageWidth: 150,
              imageHeight: 150,
            })
           }
           else
           {
            Swal.fire({
              title: 'LMS',
              text: 'Fail To Submit Department......',
              imageUrl: '/lms.png',
              icon:'error',
              imageWidth: 150,
              imageHeight: 150,})
           }
  }
  const handleIconChange=(event)=>{
    if(event.target.files.length)
    {setDepIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
  }
    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
             <Grid container spacing={2}>
             <Grid item xs={12}>
             <div style={{fontsize:80,fontWeight:'bold',letterSpacing:2,display:'flex',alignItems:'center'}}>
               <img src="/deplogo.png" style={{width: 40, height: 40}} alt=""/>
               Department Interface
             </div>
             </Grid>
             <Grid item xs={12}>
             <TextField onChange={(event)=>setDepName(event.target.value)} fullWidth label="Department Name" variant="outlined" />
             </Grid>
             <Grid item xs={6} sx={{display:'flex',alignItems:'center'}}>
             <label htmlFor="contained-button-file">
        <Input onChange={(event)=>handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" fullWidth component="span">
          Upload 
        </Button>
      </label>
             </Grid>
             <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
             <Avatar
        alt="Image Upload"
        src={depicon.file}
        sx={{ width: 60, height: 40}} variant="rounded"
      />
             </Grid>
             <Grid item xs={6}>
             <Button fullWidth onClick={()=>handleSubmit()} variant="contained" color="primary">Save</Button>
             </Grid>
             <Grid item xs={6}>
             <Button fullWidth variant="contained" type="reset" color="error">Reset</Button>
             </Grid>
             </Grid>
            </div>
        </div>
    
    )
}