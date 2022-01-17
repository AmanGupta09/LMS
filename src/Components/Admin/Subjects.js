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
import Department from "./Department";

const useStyles = makeStyles({
  
    root: {
      display:'flex',
      justifyContent:'center',
      alignContent:'center'
    },
    subdiv:{
      marginTop:30,
      width:600,
      borderRadius:8,
      background:'#ecf0f1',
      display:'flex',
      alignItems:'center',
      padding:15
    },
  });
  
export default function Subjects(props)
{const classes=useStyles();
    const [department,setDepartment]=useState('')
    const [listdepartment,setListDepartment]=useState([])
    const [courses,setCourses]=useState('')
    const [type,setType]=useState('')
    const [subjectName,setSubjectName]=useState('')
    const [semester,setSemester]=useState('')
    const [subjectMarks,setSubjectMarks]=useState('')
    const [listCourses,setListCourses]=useState([])
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        FetchAllCourses(event.target.value)
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
      const handleCoursesChange = (event) => {
        setCourses(event.target.value);
        FetchAllSemester(event.target.value)
      };
      const FetchAllCourses=async(department)=>{
        var result=await postData("subjects/displayallcoursesbyid",{departmentid:department})
        setListCourses(result.result)
    }
    const FetchAllSemester=async(courses)=>{
      var result=await postData("subjects/displayallsemesterbyid",{courseid:courses})
      setSemester(result.result[0].nosemester)
  }
    const fillCourses=()=>
      {
           return(listCourses.map((item)=>{
             return(<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
           }))
      }
      const fillSemester=()=>
      {  
          var x=[]
          for( var i=1;i<=semester;i++)
          { x.push(i) }
           return(x.map((item)=>{
               return(<MenuItem value={item}>{item}</MenuItem>)
              }))
      }
      const handleTypeChange=(event)=>
      {
        setType(event.target.value);
      }
      const handleSemesterChange=(event)=>
      {
        setSemester(event.target.value);
      }
      const handleSubmit=async()=>{
        
        var body={departmentid:department, courseid:courses, semester:semester, subjectname:subjectName, type:type, subjectmarks:subjectMarks}
           var result=await postData("subjects/addsubject",body)
           console.log(result)
        if(result.result)
        {
         Swal.fire({
           title: 'LMS',
           text: 'Subject Submitted......',
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
           text: 'Fail To Submit Subject......',
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
             <div style={{fontSize:18,fontWeight:'bold',letterSpacing:2,display:'flex',alignItems:'center',justifyContent:'center'}}>
               <img src="/subject.png" style={{width: 40, height: 40}} alt=""/>
               Subject Interface
             </div>
             </Grid>

             <Grid item xs={4}>
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

         <Grid item xs={4}>
                   <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label1" >Course</InputLabel>
        <Select
          labelId="demo-simple-select-label1"
          id="demo-simple-select"
          value={courses}
          label="Course"
          onChange={handleCoursesChange} 
        >
          {fillCourses()}
        </Select>
      </FormControl>
         </Grid>

         <Grid item xs={4}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label2" >Semester</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select"
          value={semester}
          label="Semester"
          onChange={handleSemesterChange} 
        >
          {fillSemester()}
        </Select>
      </FormControl>
         </Grid>

         <Grid item xs={6}>
             <TextField onChange={(event)=>setSubjectName(event.target.value)} fullWidth label="Subject Name" variant="outlined" />
             </Grid>
    <Grid item xs={6}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label3" >Type</InputLabel>
        <Select
          labelId="demo-simple-select-label3"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleTypeChange} 
        >
          <MenuItem value={'Practical'}>Practical</MenuItem>
          <MenuItem value={'Theory'}>Theory</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12}>
             <TextField onChange={(event)=>setSubjectMarks(event.target.value)} fullWidth label="Subject Marks" variant="outlined" />
             </Grid>
      <Grid item xs={6}>
             <Button fullWidth onClick={()=>handleSubmit()} variant="contained" color="success">Save</Button>
             </Grid>
             <Grid item xs={6}>
             <Button fullWidth variant="contained" type="reset" color="error">Reset</Button>
             </Grid>
      </Grid>   
    </div>
    </div>
    )

}