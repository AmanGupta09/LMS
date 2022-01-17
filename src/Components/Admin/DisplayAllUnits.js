import React, { useState, useEffect } from "react";
import MaterialTable from "material-table"
import { Grid, TextField, Button } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ServerURL, postDataAndImage, getData, postData } from "./FetchNodeServices";
import Swal from "sweetalert2";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles, styled } from '@mui/styles';

const useStyles = makeStyles({

    root: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    subdiv: {
        marginTop: 30,
        width: 1200,
        borderRadius: 8,
        background: '#FFFFF',
        alignItems: 'center',
        padding: 15
    },
});


export default function DisplayAllUnits(props) {
    const classes = useStyles();
    const [unitId,setUnitId]=useState('')
    const [listUnits, setListUnits] = useState([])
    const [department, setDepartment] = useState('')
    const [listDepartment, setListDepartment] = useState([])
    const [courses, setCourses] = useState('')
    const [listCourses, setListCourses] = useState([])
    const [subject, setSubject] = useState('')
    const [listSubjects, setListSubjects] = useState([])
    const [unitNo, setUnitNo] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [open, setOpen] = useState(false)
    const FetchAllUnits = async () => {
        var result = await getData("units/displayallunits")
        setListUnits(result.result)
    }
    useEffect(function () {
        FetchAllUnits()
        FetchAllDepartment()
    }, [])
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        FetchAllCourses(event.target.value)
    };
    const FetchAllDepartment = async () => {
        var result = await getData("department/displayalldepartment")
        setListDepartment(result.result)
    }
    useEffect(function () {
        FetchAllDepartment()
    }, [])
    const fillDepartment = () => {
        return (listDepartment.map((item) => {
            return (<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)
        }))
    }
    const handleCoursesChange = (event) => {
        setCourses(event.target.value);
        FetchAllSubjects(event.target.value)
    };
    const FetchAllCourses = async (department) => {
        var result = await postData("subjects/displayallcoursesbyid", { departmentid: department })
        setListCourses(result.result)
    }
    const fillCourses = () => {
        return (listCourses.map((item) => {
            return (<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
        }))
    }

    const handleSubjectChange = (event) => {
        setSubject(event.target.value)
    }
    const FetchAllSubjects = async (courses) => {
        var result = await postData("subjects/displayallsubjectsbycourseid", { courseid: courses })
        setListSubjects(result.result)
    }
    const fillSubjects = () => {
        return (listSubjects.map((item) => {
            return (<MenuItem value={item.subjectid}>{item.subjectname} [{item.type}]</MenuItem>)
        }))
    }
    const handleEdit = (rowData) => {
        setUnitId(rowData.unitid)
        setDepartment(rowData.departmentid)
        setCourses(rowData.courseid)
        FetchAllCourses(rowData.departmentid)
        setSubject(rowData.subjectid)
        FetchAllSubjects(rowData.courseid)
        setUnitNo(rowData.unitno)
        setTitle(rowData.title)
        setDescription(rowData.description)
        setOpen(true)
    }
    const handleEditUnitData=async()=>
    {
          var body={unitid:unitId, departmentid:department, courseid:courses, subjectid:subject, unitno:unitNo, title:title, description:description}
           var result=await postData("units/editunitdata",body)
           console.log(result)
           setOpen(false)
           if(result.result)
           {
            Swal.fire({
              title: 'LMS',
              text: 'Unit Edited Successfully......',
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
              text: 'Fail To Edit Unit......',
              imageUrl: '/lms.png',
              icon:'error',
              imageWidth: 150,
              imageHeight: 150,})
           }
           FetchAllUnits()
    }
    const handleDeleteUnit=async(unitid)=>
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
            var body={unitid:unitid}
           var result=await postData("units/deleteunit",body)
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
          }FetchAllUnits()
      })
    }

    const handleClose = () => {
        setOpen(false)
    }


    function ShowDailog() {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="/unit.png" style={{ width: 40, height: 40 }} alt="" />
                                Units Interface
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
                                <InputLabel id="demo-simple-select-label2" >Subject</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label2"
                                    id="demo-simple-select"
                                    value={subject}
                                    label="Subject"
                                    onChange={handleSubjectChange}
                                >
                                    {fillSubjects()}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField value={unitNo} onChange={(event) => setUnitNo(event.target.value)} fullWidth label="Unit Number" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField value={title} onChange={(event) => setTitle(event.target.value)} fullWidth label="Unit Title" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField value={description} onChange={(event) => setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditUnitData}>Edit</Button>
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
                title="List Of Units"
                columns={[
                    { title: 'Unit ID', field: 'unitid' },
                    { title: 'Department', field: 'departmentname' },
                    { title: 'Course', field: 'coursename' },
                    { title: 'Semester', field: 'semester' },
                    { title: 'Subject', field: 'subjectname' },
                    { title: 'Subject Type', field: 'subjecttype' },
                    { title: 'Unit No', field: 'unitno' },
                    { title: 'Title', field: 'title' },
                    { title: 'Description', field: 'description' },

                ]}
                data={listUnits}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Unit',
                        onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Unit',
                        onClick: (event, rowData) => handleDeleteUnit(rowData.unitid)
                    }
                ]}
            />
        )


    }

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                {DisplayAll()}
                {ShowDailog()}
            </div>
        </div>
    )

}