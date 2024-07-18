import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
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
import ServiceDetailIndex from '../views/Service/SerivceDetail';
import MedicalHistoryIndex from '../views/MedicalHistory';
import { authSelector } from '../redux/reducers/authReducer';
import { useSelector } from 'react-redux';
import WorkScheduleIndex from '../views/WorkSchedule';
import MedicalResultIndex from '../views/MedicalResult';
import Home from '../views/Home';
import User from '../views/User';
import NameInput from '../views/Auth/NameInput';
import { useStore } from '../root-store';
import { observer } from 'mobx-react';
import Loading from '../components/Loading';

const Stack = createNativeStackNavigator();

const MainRoute = () => {
  const auth = useSelector(authSelector)
  const user = auth?.user?.role
  const { patient, getPatient } = useStore().user
  const { getDoctor } = useStore().home

  const [isLoadding, setIsLoading] = useState(true);

  useEffect(() => {
    
    if(auth?.user?.role === "user"){
      getPatient(auth.user._id)
    }else if(auth?.user?.role === "doctor") {
      getDoctor(auth.user._id)
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  } ,[])

  return (
    <>
      <Stack.Navigator>
        {
          user === 'user' &&
          <>
            {isLoadding ? <Stack.Screen name="loading" component={Loading} options={{ headerShown: false }} /> : patient?.name === '' ? 
              <Stack.Screen name="nameInput" component={NameInput} options={{ headerShown: false }} />
              :
              <>
                <Stack.Screen name="tabs" component={MyTabs} options={{ headerShown: false }} />
                <Stack.Screen name="appointment" component={AppointmentIndex} options={{ headerShown: false }} />
                <Stack.Screen name="doctor" component={DoctorIndex} options={{ headerShown: false }} />
                <Stack.Screen name="makeAppointmentIndex" component={MakeAppointMentIndex} options={{ headerShown: false, gestureEnabled: false }} />
                <Stack.Screen name="makeAppointmentInfo" component={Makeappointment} options={{ headerShown: false }} />
                <Stack.Screen name="makeAppointmentComfirm" component={MakeAppointMentComfirm} options={{ headerShown: false }} />
                <Stack.Screen name="service" component={Service} options={{ headerShown: false }} />
                <Stack.Screen name="setting" component={Setting} options={{ headerShown: false }} />
                <Stack.Screen name="changePassword" component={ChangePassword} options={{ headerShown: false }} />
                <Stack.Screen name="messageScreen" component={MessageScreen} options={{ headerShown: false }} />
                <Stack.Screen name="scheduleExamDetailIndex" component={ScheduleExamDetailIndex} options={{ headerShown: false }} />
                <Stack.Screen name="makeAppointmentDetail" component={MakeAppointmentDetail} options={{ headerShown: false, gestureEnabled: false }} />
                <Stack.Screen name="serviceDetail" component={ServiceDetailIndex} options={{ headerShown: false }} />
                <Stack.Screen name="medicalHistory" component={MedicalHistoryIndex} options={{ headerShown: false }} />
                <Stack.Screen name="userEdit" component={UserEdit} options={{ headerShown: false }} />
                <Stack.Screen name="userInfo" component={UserInfo} options={{ headerShown: false }} />
              </>
            }
            
          </>
        }

        {
          user === 'doctor' &&
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="workSchedule" component={WorkScheduleIndex} options={{ headerShown: false }} />
            <Stack.Screen name="medicalResult" component={MedicalResultIndex} options={{ headerShown: false }} />
            <Stack.Screen name="userEdit" component={UserEdit} options={{ headerShown: false }} />
            <Stack.Screen name="userInfo" component={UserInfo} options={{ headerShown: false }} />
            <Stack.Screen name="user" component={User} options={{ headerShown: false }} />
          </>
        }

      </Stack.Navigator>
    </>

  )
}

export default observer(MainRoute) 