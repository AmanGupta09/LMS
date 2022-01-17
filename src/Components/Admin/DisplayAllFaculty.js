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
import { makeStyles,styled } from '@mui/styles';
const useStyles = makeStyles({
  
    root: {
      display:'flex',
      justifyContent:'center',
      alignContent:'center'
    },
    subdiv:{
      marginTop:30,
      width:1400,
      borderRadius:8,
      background:'#FFFFF',
      alignItems:'center',
      padding:15
    },
  });
  export default function DisplayAllFaculty(props){
    const classes=useStyles();
    const [facultyimg,setFacultyImg]=useState({bytes:'',file:'/facultyimg.png'})
    const [tempfacultyimg,setTempFacultyImg]=useState('')
    const [facultyid,setFacultyId]=useState('')
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
  const [btnstate,setBtnstate]=useState(false)
  const [gt,setGt]=useState({Male:false,Female:false,Other:false})

    const [open,setOpen]=useState(false)
    const [listfaculty,setListFaculty]=useState([])
    const FetchAllFaculty=async()=>{
        var result=await getData("faculty/displayallfaculty")
        setListFaculty(result.result)
    }
    const Input = styled('input')({
      display: 'none',
    });  
    useEffect(function(){
        FetchAllFaculty()
    },[])
    const handleImageChange=(event)=>
  {  if(event.target.files.length)
    {setFacultyImg({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
    setBtnstate(true)
  }
  const handleGender=(gen)=>
  {  if(gen=="Female")
     setGt({female:true,male:false,other:false})
     else if(gen=="Male")
     setGt({female:false,male:true,other:false})
     else
     setGt({female:false,male:false,other:true})
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
    const handleClose=()=>
    {
      setOpen(false)
    }
    const handleCancel=()=>
    {
      setFacultyImg({bytes:'',file:`${tempfacultyimg.file}`})
      setBtnstate(false)
    }
    const handleEdit=(rowData)=>
    {
      setFacultyId(rowData.facultyid)
      setFirstName(rowData.firstname)
      setLastName(rowData.lastname)
      setFatherName(rowData.fathername)
      setBirthDate(rowData.birthdate)
      if(rowData.gender=="Male")
      setGt({Female:false,Male:true,Other:false})
      else if(rowData.gender=="Female")
      setGt({Female:true,Male:false,Other:false})
      else
      setGt({Female:false,Male:false,Other:true})
      setQualification(rowData.qualification)
      setDepartment(rowData.department)
      setDesignation(rowData.designation)
      setAddress(rowData.address)
      setState(rowData.state)
      FetchAllCity(rowData.state)
      setCity(rowData.city)
      setMobileNo(rowData.mobilenumber)
      setAlternateMobileNo(rowData.alternatemobilenumber)
      setEmailId(rowData.emailid)
      setPassword(rowData.password)
      setFacultyImg({bytes:'',file:`${ServerURL}/images/${rowData.facultyimage}`})
      setTempFacultyImg({bytes:'',file:`${ServerURL}/images/${rowData.facultyimage}`})

      setOpen(true)
    }
    const handleEditFacultyData=async()=>
    {
          var body={firstname:firstname,lastname:lastname,fathername:fathername,birthdate:birthdate,gender:gender,qualification:qualification,department:department,designation:designation,address:address,state:state,city:city,mobileno:mobileno,alternatemobileno:alternatemobileno,emailid:emailid,password:password,facultyid:facultyid}
           var result=await postData("faculty/editfacultydata",body)
           console.log(result)
           setOpen(false)
           if(result.result)
           {
            Swal.fire({
              title: 'LMS',
              text: 'Faculty Edited Successfully......',
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
              text: 'Fail To Edit Faculty......',
              imageUrl: '/lms.png',
              icon:'error',
              imageWidth: 150,
              imageHeight: 150,})
           }
           FetchAllFaculty()
    }
    const handleDeleteFaculty=async(facultyid)=>
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
            var body={facultyid:facultyid}
           var result=await postData("faculty/deletefaculty",body)
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
          }FetchAllFaculty()
      })
    }
    const handleEditFacultyImage=async()=>
    {
           var formData= new FormData()
           formData.append('facultyid',facultyid)
           formData.append('facultyimage',facultyimg.bytes)
           var result=await postDataAndImage("faculty/editfacultyimage",formData)
           console.log(result)
           setOpen(false)
           if(result.result)
           {
            Swal.fire({
              title: 'LMS',
              text: 'Faculty Image Edited Successfully......',
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
              text: 'Fail To Edit Faculty Image......',
              imageUrl: '/lms.png',
              icon:'error',
              imageWidth: 150,
              imageHeight: 150,})
           }
           setBtnstate(false)
           FetchAllFaculty()
    }
    const ShowDailog=()=>
    {
      return (
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
            <Grid container spacing={2}>
               <Grid item xs={12}>
             <div style={{fontSize:16,fontWeight:'bold',letterSpacing:2,display:'flex',alignItems:'center'}}>
               <img src="/faculty.png" style={{width: 40, height: 40,paddingRight:10}} />
               Edit Faculty
             </div>
             </Grid>
             <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                   <Avatar
                    alt="Image Upload"
                    src={facultyimg.file}
                    sx={{ width: 110, height:110}} variant="rounded"
                    />{btnstate?<><div><Button onClick={()=>handleEditFacultyImage()}>Save</Button><Button onClick={()=>handleCancel()}>Cancel</Button></div></>:<></>}
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
                   <TextField value={firstname} onChange={(event)=>setFirstName(event.target.value)}fullWidth label="First Name" variant="outlined" />
                   </Grid>
                   <Grid item xs={4}>
                   <TextField value={lastname} onChange={(event)=>setLastName(event.target.value)} fullWidth label="Last Name" variant="outlined"/>
                   </Grid>
                   <Grid item xs={4}>
                   <TextField value={fathername} onChange={(event)=>setFatherName(event.target.value)}fullWidth label="Father Name" variant="outlined"/>
                   </Grid>
                   <Grid item xs={6}>
                   <TextField value={birthdate} fullWidth onChange={(event)=>setBirthDate(event.target.value)} type='date' variant="outlined"/>
                   </Grid>
                   <Grid item xs={6}>
                   <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
        <FormControlLabel value="Male" control={<Radio checked={gt.Male} />} onClick={()=>handleGender("Male")} label="Male" sx={{'& .MuiSvgIcon-root': {fontSize: 15,}}} />
        <FormControlLabel value="Female" control={<Radio checked={gt.Female} />} onClick={()=>handleGender("Female")} label="Female" sx={{'& .MuiSvgIcon-root': {fontSize: 15,}}} />
        <FormControlLabel value="Other" control={<Radio checked={gt.Other} />} onClick={()=>handleGender("Others")} label="Other" sx={{'& .MuiSvgIcon-root': {fontSize: 15,}}} />
      </RadioGroup>
    </FormControl>
                   </Grid>
                   <Grid item xs={4}>
                   <TextField value={qualification} fullWidth onChange={(event)=>setQualification(event.target.value)}label="Qualification" variant="outlined"/>
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
                   <TextField fullWidth value={designation} onChange={(event)=>setDesignation(event.target.value)} label="Designation:" variant="outlined" />
                   </Grid>
                   <Grid item xs={12}>
                   <TextField fullWidth value={address} onChange={(event)=>setAddress(event.target.value)}label="Address" variant="outlined" />
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
                   <TextField fullWidth value={mobileno} onChange={(event)=>setMobileNo(event.target.value)} label="Mobile No:" variant="outlined"/>
                   </Grid>
                   <Grid item xs={4}>
                   <TextField fullWidth value={alternatemobileno} onChange={(event)=>setAlternateMobileNo(event.target.value)} label="Alternate Mobile No:" variant="outlined" />
                   </Grid>
                   <Grid item xs={4}>
                   <TextField fullWidth value={emailid} onChange={(event)=>setEmailId(event.target.value)} label="Email ID:" variant="outlined" />
                   </Grid>
                   <Grid item xs={8}>
                   <TextField fullWidth value={password} onChange={(event)=>setPassword(event.target.value)} label="Password" variant="outlined" />
                   </Grid>
                   <Grid item xs={4} sx={{display:'flex',alignItems:'center'}}>
                     <Button sx={{padding:2}} onClick={()=>handleGeneratePassword()} fullWidth variant="contained" color="success">Create Password</Button>
                     </Grid>
                
               </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditFacultyData}>Edit</Button>
              <Button onClick={handleClose} autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
      );
    }
    function DisplayAll() {
        return (
          <MaterialTable
            title="List Of Faculty"
            columns={[
              { title: 'Faculty ID', field:'facultyid' },
              { title: 'Faculty Name', field: '',render:(rowData)=>(<div>{rowData.firstname} {rowData.lastname}</div>) },
              { title: 'Father Name', field:'fathername' },
              { title: 'Gender/DOB', field:'',render:(rowData)=>(<div>{rowData.gender}<br/>{rowData.birthdate}</div>) },
              { title: 'Qualification/Dep/Designation', field:'',render:(rowData)=>(<div>{rowData.qualification}<br/>{rowData.departmentname}<br/>{rowData.designation}</div>) },
              { title: 'Address', field:'',render:(rowData)=>(<div>{rowData.address}<br/>{rowData.cityname}<br/>{rowData.statename}</div>) },
              { title: 'Contact Info', field:'',render:(rowData)=>(<div>{rowData.mobilenumber}<br/>{rowData.alternatemobilenumber}<br/>{rowData.emailid}</div>) },
              { title: 'Faculty Image', field: '',
                 render: rowData => <img src={`${ServerURL}/images/${rowData.facultyimage}`} style={{width: 50, borderRadius: '20'}}/>
               },
              
            ]}
            data={listfaculty}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Faculty',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Faculty',
                onClick: (event, rowData) => handleDeleteFaculty(rowData.facultyid)
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