import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../views/Auth/Login';
import Register from '../views/Auth/Register';

const Stack = createNativeStackNavigator();

const AuthRoute = () => {
  return (
    <>
        <Stack.Navigator>
          <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="register" component={Register} options={{headerShown: false}}/>
        </Stack.Navigator>
    </>
   
  )
}

export default AuthRoute