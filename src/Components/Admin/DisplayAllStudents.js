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
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles, styled } from '@mui/styles';

import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const useStyles = makeStyles({

    root: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    subdiv: {
        marginTop: 30,
        width: 1000,
        borderRadius: 8,
        background: '#FFFFF',
        alignItems: 'center',
        padding: 15
    },
});
const Input = styled('input')({
    display: 'none',
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function DisplayAllStudents(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open1, setOpen1] = useState(false)
    const [enrollmentno, setEnrollMentNo] = useState('')
    const [studentName, setStudentName] = useState('')
    const [category, setCategory] = useState('')
    const [nationality, setNationality] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [cState, setCState] = useState('')
    const [cCity, setCCity] = useState('')
    const [cAddress, setCAddress] = useState('')
    const [listCurrentState, setListCurrentState] = useState([])
    const [listCurrentCity, setListCurrentCity] = useState([])
    const [mobileNo, setMobileNo] = useState('')
    const [emailId, setEmailId] = useState('')
    const [department, setDepartment] = useState('')
    const [listDepartment, setListDepartment] = useState([])
    const [courses, setCourses] = useState('')
    const [listCourses, setListCourses] = useState([])
    const [studentImage, setStudentImage] = useState({ bytes: '', file: '/chooseadhar.png' })
    const [tempStudentImage, setTempStudentImage] = useState('')
    const [password, setPassword] = useState('')
    const [gt, setGt] = useState({ Male: false, Female: false, Other: false })
    const [btnstate1, setBtnstate1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [fatherName, setFatherName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [pState, setPState] = useState('')
    const [pCity, setPCity] = useState('')
    const [pAddress, setPAddress] = useState('')
    const [parentOccupation, setParentOccupation] = useState('')
    const [annualIncome, setAnnualIncome] = useState('')
    const [parentsMobileNo, setParentsMobileNo] = useState('')
    const [aadhaarno, setAadhaarNo] = useState('')
    const [aadhaarImage, setAadhaarImage] = useState({ bytes: '', file: '/chooseadhar.png' })
    const [tempAadhaarImage, setTempAadhaarImage] = useState('')
    const [listPermanentState, setListPermanentState] = useState([])
    const [listPermanentCity, setListPermanentCity] = useState([])
    const [domicileState, setDomicileState] = useState('')
    const [listDomicileState, setListDomicileState] = useState([])
    const [domicileImage, setDomicileImage] = useState({ bytes: '', file: '/chooseadhar.png' })
    const [tempDomicileImage, setTempDomicileImage] = useState('')
    const [btnstate2, setBtnstate2] = useState(false)
    const [btnstate3, setBtnstate3] = useState(false)
    const [listStudents, setListStudents] = useState([])
    const FetchAllStudents = async () => {
        var result = await getData("students/displayallstudents")
        setListStudents(result.result)
    }
    useEffect(function () {
        FetchAllStudents()
        FetchAllCurrentState()
        FetchAllDepartment()
        FetchAllPermanentState()
        FetchAllDomicileState()
    }, [])
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleNationalityChange = (event) => {
        setNationality(event.target.value);
    };
    const handleGender = (gen) => {
        if (gen == "Female")
            setGt({ female: true, male: false, other: false })
        else if (gen == "Male")
            setGt({ female: false, male: true, other: false })
        else
            setGt({ female: false, male: false, other: true })
        setGender(gen)
    }
    const handleCurrentStateChange = (event) => {
        setCState(event.target.value);
        FetchAllCurrentCity(event.target.value)
    };
    const FetchAllCurrentState = async () => {
        var result = await getData("statecity/displayallstates")
        setListCurrentState(result.result)
    }
    const fillCurrentState = () => {
        return (listCurrentState.map((item) => {
            return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
        }))
    }
    const handleCurrentCityChange = (event) => {
        setCCity(event.target.value);
    };
    const FetchAllCurrentCity = async (cState) => {
        var result = await postData("statecity/displayallcities", { stateid: cState })
        setListCurrentCity(result.result)
    }
    const fillCurrentCity = () => {
        return (listCurrentCity.map((item) => {
            return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
        }))
    }
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        FetchAllCourses(event.target.value)
    };
    const FetchAllDepartment = async () => {
        var result = await getData("department/displayalldepartment")
        setListDepartment(result.result)
    }
    const fillDepartment = () => {
        return (listDepartment.map((item) => {
            return (<MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)
        }))
    }
    const handleCoursesChange = (event) => {
        setCourses(event.target.value);
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
    const handleGeneratePassword = () => {
        var ar = ['a', 'B', '7', '@', '0', 'c', '5', 'Z', '8', '2', '*', 'g', 'R', '9', 'k', 'D']
        var pwd = ""
        for (var i = 1; i <= 8; i++) {
            var c = ar[Math.floor(Math.random() * 9)]
            pwd += c
        }
        setPassword(pwd)
    };
    const handleStudentImageChange = (event) => {
        if (event.target.files.length) {
            setStudentImage({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
            setBtnstate1(true)
        }
    }
    const handleEditStudent = (rowData) => {
        setEnrollMentNo(rowData.enrollmentno)
        setStudentName(rowData.studentname)
        setCategory(rowData.category)
        setNationality(rowData.nationality)
        setGender(rowData.gender)
        if (rowData.gender == "Male")
            setGt({ Female: false, Male: true, Other: false })
        else if (rowData.gender == "Female")
            setGt({ Female: true, Male: false, Other: false })
        else
            setGt({ Female: false, Male: false, Other: true })
        setDob(rowData.dob)
        setMobileNo(rowData.mobileno)
        setCState(rowData.cstate)
        setCCity(rowData.ccity)
        FetchAllCurrentCity(rowData.cstate)
        setCAddress(rowData.caddress)
        setEmailId(rowData.emailid)
        setDepartment(rowData.departmentid)
        setCourses(rowData.courseid)
        FetchAllCourses(rowData.departmentid)
        setPassword(rowData.password)
        setStudentImage({ bytes: '', file: `${ServerURL}/images/${rowData.picture}` })
        setTempStudentImage({ bytes: '', file: `${ServerURL}/images/${rowData.picture}` })
        setOpen1(true)
    }
    const handleEditStudentImage = async () => {
        var formData = new FormData()
        formData.append('enrollmentno', enrollmentno)
        formData.append('picture', studentImage.bytes)
        var result = await postDataAndImage("students/editstudentpicture", formData)
        console.log(result)
        setOpen1(false)
        if (result.result) {
            Swal.fire({
                title: 'LMS',
                text: 'Student Image Edited Successfully......',
                imageUrl: '/lms.png',
                icon: 'success',
                imageWidth: 150,
                imageHeight: 150,
            })
        }
        else {
            Swal.fire({
                title: 'LMS',
                text: 'Fail To Edit Student Image......',
                imageUrl: '/lms.png',
                icon: 'error',
                imageWidth: 150,
                imageHeight: 150,
            })
        }
        setBtnstate1(false)
        FetchAllStudents()
    }
    const handleEditStudentData = async () => {
        var body = { studentname: studentName, category: category, nationality: nationality, gender: gender, dob: dob, mobileno: mobileNo, cstate: cState, ccity: cCity, caddress: cAddress, emailid: emailId, departmentid: department, courseid: courses, password: password, enrollmentno: enrollmentno }
        var result = await postData("students/editstudentdata", body)
        console.log(result)
        setOpen1(false)
        if (result.result) {
            Swal.fire({
                title: 'LMS',
                text: 'Faculty Edited Successfully......',
                imageUrl: '/lms.png',
                icon: 'success',
                imageWidth: 150,
                imageHeight: 150,
            })
        }
        else {
            Swal.fire({
                title: 'LMS',
                text: 'Fail To Edit Faculty......',
                imageUrl: '/lms.png',
                icon: 'error',
                imageWidth: 150,
                imageHeight: 150,
            })
        }
        FetchAllStudents()
    }
    const handleDeleteStudent = async (enrollmentno) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = { enrollmentno: enrollmentno }
                var result = await postData("students/deletestudent", body)
                if (result.result)
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
            } FetchAllStudents()
        })
    }
    const handleStudentCancel = () => {
        setStudentImage({ bytes: '', file: `${tempStudentImage.file}` })
        setBtnstate1(false)
    }
    const handleClose1 = () => {
        setOpen1(false)
    }
    function ShowDailogStudent() {

        return (
            <div>
                <Dialog
                    open={open1}
                    onClose={handleClose1}
                    TransitionComponent={Transition}
                    keepMounted
                    fullWidth
                    maxWidth="md"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="/student.png" style={{ width: 40, height: 40 }} alt="" />
                                    Edit Student
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField value={studentName} onChange={(event) => setStudentName(event.target.value)} fullWidth label="Student Name" variant="outlined" />
                            </Grid>

                            <Grid item xs={4}>
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

                            <Grid item xs={4}>
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

                            <Grid item xs={6}>
                                <TextField value={dob} onChange={(event) => setDob(event.target.value)} type='date' fullWidth variant="outlined" />
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                        <FormControlLabel value="male" control={<Radio checked={gt.Male} />} onClick={() => handleGender("Male")} label="Male" sx={{ '& .MuiSvgIcon-root': { fontSize: 15, } }} />
                                        <FormControlLabel value="female" control={<Radio checked={gt.Female} />} onClick={() => handleGender("Female")} label="Female" sx={{ '& .MuiSvgIcon-root': { fontSize: 15, } }} />
                                        <FormControlLabel value="other" control={<Radio checked={gt.Other} />} onClick={() => handleGender("Others")} label="Other" sx={{ '& .MuiSvgIcon-root': { fontSize: 15, } }} />
                                    </RadioGroup>
                                </FormControl>
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
                                <TextField value={cAddress} onChange={(event) => setCAddress(event.target.value)} fullWidth label="Current Address" variant="outlined" />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField value={mobileNo} onChange={(event) => setMobileNo(event.target.value)} fullWidth label="Mobile No" variant="outlined" />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField value={emailId} onChange={(event) => setEmailId(event.target.value)} fullWidth label="Email ID" variant="outlined" />
                            </Grid>

                            <Grid item xs={3}>
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

                            <Grid item xs={3}>
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

                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button onClick={() => handleGeneratePassword()} fullWidth variant="contained" color="primary">Create Password</Button>
                            </Grid>

                            <Grid item xs={3}>
                                <TextField fullWidth value={password} onChange={(event) => setPassword(event.target.value)} label="Password" variant="outlined" />
                            </Grid>

                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <label htmlFor="contained-button-file2">
                                    <Input onChange={(event) => handleStudentImageChange(event)} accept="image/*" id="contained-button-file2" multiple type="file" />
                                    <Button variant="contained" fullWidth component="span">
                                        Upload Picture
                                    </Button>
                                </label>
                            </Grid>

                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar
                                    alt="Image Upload"
                                    src={studentImage.file}
                                    sx={{ width: 90, height: 60 }} variant="rounded"
                                />{btnstate1 ? <><div><Button onClick={() => handleEditStudentImage()} >Save</Button><Button onClick={() => handleStudentCancel()}>Cancel</Button></div></> : <></>}
                            </Grid>


                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditStudentData}>Edit</Button>
                        <Button onClick={handleClose1} autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    // =========================================================
    const handleClose2 = () => {
        setOpen2(false)
    }
    const handlePermanentStateChange = (event) => {
        setPState(event.target.value);
        FetchAllPermanentCity(event.target.value)
    };
    const FetchAllPermanentState = async () => {
        var result = await getData("statecity/displayallstates")
        setListPermanentState(result.result)
    }
    const fillPermanentState = () => {
        return (listPermanentState.map((item) => {
            return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
        }))
    }
    const handlePermanentCityChange = (event) => {
        setPCity(event.target.value);
    };
    const FetchAllPermanentCity = async (pState) => {
        var result = await postData("statecity/displayallcities", { stateid: pState })
        setListPermanentCity(result.result)
    }
    const fillPermanentCity = () => {
        return (listPermanentCity.map((item) => {
            return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
        }))
    }
    const handleAadhaarImageChange = (event) => {
        if (event.target.files.length) 
        { setAadhaarImage({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) }) 
            setBtnstate2(true)  }
    }
    const handleDomicileStateChange = (event) => {
        setDomicileState(event.target.value);
    };
    const FetchAllDomicileState = async () => {
        var result = await getData("statecity/displayallstates")
        setListDomicileState(result.result)
    }
    const fillDomicileState = () => {
        return (listDomicileState.map((item) => {
            return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
        }))
    }
    const handleDomicileImageChange=(event)=>{
        if(event.target.files.length)
        {setDomicileImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
              setBtnstate3(true)  }
      }
      const handleAadhaarCancel = () => {
        setAadhaarImage({ bytes: '', file: `${tempAadhaarImage.file}` })
        setBtnstate2(false)
    }
    const handleDomicileCancel = () => {
        setDomicileImage({ bytes: '', file: `${tempDomicileImage.file}` })
        setBtnstate3(false)
    }
      const handleEditParent = (rowData) => {
        setEnrollMentNo(rowData.enrollmentno)
        setFatherName(rowData.fathername)
        setMotherName(rowData.mothername)
        setPState(rowData.pstate)
        setPCity(rowData.pcity)
        FetchAllPermanentCity(rowData.pstate)
        setPAddress(rowData.paddress)
        setParentOccupation(rowData.parentoccupation)
        setAnnualIncome(rowData.annualincome)
        setParentsMobileNo(rowData.parentsmobileno)
        setAadhaarNo(rowData.aadhaarno)
        setDomicileState(rowData.domicilestate)
        setAadhaarImage({ bytes: '', file: `${ServerURL}/images/${rowData.uploadaadhaar}` })
        setTempAadhaarImage({ bytes: '', file: `${ServerURL}/images/${rowData.uploadaadhaar}` })
        setDomicileImage({ bytes: '', file: `${ServerURL}/images/${rowData.uploaddomicle}` })
        setTempDomicileImage({ bytes: '', file: `${ServerURL}/images/${rowData.uploaddomicle}` })
        setOpen2(true)
    }
    const handleEditAadhaarImage = async () => {
        var formData = new FormData()
        formData.append('enrollmentno', enrollmentno)
        formData.append('aadhaarimage', aadhaarImage.bytes)
        var result = await postDataAndImage("students/editaadhaarpicture", formData)
        console.log(result)
        setOpen2(false)
        if (result.result) {
            Swal.fire({
                title: 'LMS',
                text: 'Aadhaar Image Edited Successfully......',
                imageUrl: '/lms.png',
                icon: 'success',
                imageWidth: 150,
                imageHeight: 150,
            })
        }
        else {
            Swal.fire({
                title: 'LMS',
                text: 'Fail To Edit Aadhaar Image......',
                imageUrl: '/lms.png',
                icon: 'error',
                imageWidth: 150,
                imageHeight: 150,
            })
        }
        setBtnstate2(false)
        FetchAllStudents()
    }

    const handleEditDomicileImage = async () => {
        var formData = new FormData()
        formData.append('enrollmentno', enrollmentno)
        formData.append('domicileimage', domicileImage.bytes)
        var result = await postDataAndImage("students/editdomicilepicture", formData)
        console.log(result)
        setOpen2(false)
        if (result.result) {
            Swal.fire({
                title: 'LMS',
                text: 'Domicile Image Edited Successfully......',
                imageUrl: '/lms.png',
                icon: 'success',
                imageWidth: 150,
                imageHeight: 150,
            })
        }
        else {
            Swal.fire({
                title: 'LMS',
                text: 'Fail To Edit Domicile Image......',
                imageUrl: '/lms.png',
                icon: 'error',
                imageWidth: 150,
                imageHeight: 150,
            })
        }
        setBtnstate3(false)
        FetchAllStudents()
    }
    const handleEditParentData = async () => {
        var body = {fathername:fatherName,mothername:motherName,pstate:pState,pcity:pCity,paddress:pAddress,parentoccupation:parentOccupation,annualincome:annualIncome,parentsmobileno:parentsMobileNo,aadhaarno:aadhaarno,domicilestate:domicileState,enrollmentno:enrollmentno}
        var result = await postData("students/editparentsdata", body)
        console.log(result)
        setOpen2(false)
        if (result.result) {
            Swal.fire({
                title: 'LMS',
                text: 'Parents Edited Successfully......',
                imageUrl: '/lms.png',
                icon: 'success',
                imageWidth: 150,
                imageHeight: 150,
            })
        }
        else {
            Swal.fire({
                title: 'LMS',
                text: 'Fail To Edit Parent......',
                imageUrl: '/lms.png',
                icon: 'error',
                imageWidth: 150,
                imageHeight: 150,
            })
        }
        FetchAllStudents()
    }
    function ShowDailogParent() {
        return (
            <div>
                <Dialog
                    open={open2}
                    onClose={handleClose2}
                    TransitionComponent={Transition}
                    keepMounted
                    maxWidth="md"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="/student.png" style={{ width: 40, height: 40 }} alt="" />
                                    Edit Student
                                </div>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField value={fatherName} onChange={(event) => setFatherName(event.target.value)} fullWidth label="Father's Name" variant="outlined" />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField value={motherName} onChange={(event) => setMotherName(event.target.value)} fullWidth label="Mother's Name" variant="outlined" />
                            </Grid>

                            <Grid item xs={4}>
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

                            <Grid item xs={4}>
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

                            <Grid item xs={4}>
                                <TextField value={pAddress} onChange={(event) => setPAddress(event.target.value)} fullWidth label="Permanent Address" variant="outlined" />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField value={parentOccupation} onChange={(event) => setParentOccupation(event.target.value)} fullWidth label="Parent's Occupation " variant="outlined" />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField value={annualIncome} onChange={(event) => setAnnualIncome(event.target.value)} fullWidth label="Annual Income" variant="outlined" />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField value={parentsMobileNo} onChange={(event) => setParentsMobileNo(event.target.value)} fullWidth label="Parent's Mobile No" variant="outlined" />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField value={aadhaarno} onChange={(event) => setAadhaarNo(event.target.value)} fullWidth label="Aadhaar No" variant="outlined" />
                            </Grid>

                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <label htmlFor="contained-button-file">
                                    <Input onChange={(event) => handleAadhaarImageChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                                    <Button variant="contained" fullWidth component="span">
                                        Upload Aadhaar
                                    </Button>
                                </label>
                            </Grid>

                            <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar
                                    alt="Image Upload"
                                    src={aadhaarImage.file}
                                    sx={{ width: 90, height: 60 }} variant="rounded"
                                />{btnstate2?<><div><Button onClick={()=>handleEditAadhaarImage()} >Save</Button><Button onClick={()=>handleAadhaarCancel()} >Cancel</Button></div></>:<></>}
                            </Grid>

                            <Grid item xs={6}>
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

                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <label htmlFor="contained-button-file1">
                                    <Input onChange={(event) => handleDomicileImageChange(event)} accept="image/*" id="contained-button-file1" multiple type="file" />
                                    <Button variant="contained" fullWidth component="span">
                                        Upload Domicile
                                    </Button>
                                </label>
                            </Grid>

                            <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar
                                    alt="Image Upload"
                                    src={domicileImage.file}
                                    sx={{ width: 90, height: 60 }} variant="rounded"
                                />{btnstate3?<><div><Button onClick={()=>handleEditDomicileImage()} >Save</Button><Button onClick={()=>handleDomicileCancel()} >Cancel</Button></div></>:<></>}
                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditParentData}>Edit</Button>
                        <Button onClick={handleClose2} autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    function DisplayAll() {
        return (
            <Box sx={{ bgcolor: 'background.paper' }}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Student Information" {...a11yProps(0)} />
                        <Tab label="Parents Information" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <MaterialTable
                            title="Student Information"
                            columns={[
                                { title: 'Enrollment No', field: 'enrollmentno' },
                                { title: 'Student Name', field: 'studentname' },
                                { title: 'Category/Nationality', field: '', render: (rowData) => (<div>{rowData.category}<br />{rowData.nationality}</div>) },
                                { title: 'Gender/DOB', field: '', render: (rowData) => (<div>{rowData.gender}<br />{rowData.dob}</div>) },
                                { title: 'Address', field: '', render: (rowData) => (<div>{rowData.caddress}<br />{rowData.currentcity}<br />{rowData.currentstate}</div>) },
                                { title: 'Contact Info', field: '', render: (rowData) => (<div>{rowData.mobileno}<br />{rowData.emailid}</div>) },
                                {
                                    title: 'Student Image', field: '',
                                    render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} style={{ width: 50, borderRadius: '20' }} />
                                },
                                { title: 'Department', field: 'departmentname' },
                                { title: 'Course', field: 'coursename' },
                            ]}
                            data={listStudents}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit Student',
                                    onClick: (event, rowData) => handleEditStudent(rowData)
                                },
                                {
                                    icon: 'delete',
                                    tooltip: 'Delete Delete',
                                    onClick: (event, rowData) => handleDeleteStudent(rowData.enrollmentno)
                                }
                            ]}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <MaterialTable
                            title="Parents Information"
                            columns={[
                                { title: 'Enrollment No', field: 'enrollmentno' },
                                { title: 'Parents Name', field: '', render: (rowData) => (<div>{rowData.fathername}<br />{rowData.mothername}</div>) },
                                { title: 'Permanent Address', field: '', render: (rowData) => (<div>{rowData.paddress}<br />{rowData.permanentcity}<br />{rowData.permanentstate}</div>) },
                                { title: 'Occupation', field: 'parentoccupation' },
                                { title: 'Annual Income', field: 'annualincome' },
                                { title: 'Contact Info', field: 'parentsmobileno' },
                                { title: 'Aadhar Number', field: 'aadhaarno' },
                                {
                                    title: 'Aadhar Image', field: '',
                                    render: rowData => <img src={`${ServerURL}/images/${rowData.uploadaadhaar}`} style={{ width: 50, borderRadius: '20' }} />
                                },
                                { title: 'Domicile State', field: 'domicilestatename' },
                                {
                                    title: 'Domicile Image', field: '',
                                    render: rowData => <img src={`${ServerURL}/images/${rowData.uploaddomicle}`} style={{ width: 50, borderRadius: '20' }} />
                                },
                            ]}
                            data={listStudents}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit Student',
                                    onClick: (event, rowData) => handleEditParent(rowData)
                                },
                                {
                                    icon: 'delete',
                                    tooltip: 'Delete Delete',
                                    onClick: (event, rowData) => handleDeleteStudent(rowData.enrollmentno)
                                }
                            ]}
                        />
                    </TabPanel>
                </SwipeableViews>
            </Box>
        )
    }


    return (
        <div>
            {DisplayAll()}
            {ShowDailogStudent()}
            {ShowDailogParent()}
        </div>
    )


}