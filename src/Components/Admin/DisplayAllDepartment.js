import React,{useState,useEffect} from "react";
import MaterialTable from "material-table"
import { getData,ServerURL,postDataAndImage,postData } from "./FetchNodeServices";
import {Grid,TextField,Button} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Swal from "sweetalert2";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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

export default function DisplayAllDepartment(props){
    const classes=useStyles();
    const [listdepartment,setListDepartment]=useState([])
    const [open,setOpen]=useState(false)
    const [depid,setDepId]=useState('');
    const [depname,setDepName]=useState('');
    const [depicon,setDepIcon]=useState({bytes:'',file:'/depicon.png'})
    const [tempicon,setTempIcon]=useState({bytes:'',file:'/depicon.png'})
    const [btnstate,setBtnstate]=useState(false)
    const FetchAllDepartment=async()=>{
        var result=await getData("department/displayalldepartment")
        setListDepartment(result.result)
    }
    const handleIconChange=(event)=>{
      if(event.target.files.length)
      {setDepIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
      setBtnstate(true)
    }
    useEffect(function(){
        FetchAllDepartment()
    },[])

    const handleClose=()=>
    {
      setOpen(false)
    }
    const handleCancle=()=>
    {
      setDepIcon({bytes:'',file:`${tempicon.file}`})
      setBtnstate(false)
    }
    const handleEditData=async()=>
    {
          var body={departmentname:depname,departmentid:depid}
           var result=await postData("department/editdepartmentdata",body)
           console.log(result)
           setOpen(false)
           if(result.result)
           {
            Swal.fire({
              title: 'LMS',
              text: 'Department Edited Successfully......',
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
           FetchAllDepartment()
    }
    const handleEditIcon=async()=>
    {
           var formData= new FormData()
           formData.append('departmentid',depid)
           formData.append('departmenticon',depicon.bytes)
           var result=await postDataAndImage("department/editdepartmenticon",formData)
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
           FetchAllDepartment()
    }
    const handleDelete=async(depid,depicon)=>
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
            var body={departmentid:depid,departmenticon:depicon}
           var result=await postData("department/deletedepartment",body)
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
          }FetchAllDepartment()
      })
    }
    const handleEdit=(rowData)=>
    {
      setDepId(rowData.departmentid)
      setDepName(rowData.departmentname)
      setDepIcon({bytes:'',file:`${ServerURL}/images/${rowData.departmenticon}`})
      setTempIcon({bytes:'',file:`${ServerURL}/images/${rowData.departmenticon}`})
      setOpen(true)
    }

    const ShowDailog=()=>
    {
      return(
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogContent>
        <Grid container spacing={2}>
             <Grid item xs={12}>
             <div style={{fontsize:80,fontWeight:'bold',letterSpacing:2,display:'flex',alignItems:'center'}}>
               <img src="/deplogo.png" style={{width: 40, height: 40}} alt=""/>
                Edit Department
             </div>
             </Grid>
             <Grid item xs={12}>
             <TextField value={depname} onChange={(event)=>setDepName(event.target.value)} fullWidth label="Department Name" variant="outlined" />
             </Grid>
             <Grid item xs={6}>
             <label htmlFor="contained-button-file">
        <Input onChange={(event)=>handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" fullWidth component="span">
          Upload
        </Button>
      </label>
             </Grid>
             <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
             {btnstate?<><Button onClick={()=>handleEditIcon()}>Save</Button><Button onClick={()=>handleCancle()}>Cancle</Button></>:<></>}
             <Avatar
        alt="Image Upload" 
        src={depicon.file}
        sx={{ width: 60, height: 40}} variant="rounded"
      />
             </Grid>
             </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleEditData()}>Save Changes</Button>
          <Button onClick={handleClose} autoFocus>
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
      )
    }

    function DisplayAll() {
        return (
          <MaterialTable
            title="List Of Department"
            columns={[
              { title: 'Department ID', field:'departmentid' },
              { title: 'Department Name', field: 'departmentname' },
              { title: 'Department Icon', field: 'departmenticon',
                 render: rowData => <img src={`${ServerURL}/images/${rowData.departmenticon}`} style={{width: 50, borderRadius: '20'}}/>
               },
              
            ]}
            data={listdepartment}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Department',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Department',
                onClick: (event, rowData) => handleDelete(rowData.departmentid,rowData.departmenticon)
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