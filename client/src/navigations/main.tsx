import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AppointmentIndex from '../views/Appointment';
import ChangePassword from '../views/Auth/ChangePassword';
import DoctorIndex from '../views/Doctor';
import Makeappointment from '../views/MakeAppointment';
import Service from '../views/Service';
import Setting from '../views/Setting';
import UserEdit from '../views/User/UserEdit';
import UserInfo from '../views/User/UserInfo';
import MyTabs from './tabs';
import MessageScreen from '../views/Message/MessageScreen';

const Stack = createNativeStackNavigator();

const MainRoute = () => {
  return (
    <>
        <Stack.Navigator>
          <Stack.Screen name="tabs" component={MyTabs} options={{headerShown: false}}/>
          <Stack.Screen name="appointment" component={AppointmentIndex} options={{headerShown: false}}/>
          <Stack.Screen name="doctor" component={DoctorIndex} options={{headerShown: false}}/>
          <Stack.Screen name="makeAppointment" component={Makeappointment} options={{headerShown: false}}/>
          <Stack.Screen name="service" component={Service} options={{headerShown: false}}/>
          <Stack.Screen name="setting" component={Setting} options={{headerShown: false}}/>
          <Stack.Screen name="userEdit" component={UserEdit} options={{headerShown: false}}/>
          <Stack.Screen name="userInfo" component={UserInfo} options={{headerShown: false}}/>
          <Stack.Screen name="changePassword" component={ChangePassword} options={{headerShown: false}}/>
          <Stack.Screen name="messageScreen" component={MessageScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    </>
   
  )
}

export default MainRoute