import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './Components/screens/Welcome';
import SelectUser from './Components/screens/SelectUser';
import LoginScreen from './Components/screens/LoginScreen';
import AdminView from './Components/screens/AdminView';
import AdminLogin from './Components/screens/AdminLogin';
import Form from './Components/screens/Form';
import Homescreen from './Components/screens/Homescreen';
import ClassesTable from './Components/screens/ClassesTable';
import AdminProfile from './Components/screens/AdminProfile';
import Profile from './Components/screens/Profile';
import TeacherForm from './Components/screens/TeacherForm';
import TeacherLogin from './Components/screens/TeacherLogin';
import ForgotPassword from './Components/screens/ForgotPassword';
import VerificationCode from './Components/screens/VerificationCode';
import CreateNewPassword from './Components/screens/CreateNewPassword';
import StudentLeave from './Components/screens/StudentLeave';
import StudentComplaint from './Components/screens/StudentComplaint';
import StudentTimetable from './Components/screens/StudentTimetable';
import TeacherHomeScreen from './Components/screens/TeacherHomeScreen';
import TeacherProfile from './Components/screens/TeacherProfile';
import FeeNews from './Components/screens/FeeNews';
import ClassWork from './Components/screens/ClassWork';
import TeacherLeave from './Components/screens/TeacherLeave';
import TeacherComplaints from './Components/screens/TeacherComplaints';
import TeacherComplaint1 from './Components/screens/TeacherComplaint1';
import TeacherHomework from './Components/screens/TeacherHomework';
import TeacherAttendance from './Components/screens/TeacherAttendance';
import TeacherTimetable from './Components/screens/TeacherTimetable';
import RequestEdit from './Components/screens/RequestEdit';
import ReciveComplaint from './Components/screens/ReciveComplaint';
import TeacherNotifications from './Components/screens/TeacherNotifications';
import AdminStudentHomeScreen from './Components/screens/AdminStudentHomeScreen';
import AdminTeacherHomeScreen from './Components/screens/AdminTeacherHomeScreen';
import TeacherDetails from './Components/screens/TeacherDetails';
import AdminTeacherComplaints from './Components/screens/AdminTeacherComplaints';
import TeacherAnnouncements from './Components/screens/TeacherAnnouncements';
import ModifyInfo from './Components/screens/ModifyInfo';
import StudentNotifications from './Components/screens/StudentNotifications';
import CalendarScreen from './Components/screens/CalendarScreen';
import HomeworkScreen from './Components/screens/HomeworkScreen';
import StudentDetails from './Components/screens/StudentDetails';
import AdminStudentComplaints from './Components/screens/AdminStudentComplaints';
import StudentAnnouncements from './Components/screens/StudentAnnouncements';
import AdminStudentLeave from './Components/screens/AdminStudentLeave';
import AdminTeacherLeave from './Components/screens/AdminTeacherLeave';
import AdminTimeTable from './Components/screens/AdminTimeTable';
import LeaveApproval from './Components/screens/LeaveApproval';
import WorkInProgress from './Components/screens/WorkInProgress';
import TeacherHomeWorkList from './Components/screens/TeacherHomeWorkList';
import TeacherLeaveApproval from './Components/screens/TeacherLeaveApproval';
import TeacherExamResults from './Components/screens/TeacherExamResults';
import StudentVerification from './Components/screens/StudentVerification';
import AdminStudentForm from './Components/screens/AdminStudentForm';
import StudentRegistration from './Components/screens/StudentRegistration';
import AdminFeeDetails from './Components/screens/AdminFeeDetails';
import StudentComplaintList from './Components/screens/StudentComplaintList';
import TeacherComplaintList from './Components/screens/TeacherComplaintList';
import PrevAttendance from './Components/screens/PrevAttendance';
import StudentModify from './Components/screens/StudentModify';
import TeacherVerification from './Components/screens/TeacherVerification';
import TeacherRegistration from './Components/screens/TeacherRegistration';
import TeacherForgotPassword from './Components/screens/TeacherForgotPassword';
import TeacherPasswordChange from './Components/screens/TeacherPasswordChange';
import TeacherStudyMaterial from './Components/screens/TeacherStudyMaterial';
import StudentStudyMaterial from './Components/screens/StudentStudyMaterial';
import PrevResults from './Components/screens/PrevResults';
import SingleSyudentComplaint from './Components/screens/SingleStudentComplaint';
import SingleStudentComplaint from './Components/screens/SingleStudentComplaint';
import StudentExamResults from './Components/screens/StudentExamResults';
import AdminLibrary from './Components/screens/AdminLibrary';
import Library from './Components/screens/Library';
import TeacherOnlineExam from './Components/screens/TeacherOnlineExam';
import StudentOnlineExam from './Components/screens/StudentOnlineExam';
import LibraryManagement from './Components/screens/LibraryManagement';
import AdminEventScreen from './Components/screens/AdminEventScreen';
import SchoolEvents from './Components/screens/SchoolEvents';
import StudentAttendence from './Components/screens/StudentAttendence';
import BookApproval from './Components/screens/BookApproval';
import ReturnBook from './Components/screens/ReturnBook';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="SelectUser" component={SelectUser} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminView" component={AdminView} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
        <Stack.Screen name="AdminProfile" component={AdminProfile} options={{ headerShown: false }} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
        <Stack.Screen name="AdminStudentHomeScreen" component={AdminStudentHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminTeacherHomeScreen" component={AdminTeacherHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ClassesTable" component={ClassesTable} options={{ headerShown: false }} />
        <Stack.Screen name="Form" component={Form} options={{ headerShown: false }} /> 
        <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherForm" component={TeacherForm} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherLogin" component={TeacherLogin} options={{ headerShown: false }} />
        <Stack.Screen name="VerificationCode" component={VerificationCode} options={{ headerShown: false }} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} options={{headerShown: false}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
        <Stack.Screen name="StudentLeave" component={StudentLeave} options={{ headerShown: false}} />
        <Stack.Screen name="StudentTimetable" component={StudentTimetable} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherHomeScreen" component={TeacherHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherProfile" component={TeacherProfile} options={{ headerShown: false }} />
        <Stack.Screen name="StudentComplaint" component={StudentComplaint} options={{headerShown: false }} />
        <Stack.Screen name="FeeNews" component={FeeNews} options={{headerShown: false}} />
        <Stack.Screen name="ClassWork" component={ClassWork} options={{headerShown: false}} />
        <Stack.Screen name="TeacherLeave" component={TeacherLeave} options={{headerShown: false}} />
        <Stack.Screen name="TeacherComplaints" component={TeacherComplaints} options={{title:"Teacher Complaints"}} />
        <Stack.Screen name="TeacherComplaint1" component={TeacherComplaint1}options={{headerShown: false}} />
        <Stack.Screen name="TeacherHomework" component={TeacherHomework} options={{headerShown: false}} />
        <Stack.Screen name="TeacherAttendance" component={TeacherAttendance} options={{title: "Attendance"}} />
        <Stack.Screen name="TeacherTimetable" component={TeacherTimetable} options={{ headerShown: false }} />
        <Stack.Screen name="RequestEdit" component={RequestEdit} options={{title: "Update Details"}} />
        <Stack.Screen name="ReciveComplaint" component={ReciveComplaint} options={{title:"Student Complaint"}} />
        <Stack.Screen name="TeacherNotifications" component={TeacherNotifications} options={{headerShown: false}} />
        <Stack.Screen name="TeacherDetails" component={TeacherDetails} options={{title: "Teacher Details"}} />
        <Stack.Screen name="AdminTeacherComplaints" component={AdminTeacherComplaints} options={{title: "Teacher Complaints"}} />
        <Stack.Screen name="TeacherAnnouncements" component={TeacherAnnouncements} options={{title:"Teacher Announcements"}} />
        <Stack.Screen name="ModifyInfo" component={ModifyInfo} options={{title :"Update Profile"}} />
        <Stack.Screen name="StudentNotifications" component={StudentNotifications} options={{headerShown: false}} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{headerShown: false}} />
        <Stack.Screen name="HomeworkScreen" component={HomeworkScreen} options={{headerShown: false}} />
        <Stack.Screen name="StudentDetails" component={StudentDetails} options={{title:"Student Details"}} />
        <Stack.Screen name="AdminStudentComplaints" component={AdminStudentComplaints} options={{title:" Student Complaints"}} />
        <Stack.Screen name="StudentAnnouncements" component={StudentAnnouncements} options={{title:" Student Announcements"}} />
        <Stack.Screen name="AdminStudentLeave" component={AdminStudentLeave} options={{title:" Student Leaves"}} />
        <Stack.Screen name="AdminTeacherLeave" component={AdminTeacherLeave} options={{title: "Teacher Leaves"}} />
        <Stack.Screen name="AdminTimeTable" component={AdminTimeTable} options={{title:"Time Table"}} />
        <Stack.Screen name = "LeaveApproval" component={LeaveApproval} options={{headerShown: false}} />
        <Stack.Screen name="WorkInProgress" component={WorkInProgress} options={{headerShown: false}} />
        <Stack.Screen name="TeacherHomeWorkList" component={TeacherHomeWorkList} options={{headerShown : false}} />
        <Stack.Screen name="TeacherLeaveApproval" component={TeacherLeaveApproval} options={{headerShown: false}} />
        <Stack.Screen name="TeacherExamResults" component={TeacherExamResults} options={{title:"Exam results"}} />
        <Stack.Screen name="StudentVerification" component={StudentVerification} options={{headerShown: false}} />
        <Stack.Screen name="AdminStudentForm" component={AdminStudentForm} options={{headerShown: false}} />
        <Stack.Screen name="StudentRegistration" component={StudentRegistration} options={{headerShown: false}} />
        <Stack.Screen name="AdminFeeDetails" component={AdminFeeDetails} options={{title : "Student Fee Details"}} />
        <Stack.Screen name="StudentComplaintList" component={StudentComplaintList} options={{headerShown:false}} />
        <Stack.Screen name="TeacherComplaintList" component={TeacherComplaintList} options={{headerShown:false}} />
        <Stack.Screen name="PrevAttendance" component={PrevAttendance} options={{title: "Previous Attendance"}} />
        <Stack.Screen name="StudentModify" component={StudentModify} options={{title: "Student Modification"}} />
        <Stack.Screen name="TeacherVerification" component={TeacherVerification} options={{headerShown: false}} />
        <Stack.Screen name="TeacherRegistration" component={TeacherRegistration} options={{headerShown: false}} />
        <Stack.Screen name="TeacherForgotPassword" component={TeacherForgotPassword} options={{headerShown: false}} />
        <Stack.Screen name="TeacherPasswordChange" component={TeacherPasswordChange} options={{headerShown: false}} />
        <Stack.Screen name="TeacherStudyMaterial" component={TeacherStudyMaterial} options={{headerShown: false}} />
        <Stack.Screen name="StudentStudyMaterial" component={StudentStudyMaterial} options={{headerShown: false}} />
        <Stack.Screen name="PrevResults" component={PrevResults} options={{title: "Previous Results"}} />
        <Stack.Screen name="SingleStudentComplaint" component={SingleStudentComplaint} options={{title: "Student Complaint"}} />
        <Stack.Screen name="StudentExamResults" component={StudentExamResults} options={{headerShown: false}} />
        <Stack.Screen name="AdminLibrary" component={AdminLibrary} options={{headerShown: false}} />
        <Stack.Screen name="Library" component={Library} options={{headerShown:false}} />
        <Stack.Screen name="StudentOnlineExam" component={StudentOnlineExam} options={{title: "Online Exam"}} />
        <Stack.Screen name="TeacherOnlineExam" component={TeacherOnlineExam} options={{title: "Online Exam"}} />
        <Stack.Screen name="LibraryManagement" component={LibraryManagement} options={{headerShown:false}} />
        <Stack.Screen name="AdminEventScreen" component={AdminEventScreen} options={{title: "Events"}} />
        <Stack.Screen name="SchoolEvents" component={SchoolEvents} options={{title: "School Gallary"}} />
        <Stack.Screen name="StudentAttendence" component={StudentAttendence} options={{title: "Attendance"}} />
        <Stack.Screen name='BookApproval' component={BookApproval} options={{title :"Book Allocation"}} />
        <Stack.Screen name='ReturnBook' component={ReturnBook} options={{title :"Return Book"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
