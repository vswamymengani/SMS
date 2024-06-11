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
import StudentTable from './components/screens/StudentTable';
import TeacherTable from './components/screens/TeacherTable';
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
import Timetable from './components/screens/Timetable';
import TeacherHomeScreen from './components/screens/TeacherHomeScreen';
import TeacherProfile from './components/screens/TeacherProfile';
import Attendence from './components/screens/Attendence';
import FeeNews from './components/screens/FeeNews';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="SelectUser" component={SelectUser} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminView" component={AdminView} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="AdminProfile" component={AdminProfile} options={{ headerShown: false }} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
        <Stack.Screen name="StudentTable" component={StudentTable} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherTable" component={TeacherTable} options={{ headerShown: false }} />
        <Stack.Screen name="ClassesTable" component={ClassesTable} options={{ headerShown: false }} />
        <Stack.Screen name="Form" component={Form} options={{ headerShown: false }} /> 
        <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherForm" component={TeacherForm} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherLogin" component={TeacherLogin} options={{ headerShown: false }} />
        <Stack.Screen name="VerificationCode" component={VerificationCode} options={{ headerShown: false }} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} options={{headerShown: false}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
        <Stack.Screen name="StudentLeave" component={StudentLeave} options={{ title: 'Student Leave' }} />
        <Stack.Screen name="Timetable" component={Timetable} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherHomeScreen" component={TeacherHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TeachetProfile" component={TeacherProfile} options={{ headerShown: false }} />
        <Stack.Screen name="StudentComplaint" component={StudentComplaint} options={{ title: 'Student Complaint' }} />
        <Stack.Screen name="Attendence" component={Attendence} options={{headerShown: false }} />
        <Stack.Screen name="FeeNews" component={FeeNews} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
