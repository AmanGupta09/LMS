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
      width:800,
      borderRadius:8,
      background:'#f5f6fa',
      display:'flex',
      alignItems:'center',
      padding:15
    },
  });
const Input = styled('input')({
    display: 'none',
  });

export default function Students(props)
{const classes=useStyles();
 const [enrollmentNo,setEnrollMentNo]=useState('')
 const [studentName,setStudentName]=useState('')
 const [fatherName,setFatherName]=useState('')
 const [motherName,setMotherName]=useState('')
 const [category,setCategory]=useState('')
 const [nationality,setNationality]=useState('')
 const [gender,setGender]=useState('')
 const [dob,setDob]=useState('')
 const [mobileNo,setMobileNo]=useState('')
 const [parentsMobileNo,setParentsMobileNo]=useState('')
 const [cState,setCState]=useState('')
 const [cCity,setCCity]=useState('')
 const [cAddress,setCAddress]=useState('')
 const [listCurrentState,setListCurrentState]=useState([])
 const [listCurrentCity,setListCurrentCity]=useState([])
 const [pState,setPState]=useState('')
 const [pCity,setPCity]=useState('')
 const [pAddress,setPAddress]=useState('')
 const [listPermanentState,setListPermanentState]=useState([])
 const [listPermanentCity,setListPermanentCity]=useState([])
 const [emailId,setEmailId]=useState('')
 const [parentOccupation,setParentOccupation]=useState('')
 const [annualIncome,setAnnualIncome]=useState('')
 const [aadhaarNo,setAadhaarNo]=useState('')
 const [aadhaarImage,setAadhaarImage]=useState({bytes:'',file:'/chooseadhar.png'})
 const [domicileState,setDomicileState]=useState('')
 const [listDomicileState,setListDomicileState]=useState([])
 const [domicileImage,setDomicileImage]=useState({bytes:'',file:'/chooseadhar.png'})
 const [department,setDepartment]=useState('')
 const [listDepartment,setListDepartment]=useState([])
 const [courses,setCourses]=useState('')
 const [listCourses,setListCourses]=useState([])
 const [password,setPassword]=useState('')
 const [studentImage,setStudentImage]=useState({bytes:'',file:'/chooseadhar.png'})

 const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };
  const handleGender=(gen)=>
  {
    setGender(gen)
  }
  const handleCurrentStateChange = (event) => {
    setCState(event.target.value);
    FetchAllCurrentCity(event.target.value)
  };
  const FetchAllCurrentState=async()=>{
    var result=await getData("statecity/displayallstates")
    setListCurrentState(result.result)
  }
  const fillCurrentState=()=>
  {
       return(listCurrentState.map((item)=>{
         return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
       }))
  }
  useEffect(function(){
    FetchAllCurrentState()
    FetchAllPermanentState()
    FetchAllDomicileState()
    FetchAllDepartment()
},[])
const handleCurrentCityChange = (event) => {
    setCCity(event.target.value);
  };
  const FetchAllCurrentCity=async(cState)=>{
    var result=await postData("statecity/displayallcities",{stateid:cState})
    setListCurrentCity(result.result)
  }
  const fillCurrentCity=()=>
  {
       return(listCurrentCity.map((item)=>{
         return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
       }))
  }
  const handlePermanentStateChange = (event) => {
    setPState(event.target.value);
    FetchAllPermanentCity(event.target.value)
  };
  const FetchAllPermanentState=async()=>{
    var result=await getData("statecity/displayallstates")
    setListPermanentState(result.result)
  }
  const fillPermanentState=()=>
  {
       return(listPermanentState.map((item)=>{
         return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
       }))
  }
  const handlePermanentCityChange = (event) => {
    setPCity(event.target.value);
  };
  const FetchAllPermanentCity=async(pState)=>{
    var result=await postData("statecity/displayallcities",{stateid:pState})
    setListPermanentCity(result.result)
  }
  const fillPermanentCity=()=>
  {
       return(listPermanentCity.map((item)=>{
         return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
       }))
  }
  const handleAadhaarImageChange=(event)=>{
    if(event.target.files.length)
    {setAadhaarImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
  }
  const handleDomicileStateChange = (event) => {
    setDomicileState(event.target.value);
  };
  const FetchAllDomicileState=async()=>{
    var result=await getData("statecity/displayallstates")
    setListDomicileState(result.result)
  }
  const fillDomicileState=()=>
  {
       return(listDomicileState.map((item)=>{
         return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
       }))
  }
  const handleDomicileImageChange=(event)=>{
    if(event.target.files.length)
    {setDomicileImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
  }
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
           return(listDepartment.map((item)=>{
             return(<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)
           }))
      }
const handleCoursesChange = (event) => {
  setCourses(event.target.value);
  }; 
  const FetchAllCourses=async(department)=>{
    var result=await postData("subjects/displayallcoursesbyid",{departmentid:department})
    setListCourses(result.result)
}     
const fillCourses=()=>
      {
           return(listCourses.map((item)=>{
             return(<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
           }))
      }
      const handleGeneratePassword =()=> 
  {
   var ar=['a','B','7','@','0','c','5','Z','8','2','*','g','R','9','k','D']
   var pwd=""
   for( var i=1;i<=8;i++)
   {
     var c=ar[Math.floor(Math.random()*9)]
        pwd+=c
   } 
   setPassword(pwd)
  };
  const handleStudentImageChange=(event)=>{
    if(event.target.files.length)
    {setStudentImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
  }
const handleSubmit=async()=>{
           var formData= new FormData()
           formData.append('enrollmentno',enrollmentNo)
           formData.append('studentname',studentName)
           formData.append('fathername',fatherName)
           formData.append('mothername',motherName)
           formData.append('category',category)
           formData.append('nationality',nationality)
           formData.append('gender',gender)
           formData.append('dob',dob)
           formData.append('cstate',cState)
           formData.append('ccity',cCity)
           formData.append('caddress',cAddress)
           formData.append('pstate',pState)
           formData.append('pcity',pCity)
           formData.append('paddress',pAddress)
           formData.append('mobileno',mobileNo)
           formData.append('parentsmobileno',parentsMobileNo)
           formData.append('emailid',emailId)
           formData.append('parentsoccupation',parentOccupation)
           formData.append('annualincome',annualIncome)
           formData.append('aadhaarno',aadhaarNo)
           formData.append('addharimage',aadhaarImage.bytes)
           formData.append('domicilestate',domicileState)
           formData.append('domicileimage',domicileImage.bytes)
           formData.append('departmentid',department)
           formData.append('courseid',courses)
           formData.append('password',password)
           formData.append('studentimage',studentImage.bytes)
           var result=await postDataAndImage("students/addstudent",formData)
           console.log(result)
           if(result.result)
           {
            Swal.fire({
              title: 'LMS',
              text: 'Student Submitted......',
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
              text: 'Fail To Submit Student......',
              imageUrl: '/lms.png',
              icon:'error',
              imageWidth: 150,
              imageHeight: 150,})
           }
           setTimeout(function() {
            {window.location.reload(false)}
         }, 1000);
  }
return(
    <div className={classes.root}>
    <div className={classes.subdiv}>
    <Grid container spacing={2}>
    <Grid item xs={12}>
    <div style={{fontSize:18,fontWeight:'bold',letterSpacing:2,display:'flex',alignItems:'center',justifyContent:'center'}}>
    <img src="/student.png" style={{width: 40, height: 40}} alt=""/>
    Students Interface
    </div>
    </Grid>

    <Grid item xs={12} >
    <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center",fontStyle:'italic'}} >
    <img src="/info.png" style={{width: 30, height: 30,paddingRight: 4}} alt=""/>
    <u>Personal Details</u>
    </div>
    </Grid>

    <Grid item xs={3}>
    <TextField onChange={(event)=>setEnrollMentNo(event.target.value)} fullWidth label="Enrollment No" variant="outlined" />
    </Grid>

    <Grid item xs={3}>
    <TextField onChange={(event)=>setStudentName(event.target.value)} fullWidth label="Student Name" variant="outlined" />
    </Grid>

    <Grid item xs={3}>
    <TextField onChange={(event)=>setFatherName(event.target.value)} fullWidth label="Father's Name" variant="outlined" />
    </Grid>

    <Grid item xs={3}>
    <TextField onChange={(event)=>setMotherName(event.target.value)} fullWidth label="Mother's Name" variant="outlined" />
    </Grid>

    <Grid item xs={2}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label" >Category</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    label="Category"
    onChange={handleCategoryChange} 
    >
    <MenuItem value={'General'} >General</MenuItem>
    <MenuItem value={'OBC'} >OBC</MenuItem>
    <MenuItem value={'SC'} >SC</MenuItem>
    <MenuItem value={'ST'} >ST</MenuItem>
    </Select>
    </FormControl>
    </Grid>

    <Grid item xs={2
    }>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-labe2" >Nationality</InputLabel>
    <Select
    labelId="demo-simple-select-labe2"
    id="demo-simple-select"
    value={nationality}
    label="Nationality"
    onChange={handleNationalityChange} 
    >
    <MenuItem value={'Indian'} >Indian</MenuItem>
    <MenuItem value={'NRI'} >NRI</MenuItem>
    <MenuItem value={'Australian'} >Australian</MenuItem>
    </Select>
    </FormControl>
    </Grid>

    <Grid item xs={4}>
    <FormControl component="fieldset">
    <FormLabel component="legend">Gender</FormLabel>
    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
    <FormControlLabel value="male" control={<Radio />} onClick={()=>handleGender("Male")} label="Male" sx={{'& .MuiSvgIcon-root': {fontSize: 15,}}} />
    <FormControlLabel value="female" control={<Radio />} onClick={()=>handleGender("Female")} label="Female" sx={{'& .MuiSvgIcon-root': {fontSize: 15,}}} />
    <FormControlLabel value="other" control={<Radio />} onClick={()=>handleGender("Others")} label="Other" sx={{'& .MuiSvgIcon-root': {fontSize: 15,}}} />
    </RadioGroup>
    </FormControl>
    </Grid>

    <Grid item xs={4}>
    <TextField onChange={(event)=>setDob(event.target.value)} type='date' fullWidth variant="outlined" />
    </Grid>

    <Grid item xs={3}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label3" >Current State</InputLabel>
    <Select
    labelId="demo-simple-select-label3"
    id="demo-simple-select"
    value={cState}
    label="Current State"
    onChange={handleCurrentStateChange} 
    >
    {fillCurrentState()}
    </Select>
    </FormControl>
    </Grid>

    <Grid item xs={3}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label4" >Current City</InputLabel>
    <Select
    labelId="demo-simple-select-label4"
    id="demo-simple-select"
    value={cCity}
    label="Current City"
    onChange={handleCurrentCityChange} 
    >
    {fillCurrentCity()}
    </Select>
    </FormControl>
    </Grid>

    <Grid item xs={6}>
    <TextField onChange={(event)=>setCAddress(event.target.value)} fullWidth label="Current Address" variant="outlined" />
    </Grid>

    <Grid item xs={3}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label5" >Permanent State</InputLabel>
    <Select
    labelId="demo-simple-select-label5"
    id="demo-simple-select"
    value={pState}
    label="Permanent State"
    onChange={handlePermanentStateChange} 
    >
    {fillPermanentState()}
    </Select>
    </FormControl>
    </Grid>

    <Grid item xs={3}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label6" >Permanent City</InputLabel>
    <Select
    labelId="demo-simple-select-label6"
    id="demo-simple-select"
    value={pCity}
    label="Permanent City"
    onChange={handlePermanentCityChange} 
    >
    {fillPermanentCity()}
    </Select>
    </FormControl>
    </Grid>

    <Grid item xs={6}>
    <TextField onChange={(event)=>setPAddress(event.target.value)} fullWidth label="Permanent Address" variant="outlined" />
    </Grid>

    <Grid item xs={12} >
    <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center",fontStyle:'italic'}} >
    <img src="/contact.png" style={{width: 30, height: 30,paddingRight:4}} alt=""/>
    <u>Contact Information</u>
    </div>
    </Grid>

    <Grid item xs={4}>
    <TextField onChange={(event)=>setMobileNo(event.target.value)} fullWidth label="Mobile No" variant="outlined" />
    </Grid>

    <Grid item xs={4}>
    <TextField onChange={(event)=>setParentsMobileNo(event.target.value)} fullWidth label="Parent's Mobile No" variant="outlined" />
    </Grid>

    <Grid item xs={4}>
    <TextField onChange={(event)=>setEmailId(event.target.value)} fullWidth label="Email ID" variant="outlined" />
    </Grid>

    <Grid item xs={12} >
    <div style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center",fontStyle:'italic'}} >
    <img src="/doc.png" style={{width: 30, height: 30,paddingRight:4}} alt=""/>
    <u>Documentation</u>
    </div>
    </Grid>

    <Grid item xs={4}>
    <TextField onChange={(event)=>setParentOccupation(event.target.value)} fullWidth label="Parent's Occupation " variant="outlined" />
    </Grid>

    <Grid item xs={4}>
    <TextField onChange={(event)=>setAnnualIncome(event.target.value)} fullWidth label="Annual Income" variant="outlined" />
    </Grid>

    <Grid item xs={4}>
    <TextField onChange={(event)=>setAadhaarNo(event.target.value)} fullWidth label="Aadhaar No" variant="outlined" />
    </Grid>

    <Grid item xs={4} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    <label htmlFor="contained-button-file">
    <Input onChange={(event)=>handleAadhaarImageChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
    <Button variant="contained" fullWidth component="span">
    Upload Aadhaar
    </Button>
    </label>
    </Grid>

    <Grid item xs={2} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Avatar
    alt="Image Upload"
    src={aadhaarImage.file}
    sx={{ width: 90, height: 60}} variant="rounded"
    />
    </Grid>

    <Grid item xs={4} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    <label htmlFor="contained-button-file1">
    <Input onChange={(event)=>handleDomicileImageChange(event)} accept="image/*" id="contained-button-file1" multiple type="file" />
    <Button variant="contained" fullWidth component="span">
    Upload Domicile
    </Button>
    </label>
    </Grid>

    <Grid item xs={2} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Avatar
    alt="Image Upload"
    src={domicileImage.file}
    sx={{ width: 90, height: 60}} variant="rounded"
    />
    </Grid>

    <Grid item xs={4}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label7" >Domicile State</InputLabel>
    <Select
    labelId="demo-simple-select-label7"
    id="demo-simple-select"
    value={domicileState}
    label="Permanent State"
    onChange={handleDomicileStateChange} 
    >
    {fillDomicileState()}
    </Select>
    </FormControl>
    </Grid>

    <Grid item xs={4}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label8" >Department</InputLabel>
    <Select
    labelId="demo-simple-select-label8"
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
    <InputLabel id="demo-simple-select-label9" >Course</InputLabel>
    <Select
    labelId="demo-simple-select-label9"
    id="demo-simple-select"
    value={courses}
    label="Course"
    onChange={handleCoursesChange} 
    >
    {fillCourses()}
    </Select>
    </FormControl>
    </Grid>

    <Grid item xs={3} sx={{display:'flex',alignItems:'center'}}>
    <Button onClick={()=>handleGeneratePassword()} fullWidth variant="contained" color="primary">Create Password</Button>
    </Grid>
    
    <Grid item xs={3}>
    <TextField fullWidth value={password} onChange={(event)=>setPassword(event.target.value)} label="Password" variant="outlined" />
    </Grid>

    <Grid item xs={3} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    <label htmlFor="contained-button-file2">
    <Input onChange={(event)=>handleStudentImageChange(event)} accept="image/*" id="contained-button-file2" multiple type="file" />
    <Button variant="contained" fullWidth component="span">
    Upload Picture
    </Button>
    </label>
    </Grid>

    <Grid item xs={3} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Avatar
    alt="Image Upload"
    src={studentImage.file}
    sx={{ width: 90, height: 60}} variant="rounded"
    />
    </Grid>

    <Grid item xs={6}>
    <Button fullWidth onClick={()=>handleSubmit()} variant="contained" color="success">Save</Button>
    </Grid>
    <Grid item xs={6}>
    <Button fullWidth onClick={() => window.location.reload(false)} variant="contained" type="reset" color="error">Reset</Button>
    </Grid>

    </Grid>
    </div>
    </div>
)

}