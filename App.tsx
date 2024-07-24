import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './components/screens/Welcome';
import SelectUser from './components/screens/SelectUser';
import LoginScreen from './components/screens/LoginScreen';
import AdminView from './components/screens/AdminView';
import AdminLogin from './components/screens/AdminLogin';
import Form from './components/screens/Form';
import Homescreen from './components/screens/Homescreen';
import ClassesTable from './components/screens/ClassesTable';
import AdminProfile from './components/screens/AdminProfile';
import Profile from './components/screens/Profile';
import TeacherForm from './components/screens/TeacherForm';
import TeacherLogin from './components/screens/TeacherLogin';
import ForgotPassword from './components/screens/ForgotPassword';
import VerificationCode from './components/screens/VerificationCode';
import CreateNewPassword from './components/screens/CreateNewPassword';
import StudentLeave from './components/screens/StudentLeave';
import StudentComplaint from './components/screens/StudentComplaint';
import StudentTimetable from './components/screens/StudentTimetable';
import TeacherHomeScreen from './components/screens/TeacherHomeScreen';
import TeacherProfile from './components/screens/TeacherProfile';
import StudentAttendence from './components/screens/StudentAttendence';
import FeeNews from './components/screens/FeeNews';
import ClassWork from './components/screens/ClassWork';
import TeacherLeave from './components/screens/TeacherLeave';
import TeacherComplaints from './components/screens/TeacherComplaints';
import TeacherComplaint1 from './components/screens/TeacherComplaint1';
import TeacherHomework from './components/screens/TeacherHomework';
import TeacherAttendance from './components/screens/TeacherAttendance';
import TeacherTimetable from './components/screens/TeacherTimetable';
import RequestEdit from './components/screens/RequestEdit';
import ReciveComplaint from './components/screens/ReciveComplaint';
import TeacherNotifications from './components/screens/TeacherNotifications';
import AdminStudentHomeScreen from './components/screens/AdminStudentHomeScreen';
import AdminTeacherHomeScreen from './components/screens/AdminTeacherHomeScreen';
import TeacherDetails from './components/screens/TeacherDetails';
import AdminTeacherComplaints from './components/screens/AdminTeacherComplaints';
import TeacherAnnouncements from './components/screens/TeacherAnnouncements';
import ModifyInfo from './components/screens/ModifyInfo';
import { Button, Title } from 'react-native-paper';
import StudentNotifications from './components/screens/StudentNotifications';
import CalendarScreen from './components/screens/CalendarScreen';
import Homeworkscreen from './components/screens/Homeworkscreen';
import StudentDetails from './components/screens/StudentDetails';
import AdminStudentComplaints from './components/screens/AdminStudentComplaints';
import StudentAnnouncements from './components/screens/StudentAnnouncements';
import AdminStudentLeave from './components/screens/AdminStudentLeave';
import AdminTeacherLeave from './components/screens/AdminTeacherLeave';
import AdminTimeTable from './components/screens/AdminTimeTable';
import LeaveApproval from './components/screens/LeaveApproval';
import WorkInProgress from './components/screens/WorkInProgress';
import TeacherHomeWorkList from './components/screens/TeacherHomeWorkList';
import TeacherLeaveApproval from './components/screens/TeacherLeaveApproval';
import TeacherExamResults from './components/screens/TeacherExamResults';
import OnlineExamination from './components/screens/OnlineExamination';
import ExamResults from './components/screens/ExamResults';
import StudentOnlineExam from './components/screens/StudentOnlineExam';
import AdminLibrary from './components/screens/AdminLibrary';
import StudentLibrary from './components/screens/StudentLibrary';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="SelectUser" component={SelectUser} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminView" component={AdminView} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{title: "Profile"}} />
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
        <Stack.Screen name="StudentComplaint" component={StudentComplaint} options={{ title: 'Student Complaint' }} />
        <Stack.Screen name="StudentAttendence" component={StudentAttendence} options={{title: 'StudentAttendence'}} />
        <Stack.Screen name="FeeNews" component={FeeNews} options={{headerShown: false}} />
        <Stack.Screen name="ClassWork" component={ClassWork} options={{headerShown: false}} />
        <Stack.Screen name="TeacherLeave" component={TeacherLeave} options={{headerShown: false}} />
        <Stack.Screen name="TeacherComplaints" component={TeacherComplaints} options={{title:"Teacher Complaints"}} />
        <Stack.Screen name="TeacherComplaint1" component={TeacherComplaint1}options={{title: "Teacher Complaint"}} />
        <Stack.Screen name="TeacherHomework" component={TeacherHomework}options={{title: "Homework"}} />
        <Stack.Screen name="TeacherAttendance" component={TeacherAttendance}options={{title: "Attendance"}} />
        <Stack.Screen name="TeacherTimetable" component={TeacherTimetable} options={{ headerShown: false }} />
        <Stack.Screen name="RequestEdit" component={RequestEdit} options={{headerShown: false}} />
        <Stack.Screen name="ReciveComplaint" component={ReciveComplaint} options={{title:"Student Complaint"}} />
        <Stack.Screen name="TeacherNotifications" component={TeacherNotifications} options={{title :"Notificatios"}} />
        <Stack.Screen name="TeacherDetails" component={TeacherDetails} options={{title: "Teacher Details"}} />
        <Stack.Screen name="AdminTeacherComplaints" component={AdminTeacherComplaints} options={{title: "Teacher Complaints"}} />
        <Stack.Screen name="TeacherAnnouncements" component={TeacherAnnouncements} options={{title:"Teacher Announcements"}} />
        <Stack.Screen name="ModifyInfo" component={ModifyInfo} options={{title :"Update Profile"}} />
        <Stack.Screen name="StudentNotifications" component={StudentNotifications} options={{title:"Notifications"}} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{headerShown: false}} />
        <Stack.Screen name="Homeworkscreen" component={Homeworkscreen} options={{headerShown: false}} />
        <Stack.Screen name="StudentDetails" component={StudentDetails} options={{title:"Student Details"}} />
        <Stack.Screen name="AdminStudentComplaints" component={AdminStudentComplaints} options={{title:" Student Complaints"}} />
        <Stack.Screen name="StudentAnnouncements" component={StudentAnnouncements} options={{title:" Student Announcements"}} />
        <Stack.Screen name="AdminStudentLeave" component={AdminStudentLeave} options={{title:" Student Leaves"}} />
        <Stack.Screen name="AdminTeacherLeave" component={AdminTeacherLeave} options={{title: "Teacher Leaves"}} />
        <Stack.Screen name="AdminTimeTable" component={AdminTimeTable} options={{title:"Time Table"}} />
        <Stack.Screen name ="LeaveApproval" component={LeaveApproval} options={{headerShown: false}} />
        <Stack.Screen name="WorkInProgress" component={WorkInProgress} options={{headerShown: false}} />
        <Stack.Screen name="TeacherHomeWorkList" component={TeacherHomeWorkList} options={{title: "List Of Home Works"}} />
        <Stack.Screen name="TeacherLeaveApproval" component={TeacherLeaveApproval} options={{headerShown: false}} />
        <Stack.Screen name="TeacherExamResults" component={TeacherExamResults} options={{title:"Exam results"}} />
        <Stack.Screen name="StudentOnlineExam" component={StudentOnlineExam} options={{title:"StudentOnlineExam"}} />
         <Stack.Screen name="ExamResults" component={ExamResults} options={{title:"ExamResults"}} />
         <Stack.Screen name="AdminLibrary" component={AdminLibrary} options={{title:"AdminLibrary"}} />
         <Stack.Screen name="StudentLibrary" component={StudentLibrary} options={{title:"StudentLibrary"}} />
         <Stack.Screen name="OnlineExamination" component={OnlineExamination} options={{title:"OnlineExamination"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
