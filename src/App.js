import Department from "./Components/Admin/Department"
import DisplayAllDepartment from "./Components/Admin/DisplayAllDepartment"
import Faculty from "./Components/Admin/Faculty"
import DisplayAllFaculty from "./Components/Admin/DisplayAllFaculty"
import Courses from "./Components/Admin/Courses"
import DisplayAllCourses from "./Components/Admin/DisplayAllCourses"
import Subjects from "./Components/Admin/Subjects"
import DisplayAllSubjects from "./Components/Admin/DisplayAllSubjects"
import Students from "./Components/Admin/Students"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { propsToClassKey } from "@mui/styles";
import DisplayAllStudents from "./Components/Admin/DisplayAllStudents"
import Units from "./Components/Admin/Units"
import DisplayAllUnits from "./Components/Admin/DisplayAllUnits"

function App(props) {
  return (
    <Router>
     <Routes>
       <Route element={<Department/>} path={"/department"} history={props.history} />
       <Route element={<DisplayAllDepartment/>} path={"/displayalldepartment"} history={props.history} />
       <Route element={<Faculty/>} path={"/faculty"} history={props.history} />
       <Route element={<DisplayAllFaculty/>} path={"/displayallfaculty"} history={props.history} />
       <Route element={<Courses/>} path={"/courses"} history={props.history} />
       <Route element={<DisplayAllCourses/>} path={"/displayallcourses"} history={props.history} />
       <Route element={<Subjects/>} path={"/subjects"} history={props.history} />
       <Route element={<DisplayAllSubjects/>} path={"/displayallsubjects"} history={props.history} />
       <Route element={<Students/>} path={"/students"} history={props.history} />
       <Route element={<DisplayAllStudents/>} path={"/displayallstudents"} history={props.history} />
       <Route element={<Units/>} path={"/units"} history={props.history} />
       <Route element={<DisplayAllUnits/>} path={"/displayallunits"} history={props.history} />
     </Routes>
    </Router>
  );
}

export default App;