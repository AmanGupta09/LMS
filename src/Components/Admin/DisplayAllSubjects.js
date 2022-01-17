import React,{useState,useEffect} from "react";
import MaterialTable from "material-table"
import {Grid,TextField,Button} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles,styled } from '@mui/styles';

const useStyles = makeStyles({
  
    root: {
      display:'flex',
      justifyContent:'center',
      alignContent:'center'
    },
    subdiv:{
      marginTop:30,
      width:1000,
      borderRadius:8,
      background:'#FFFFF',
      alignItems:'center',
      padding:15
    },
  });

export default function DisplayAllSubjects(props){
const classes=useStyles(); 
const [department,setDepartment]=useState('')
const [listdepartment,setListDepartment]=useState([])
const [courses,setCourses]=useState('')
const [type,setType]=useState('')
const [subjectName,setSubjectName]=useState('')
const [subjectId,setSubjectId]=useState('')
const [semester,setSemester]=useState('')
const [subjectMarks,setSubjectMarks]=useState('')
const [listCourses,setListCourses]=useState([])
const [listSubjects,setListSubjects]=useState([])
const [open,setOpen]=useState(false)
const FetchAllSubjects=async()=>{
    var result=await getData("subjects/displayallsubjects")
    setListSubjects(result.result)
}
useEffect(function(){
    FetchAllSubjects()
    FetchAllDepartment()
},[])
const handleDepartmentChange = (event) => {
  setDepartment(event.target.value);
  FetchAllCourses(event.target.value)
};
const FetchAllDepartment=async()=>{
  var result=await getData("department/displayalldepartment")
  setListDepartment(result.result)
}
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
const handleEditSubjectsData=async()=>
    {
          var body={departmentid:department,courseid:courses,semester:semester, subjectname:subjectName, type:type, subjectmarks:subjectMarks,subjectid:subjectId}
           var result=await postData("subjects/editsubjectdata",body)
           console.log(result)
           setOpen(false)
           if(result.result)
           {
            Swal.fire({
              title: 'LMS',
              text: 'Subject Edited Successfully......',
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
              text: 'Fail To Edit Subject......',
              imageUrl: '/lms.png',
              icon:'error',
              imageWidth: 150,
              imageHeight: 150,})
           }
           FetchAllSubjects()
    }
    const handleDeleteSubject=async(subjectid)=>
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async(result) => {
          if (result.isConfirmed) {
            var body={subjectid:subjectid}
           var result=await postData("subjects/deletesubject",body)
           if(result.result)
          Swal.fire(
            'Deleted!',
            'Department has been deleted.',
            'success'
          )
        else
          Swal.fire(
            'Fail To Delete!',
            'fail To Delete Department.',
            'error'
          )
          }FetchAllSubjects()
      })
    }
const handleEdit=(rowData)=>
{
  setSubjectId(rowData.subjectid)
  setDepartment(rowData.departmentid)
  setCourses(rowData.courseid)
  FetchAllCourses(rowData.departmentid)
  setSemester(rowData.semester)
  setSubjectName(rowData.subjectname)
  setType(rowData.type)
  setSubjectMarks(rowData.subjectmarks)
  setOpen(true)
}
const handleClose=()=>
{

  setOpen(false)
}
function ShowDailog(){
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <Grid container spacing={2}>
    <Grid item xs={12}>
             <div style={{fontSize:18,fontWeight:'bold',letterSpacing:2,display:'flex',alignItems:'center',justifyContent:'center'}}>
               <img src="/subject.png" style={{width: 40, height: 40}} alt=""/>
                  Edit Subject Interface
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
             <TextField value={subjectName} onChange={(event)=>setSubjectName(event.target.value)} fullWidth label="Subject Name" variant="outlined" />
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
             <TextField value={subjectMarks} onChange={(event)=>setSubjectMarks(event.target.value)} fullWidth label="Subject Marks" variant="outlined" />
             </Grid>
      </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditSubjectsData}>Edit</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function DisplayAll() {
    return (
        <MaterialTable
          title="List Of Subjects"
          columns={[
            { title: 'Subject ID', field: 'subjectid' },
            { title: 'Subject Name', field: 'subjectname' },
            { title: 'Department', field: 'departmentname'},
            { title: 'Course', field: 'coursename'},
            { title: 'Semester', field: 'semester'},
            { title: 'Type', field: 'type'},
            { title: 'Subject Marks', field: 'subjectmarks'},
          ]}
          data={listSubjects}        
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Subject',
              onClick: (event, rowData) => handleEdit(rowData)
            },
            {
                icon: 'delete',
                tooltip: 'Delete Subject',
                onClick: (event, rowData) => handleDeleteSubject(rowData.subjectid)
              }
          ]}
        />
      )
  }

return(
    <div className={classes.root}>
        <div className={classes.subdiv}>
        {DisplayAll()}
        {ShowDailog()}
    </div>
    </div>
)

}