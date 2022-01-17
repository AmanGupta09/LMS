import React,{useState,useEffect} from "react";
import {styled,makeStyles } from '@mui/styles';
import {Grid,TextField,Button} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ServerURL,postDataAndImage,getData,postData} from "./FetchNodeServices";
import Swal from "sweetalert2";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const useStyles = makeStyles({
  
    root: {
      display:'flex',
      justifyContent:'center',
      alignContent:'center'
    },
    subdiv:{
      marginTop:30,
      width:500,
      borderRadius:8,
      background:'#ecf0f1',
      display:'flex',
      alignItems:'center',
      padding:15
    },
  });
  const Input = styled('input')({
      display: 'none',
    });
export default function Courses(props)
{const classes=useStyles();
    const [department,setDepartment]=useState('')
    const [courseName,setCourseName]=useState('')
    const [semesterNo,setSemesterNo]=useState('')
    const [feePerSemester,setFeePerSemester]=useState('')
    const [courseIcon,setCourseIcon]=useState({bytes:'',file:'/courseicon.png'})
    const [listdepartment,setListDepartment]=useState([])
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
      };
      const FetchAllDepartment=async()=>{
        var result=await getData("department/displayalldepartment")
        setListDepartment(result.result)
    }
      useEffect(function(){
        FetchAllDepartment()
    },[])
      const fillDepartment=()=>
      {
           return(listdepartment.map((item)=>{
             return(<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)
           }))
      }
      const handleIconChange=(event)=>{
        if(event.target.files.length)
        {setCourseIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
      }
      
      const handleSubmitCourse=async()=>{
        var formData= new FormData()
        formData.append('department',department)
        formData.append('coursename',courseName)
        formData.append('semesterno',semesterNo)
        formData.append('feepersemester',feePerSemester)
        formData.append('courseicon',courseIcon.bytes)
        var result=await postDataAndImage("courses/addcourse",formData)
        console.log(result)
        if(result.result)
        {
         Swal.fire({
           title: 'LMS',
           text: 'Course Submitted......',
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
           text: 'Fail To Submit Course......',
           imageUrl: '/lms.png',
           icon:'error',
           imageWidth: 150,
           imageHeight: 150,})
        }
}
 return(
    <div className={classes.root}>
    <div className={classes.subdiv}>
    <Grid container spacing={2}>
    <Grid item xs={12}>
             <div style={{fontSize:18,fontWeight:'bold',letterSpacing:2,display:'flex',alignItems:'center'}}>
               <img src="/course.jpg" style={{width: 40, height: 40}} alt=""/>
               Courses Interface
             </div>
             </Grid>
             <Grid item xs={12}>
                   <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" >Department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={department}
          label="Department"
          onChange={handleDepartmentChange} 
        >
          {fillDepartment()}
        </Select>
      </FormControl>
         </Grid>
        <Grid item xs={12}>
            <TextField onChange={(event)=>setCourseName(event.target.value)} fullWidth label="Course Name" variant="outlined"/>
        </Grid>
        <Grid item xs={6}>
            <TextField onChange={(event)=>setSemesterNo(event.target.value)} fullWidth label="No. Of Semester" variant="outlined"/>
        </Grid>
        <Grid item xs={6}>
            <TextField onChange={(event)=>setFeePerSemester(event.target.value)} fullWidth label="Fee Per Semester" variant="outlined"/>
        </Grid>  
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>
             <label htmlFor="contained-button-file">
        <Input onChange={(event)=>handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained"  component="span" sx={{width:200}}>
          Upload Icon
        </Button>
      </label>
             </Grid>
             <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
             <Avatar
        alt="Image Upload"
        src={courseIcon.file}
        sx={{ width: 100, height: 100}} variant="rounded"
      />
             </Grid>
        <Grid item xs={6}>
        <Button fullWidth onClick={()=>handleSubmitCourse()} variant="contained" color="success">Save</Button>
        </Grid>
        <Grid item xs={6}>
        <Button fullWidth variant="contained" color="error">Reset</Button>
        </Grid>         
        </Grid>
        </div>
        </div>

 )
}