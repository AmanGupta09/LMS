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
  const Input = styled('input')({
    display: 'none',
  });
export default function DisplayAllCourses(props){
    const classes=useStyles();
    const [courseId,setCourseId]=useState('')
    const [department,setDepartment]=useState('')
    const [courseName,setCourseName]=useState('')
    const [semesterNo,setSemesterNo]=useState('')
    const [feePerSemester,setFeePerSemester]=useState('')
    const [courseIcon,setCourseIcon]=useState({bytes:'',file:'/courseicon.png'})
    const [tempCourseIcon,setTempCourseIcon]=useState({bytes:'',file:'/courseicon.png'})
    const [listdepartment,setListDepartment]=useState([])
    const [listCourses,setListCourses]=useState([])
    const [btnstate,setBtnstate]=useState(false)
    const [open,setOpen]=useState(false)
    const FetchAllCourses=async()=>{
        var result=await getData("courses/displayallcourses")
        setListCourses(result.result)
    }
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
      };
      const FetchAllDepartment=async()=>{
        var result=await getData("department/displayalldepartment")
        setListDepartment(result.result)
    }
    useEffect(function(){
        FetchAllCourses()
        FetchAllDepartment()
    },[])
    const fillDepartment=()=>
      {
           return(listdepartment.map((item)=>{
             return(<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)
           }))
      }
      const handleCancle=()=>
    {
      setCourseIcon({bytes:'',file:`${tempCourseIcon.file}`})
      setBtnstate(false)
    }
      const handleIconChange=(event)=>{
        if(event.target.files.length)
        {setCourseIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        setBtnstate(true)}
        
      }
      const handleEditCourseData=async()=>
    {
          var body={courseid:courseId,departmentid:department,coursename:courseName,semesterno:semesterNo,feepersemester:feePerSemester}
           var result=await postData("courses/editcoursedata",body)
           console.log(result)
           setOpen(false)
           if(result.result)
           {
            Swal.fire({
              title: 'LMS',
              text: 'Course Edited Successfully......',
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
              text: 'Fail To Edit Course......',
              imageUrl: '/lms.png',
              icon:'error',
              imageWidth: 150,
              imageHeight: 150,})
           }
           FetchAllCourses()
    }
    const handleDeleteCourse=async(courseid)=>
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
            var body={courseid:courseid}
           var result=await postData("courses/deletecourse",body)
           if(result.result)
          Swal.fire(
            'Deleted!',
            'Course has been deleted.',
            'success'
          )
        else
          Swal.fire(
            'Fail To Delete!',
            'fail To Delete Course.',
            'error'
          )
          }FetchAllCourses()
      })
    }
      const handleEditCourseIcon=async()=>
    {
           var formData= new FormData()
           formData.append('courseid',courseId)
           formData.append('courseicon',courseIcon.bytes)
           var result=await postDataAndImage("courses/editcourseicon",formData)
           console.log(result)
           setOpen(false)
           if(result.result)
           {
            Swal.fire({
              title: 'LMS',
              text: 'Department Icon Edited Successfully......',
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
              text: 'Fail To Edit Department......',
              imageUrl: '/lms.png',
              icon:'error',
              imageWidth: 150,
              imageHeight: 150,})
           }
           setBtnstate(false)
           FetchAllCourses()
    }
    const handleEdit=(rowData)=>
    {
        setCourseId(rowData.courseid)
        setDepartment(rowData.departmentid)
        setCourseName(rowData.coursename)
        setSemesterNo(rowData.nosemester)
        setFeePerSemester(rowData.feepersemester)
        setCourseIcon({bytes:'',file:`${ServerURL}/images/${rowData.icon}`})
        setTempCourseIcon({bytes:'',file:`${ServerURL}/images/${rowData.icon}`})
        setOpen(true)
    }
    const handleClose=()=>
    {
        setOpen(false)
    }

    const ShowDailog=()=>
    {
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
             <div style={{fontSize:18,fontWeight:'bold',letterSpacing:2,display:'flex',alignItems:'center'}}>
               <img src="/course.jpg" style={{width: 40, height: 40}} alt=""/>
               Courses Interface
             </div>
             </Grid>
             <Grid item xs={6}>
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
        <Grid item xs={6}>
            <TextField value={courseName} onChange={(event)=>setCourseName(event.target.value)} fullWidth label="Course Name" variant="outlined"/>
        </Grid>
        <Grid item xs={6}>
            <TextField value={semesterNo} onChange={(event)=>setSemesterNo(event.target.value)} fullWidth label="No. Of Semester" variant="outlined"/>
        </Grid>
        <Grid item xs={6}>
            <TextField value={feePerSemester} onChange={(event)=>setFeePerSemester(event.target.value)} fullWidth label="Fee Per Semester" variant="outlined"/>
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
             <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
             {btnstate?<><Button onClick={()=>handleEditCourseIcon()}>Save</Button><Button onClick={()=>handleCancle()}>Cancle</Button></>:<></>}
               </Grid>      
        </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>handleEditCourseData()}>Edit</Button>
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
            title="List Of Courses"
            columns={[
              { title: 'Course ID', field: 'courseid' },
              { title: 'Course Name', field: 'coursename'},
              { title: 'Department', field: 'departmentname' },
              { title: 'No: Of Semester', field: 'nosemester' },
              { title: 'Fee Per Semester', field: 'feepersemester' },
              { title: 'Course Icon', field: 'icon',
                 render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{width: 50, borderRadius: '20'}}/>
               },
            ]}
            data={listCourses}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Course',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Course',
                onClick: (event, rowData) => handleDeleteCourse(rowData.courseid)
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