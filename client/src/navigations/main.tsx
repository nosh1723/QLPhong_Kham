import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AppointmentIndex from '../views/Appointment';
import ChangePassword from '../views/Auth/ChangePassword';
import DoctorIndex from '../views/Doctor';
import MakeAppointMentComfirm from '../views/MakeAppointment/MakeAppointMentComfirm';
import MakeAppointMentIndex from '../views/MakeAppointment/MakeAppointMentIndex';
import Makeappointment from '../views/MakeAppointment/MakeAppointMentInfo';
import MakeAppointmentDetail from '../views/MakeAppointment/MakeAppointmentDetail';
import MessageScreen from '../views/Message/MessageScreen';
import ScheduleExamDetailIndex from '../views/ScheduleExam/ScheduleExamDetail';
import Service from '../views/Service';
import Setting from '../views/Setting';
import UserEdit from '../views/User/UserEdit';
import UserInfo from '../views/User/UserInfo';
import MyTabs from './tabs';

const Stack = createNativeStackNavigator();

const MainRoute = () => {
  return (
    <>
        <Stack.Navigator>
          <Stack.Screen name="tabs" component={MyTabs} options={{headerShown: false}}/>
          <Stack.Screen name="appointment" component={AppointmentIndex} options={{headerShown: false}}/>
          <Stack.Screen name="doctor" component={DoctorIndex} options={{headerShown: false}}/>
          <Stack.Screen name="makeAppointmentIndex" component={MakeAppointMentIndex} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name="makeAppointmentInfo" component={Makeappointment} options={{headerShown: false}}/>
          <Stack.Screen name="makeAppointmentComfirm" component={MakeAppointMentComfirm} options={{headerShown: false}}/>
          <Stack.Screen name="service" component={Service} options={{headerShown: false}}/>
          <Stack.Screen name="setting" component={Setting} options={{headerShown: false}}/>
          <Stack.Screen name="userEdit" component={UserEdit} options={{headerShown: false}}/>
          <Stack.Screen name="userInfo" component={UserInfo} options={{headerShown: false}}/>
          <Stack.Screen name="changePassword" component={ChangePassword} options={{headerShown: false}}/>
          <Stack.Screen name="messageScreen" component={MessageScreen} options={{headerShown: false}}/>
          <Stack.Screen name="scheduleExamDetailIndex" component={ScheduleExamDetailIndex} options={{headerShown: false}}/>
          <Stack.Screen name="makeAppointmentDetail" component={MakeAppointmentDetail} options={{headerShown: false, gestureEnabled: false}}/>
        </Stack.Navigator>
    </>
   
  )
}

export default MainRoute