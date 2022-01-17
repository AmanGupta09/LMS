import React,{useState,useEffect} from "react";
import {styled,makeStyles } from '@mui/styles';
import { ClassNames } from "@emotion/react";
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
import { fontSize } from "@mui/system";

const useStyles = makeStyles({
box:{
    display:'flex',
    justifyContent:'center',
    alignContent:'center',

},
innerbox:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background:'#f5f6fa',
    marginTop:30,
    borderRadius:10,
    width:650,
    padding:15
}
})
const Input = styled('input')({
    display: 'none',
  });

export default function Faculty(props)
{const classes=useStyles();
  const [facultyimg,setFacultyImg]=useState({bytes:'',file:'/facultyimg.png'})
  const [firstname,setFirstName]=useState('')
  const [lastname,setLastName]=useState('')
  const [fathername,setFatherName]=useState('')
  const [gender,setGender]=useState('')
  const [birthdate,setBirthDate]=useState('')
  const [qualification,setQualification]=useState('')
  const [department,setDepartment]=useState('')
  const [address,setAddress]=useState('')
  const [state,setState]=useState('')
  const [city,setCity]=useState('')
  const [mobileno,setMobileNo]=useState('')
  const [alternatemobileno,setAlternateMobileNo]=useState('')
  const [emailid,setEmailId]=useState('')
  const [password,setPassword]=useState('')
  const [designation,setDesignation]=useState('')
  const [listdepartment,setListDepartment]=useState([])
  const [listState,setListState]=useState([])
  const [listCity,setListCity]=useState([])

  const handleImageChange=(event)=>
  {
    setFacultyImg({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
  }
  const handleSubmit=async()=>
  { var formData= new FormData()
    formData.append('firstname',firstname)
    formData.append('lastname',lastname)
    formData.append('fathername',fathername)
    formData.append('gender',gender)
    formData.append('birthdate',birthdate)
    formData.append('qualification',qualification)
    formData.append('department',department)
    formData.append('address',address)
    formData.append('state',state)
    formData.append('city',city)
    formData.append('mobileno',mobileno)
    formData.append('alternatemobileno',alternatemobileno)
    formData.append('emailid',emailid)
    formData.append('designation',designation)
    formData.append('password',password)
    formData.append('facultyimg',facultyimg.bytes)

    var result=await postDataAndImage("faculty/addfaculty",formData)
           console.log(result)
           if(result.result)
           {
            Swal.fire({
              title: 'LMS',
              text: 'Faculty Submitted......',
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
              text: 'Fail To Submit Faculty......',
              imageUrl: '/lms.png',
              icon:'error',
              imageWidth: 150,
              imageHeight: 150,})
           }
     
  }
  const handleGender=(gen)=>
  {
    setGender(gen)
  }
  const FetchAllDepartment=async()=>{
    var result=await getData("department/displayalldepartment")
    setListDepartment(result.result)
}
const FetchAllState=async()=>{
  var result=await getData("statecity/displayallstates")
  setListState(result.result)
}
const FetchAllCity=async(stateid)=>{
  var result=await postData("statecity/displayallcities",{stateid:stateid})
  setListCity(result.result)
}
  useEffect(function(){
    FetchAllDepartment()
    FetchAllState()
},[])
  const fillDepartment=()=>
  {
       return(listdepartment.map((item)=>{
         return(<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)
       }))
  }
  const fillState=()=>
  {
       return(listState.map((item)=>{
         return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
       }))
  }
  const fillCity=()=>
  {
       return(listCity.map((item)=>{
         return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
       }))
  }
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
    FetchAllCity(event.target.value)
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
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
    return(
         <div className={classes.box}>
             <div className={classes.innerbox}>
               <Grid container spacing={2}>
               <Grid item xs={12}>
             <div style={{fontSize:16,fontWeight:'bold',letterSpacing:2,display:'flex',alignItems:'center'}}>
               <img src="/faculty.png" style={{width: 40, height: 40,paddingRight:10}} />
               Faculty Interface
             </div>
             </Grid>
             <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                   <Avatar
                    alt="Image Upload"
                    src={facultyimg.file}
                    sx={{ width: 110, height: 110}} variant="rounded"
                    />
                     </Grid>
                   <Grid item xs={6} sx={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                   <label htmlFor="contained-button-file">
                   <Input onChange={(event)=>handleImageChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                   <Button variant="contained" fullWidth component="span" >
                     Upload Faculty Image
                   </Button>
                    </label>
                   </Grid>
                   <Grid item xs={4}>
                   <TextField onChange={(event)=>setFirstName(event.target.value)}fullWidth label="First Name" variant="outlined" />
                   </Grid>
                   <Grid item xs={4}>
                   <TextField onChange={(event)=>setLastName(event.target.value)} fullWidth label="Last Name" variant="outlined"/>
                   </Grid>
                   <Grid item xs={4}>
                   <TextField onChange={(event)=>setFatherName(event.target.value)}fullWidth label="Father Name" variant="outlined"/>
                   </Grid>
                   <Grid item xs={6}>
                   <TextField fullWidth onChange={(event)=>setBirthDate(event.target.value)} type='date' variant="outlined"/>
                   </Grid>
                   <Grid item xs={6}>
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
                   <TextField fullWidth onChange={(event)=>setQualification(event.target.value)}label="Qualification" variant="outlined"/>
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
                   <TextField fullWidth onChange={(event)=>setDesignation(event.target.value)} label="Designation:" variant="outlined" />
                   </Grid>
                   <Grid item xs={12}>
                   <TextField fullWidth onChange={(event)=>setAddress(event.target.value)}label="Address" variant="outlined" />
                   </Grid>
                   <Grid item xs={6}>
                   <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label2" >State</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select"
          value={state}
          label="State"
          onChange={handleStateChange} 
        >
          {fillState()}
        </Select>
      </FormControl>
                   </Grid>
                   <Grid item xs={6}>
                   <FormControl fullWidth>
                       <InputLabel id="demo-simple-select-label3" >City</InputLabel>
                       <Select
                            labelId="demo-simple-select-label3"
                         id="demo-simple-select"
                        value={city}
                         label="City"
                        onChange={handleCityChange} 
                           >
                        {fillCity()}
                          </Select>
                        </FormControl>
                   </Grid>
                   <Grid item xs={4}>
                   <TextField fullWidth onChange={(event)=>setMobileNo(event.target.value)} label="Mobile No:" variant="outlined"/>
                   </Grid>
                   <Grid item xs={4}>
                   <TextField fullWidth onChange={(event)=>setAlternateMobileNo(event.target.value)} label="Alternate Mobile No:" variant="outlined" />
                   </Grid>
                   <Grid item xs={4}>
                   <TextField fullWidth onChange={(event)=>setEmailId(event.target.value)} label="Email ID:" variant="outlined" />
                   </Grid>
                   <Grid item xs={8}>
                   <TextField fullWidth value={password} onChange={(event)=>setPassword(event.target.value)} label="Password" variant="outlined" />
                   </Grid>
                   <Grid item xs={4} sx={{display:'flex',alignItems:'center'}}>
                     <Button sx={{padding:2}} onClick={()=>handleGeneratePassword()} fullWidth variant="contained" color="success">Create Password</Button>
                     </Grid>
                     <Grid item xs={6}>
                     <Button onClick={()=>handleSubmit()} fullWidth variant="contained" color="primary">Save</Button>
                     </Grid>
                     <Grid item xs={6}>
                     <Button fullWidth variant="contained" color="error">Reset</Button>
                     </Grid>

               </Grid>
             </div>
         </div>
    )
}